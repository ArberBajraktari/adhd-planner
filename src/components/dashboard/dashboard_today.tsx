import {
    Box, useToast,
    Grid, GridItem, Heading, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, useSteps, Button, Input, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Card, CardBody, Code, Flex, IconButton, InputGroup, InputLeftElement, InputRightElement, Select
  } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";


interface TaskItem {
  id: number;
  task_id: number;
  name: string;
  done: boolean;
}

interface Task {
  id: number;
  user_id: string;
  name: string;
  project_id: number;
  description: string;
  task_items: TaskItem[];
}

interface ParkingTicket {
  id: number;
  name: string;
  top: number;
  left: number;
}

interface Projects {
  id: number;
  name: string;
  description: string;
}

export default function DashboardToday(props: any) {
  const toast = useToast();
  const [theTasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState('');
  const [value, setValue] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [divs, setDivs] = useState<ParkingTicket[]>([]);
  const [projects, setProjects] = useState<Projects[]>([])

  const load = (status: string) => {
    if(status === 'TASK_NOT_CREATED'){
      toast({
        title: 'Task not created.',
        description: "Something went wrong",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
    }else{
      toast({
        title: 'Task created!',
        description: "Be productive",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const handleCheckbox = async (task_id: any, item_id: any, status: boolean) => {
    try {
      const response = await fetch(`http://localhost:8009/tasks_item/${item_id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "done": !status })
      });
  
      if (response.ok) {
        console.log('Task updated successfully');
        const updatedTasks = [...theTasks];

        const taskItemToUpdate = updatedTasks
          .flatMap(task => task.task_items) 
          .find(item => item.id === item_id);

          console.log(taskItemToUpdate)

        if (taskItemToUpdate) {
          taskItemToUpdate.done = !taskItemToUpdate.done;
        }

        setTasks(updatedTasks);

      } else {
        console.error('Error updating task:', response.status);
      }
    } catch (error) {
      console.error('Request error:', error);
    }
  }
  
  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:8009/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const updatedTasks = theTasks.filter(theTasks => theTasks.id !== taskId);
        setTasks(updatedTasks);
        console.log('Task deleted successfully');
        // Perform any additional actions after successful deletion
      } else {
        console.error('Error deleting task:', response.status);
        // Handle the error case
      }
    } catch (error) {
      console.error('Request error:', error);
      // Handle any network or other errors
    }
  };

  const deleteTaskItem = async (itemId: any) => {
    try {
      const response = await fetch(`http://localhost:8009/tasks_item?item_id=${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const updatedTasks = [...theTasks];
        const filteredTasks = updatedTasks.map(task => {
        const filteredTaskItems = task.task_items.filter(item => item.id !== itemId);
        return { ...task, task_items: filteredTaskItems };
      });
        
        setTasks(filteredTasks);
      } else {
        console.error('Error deleting task item:', response.status);
      }
    } catch (error) {
      console.error('Request error:', error);
    }
  };
  
  

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch('http://localhost:8009/tasks_full', {
          credentials: 'include',
        });
        const data = await response.json();
        setTasks(data);
        console.log('what')
        console.log(data);
      } catch (error) {
        console.error('Request error:', error);
      }
    }
    const getProfile = () => {
      fetch('http://localhost:8009/users/me', {
        method: "GET",
        credentials: 'include',
        headers: {
          accept: "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            console.log(response);
          } else {
            return response.json();
          }
        })
        .then((responseData) => {
          setUserId(responseData.id);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const getProjects = async () => {
      try {
        const response = await fetch('http://localhost:8009/projects', {
          method: "GET",
          credentials: 'include',
          headers: {
            accept: "application/json",
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          console.log(response)
        }else{
          const ids = responseData.map((data: any) => data.id);
          console.log(ids)
          setValue(ids[0])
          setProjects(responseData)
        }
      }catch (error) {
        console.error(error);
      }
    };
    getProjects()
    getProfile()
    getTasks()
    setTrigger(false);
        
  }, [trigger]);

  const addTask = async () => {
    try {
      const response = await fetch('http://localhost:8009/tasks', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'string',
          description: 'string',
          user_id: userId,
          project_id: 0
        })
      });
      const responseData = await response.json();
      if (!response.ok) {
        load('TASK_NOT_CREATED')
      } else {
        console.log(responseData)
        //setTasks([...theTasks, newTask]);
        const newTask: Task = {
          id: responseData.id,
          user_id: responseData.user_id,
          name: responseData.name,
          description: responseData.description,
          project_id: 0,
          task_items: []
        };
      
        setTasks(prevTasks => [...prevTasks, newTask]);
        load('TASK_CREATED')
      }
    }catch (error) {
      console.error(error);
    }
  }

  const addTaskItem = async (task_id: any) => {
    try {
      const response = await fetch('http://localhost:8009/tasks_item', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'item 3',
          task_id: task_id,
          done: false
        })
      });
  
      if (response.ok) {
        // Item added successfully
        console.log('Item added successfully');
        setTrigger(true);
      } else {
        // Item addition failed
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Request error:', error);
    }
  }

  const handleParkingLot = async (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event.nativeEvent;
    console.log("Clicked position:", clientX, clientY);
    parkinTicket(clientX, clientY)
  }

  const handleParkingLotDesign = async (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Clicked position:");
  }
  

  const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' },
    { title: 'Four', description: 'Select Rooms' },
    { title: 'Five', description: 'Select Rooms' },
  ]

  const tasks = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Date & Time' },
  ]
  
  const { activeStep } = useSteps({
    index: 2,
    count: steps.length,
  })

  const changeItem = async (value: string, item_id: number) => {
    try {
      const response = await fetch(`http://localhost:8009/tasks_item/${item_id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": value })
      });
      if (response.ok) {
        const updatedTasks = [...theTasks];
  
        const taskItemToUpdate = updatedTasks
          .flatMap(task => task.task_items) 
          .find(item => item.id === item_id);
  
        if (taskItemToUpdate) {
          taskItemToUpdate.name = value;
        }
  
        setTasks(updatedTasks);
      } else {
        console.error('Error updating task:', response.status);
      }
    } catch (error) {
      console.error('Request error:', error);
    }
  };
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, item_id: number) => {
    const value = event.target.value;
    changeItem(value, item_id);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, task_id: number) => {
    if (event.key === 'Enter') {
      addTaskItem(task_id)
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>, task_id: number) => {
    const selected_project_id =  parseInt(event.target.value);
    try {
      const response = await fetch(`http://localhost:8009/tasks/${task_id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: selected_project_id
        })
      });

      if (response.ok) {
        const updatedTasks = [...theTasks];
        const taskToUpdate = updatedTasks.find(task => task.id === task_id);

        if (taskToUpdate) {
          taskToUpdate.project_id = selected_project_id;
        }

        setTasks(updatedTasks);
      } else {
        console.error('Error updating task:', response.status);
      }
    } catch (error) {
      console.error('Request error:', error);
    }
  };

  const parkinTicket = (x: any, y: any) => {
    const boxStyle: React.CSSProperties = {
      position: 'absolute',
      top: y,
      left: x,
      width: '100px',
      height: '100px',
      backgroundColor: 'red',
    };
  
    const parkingTicket: ParkingTicket = {
      id: 1,
      name: "Example Parking Ticket",
      top: y,
      left: x
    };
    const tempDivs = [...divs, parkingTicket];
    setDivs(tempDivs);
  };
  
  

  return (
    <Grid
      templateAreas={`"dashboard parking"`}
      gridTemplateRows={'100% 100%'}
      gridTemplateColumns={'75% 25%'}
      h='100%'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' bg='#eeecff' p='6' area={'dashboard'} 
        // boxShadow='inner'
        boxShadow='inset 0px 0px 10px rgba(0, 0, 0.5, 0.5)'>
          <Box h='100%' w='100%'>
            <Box h='90%' w='100%' overflowY="scroll">
              <AddIcon boxSize={8} onClick={addTask} mb='2'/>
                {theTasks.length > 0 && (
                  theTasks.map((task: any) => (
                    <div key={task.id}>
                      <Card mb='3'>
                        <CardBody>
                          <Box width='100vh'>
                            <Flex direction="column">
                              <Box mb={2}>{task.name}</Box>
                              {/* <Box width="100%">
                                <Code colorScheme='red' children="var chakra = 'awesome!'" m='4' />
                              </Box> */}
                              {task.task_items
                                .sort((a: any, b: any) => a.id - b.id) // Sort the task_items based on item.id
                                .map((item: any) => (
                                  <InputGroup>
                                  <InputLeftElement>
                                    <Checkbox
                                      key={item.id}
                                      isChecked={item.done}
                                      onChange={() => handleCheckbox(task.id, item.id, item.done)}
                                    >
                                  </Checkbox>
                                  </InputLeftElement>
                                  <Input
                                    id={item.id}
                                    key={item.id}
                                    value={item.name}
                                    onChange={(event) => handleInputChange(event, item.id)}
                                    onKeyDown={(event) => handleKeyDown(event, task.id)}
                                  />  
                                  <InputRightElement>
                                    <IconButton
                                      colorScheme="gray"
                                      aria-label="Delete"
                                      icon={<DeleteIcon />}
                                      onClick={() => deleteTaskItem(item.id)}
                                    />
                                  </InputRightElement>
                                </InputGroup>
                                ))}

                            </Flex>
                            <AddIcon boxSize={6} onClick={() => addTaskItem(task.id)} m='2'/>
                            <Flex justify="space-between" mt={4} align="center">
                            <label>Select a project:</label>
                            <select value={task.project_id} onChange={(event: ChangeEvent<HTMLSelectElement>) => handleChange(event, task.id)}>
                              {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                  {project.name}
                                </option>
                              ))}
                            </select>
                            <p>Selected project ID: {task.project_id}</p>
                              <IconButton
                                colorScheme="red"
                                aria-label="Delete"
                                icon={<DeleteIcon />}
                                onClick={() => deleteTask(task.id)}
                              />
                            </Flex>
                          </Box>
                        </CardBody>
                      </Card>
                    </div>
                  ))
                )}

            </Box>
            <Box h='10%' w='100' >
              <Stepper index={activeStep}>
                {tasks.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink='0'>
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
        </GridItem>
      <GridItem
        area={'parking'}
        bg='#f7f7f7'
        cursor="pointer"
        _hover={{ cursor: "crosshair"}}
        onClick={(event) => handleParkingLot(event)}
      >
        <Heading>Parking Lot</Heading>
        {divs.map((div) => (
          <div key={div.id} style={{ position: 'absolute', top: div.top, left: div.left, width:'130px', height:'130px', background:'white'}}>
            <p>{div.name}</p>
          </div>
        ))}

      </GridItem>
    </Grid>


    );
}