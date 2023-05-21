import {
    Box, useToast,
    Grid, GridItem, Heading, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, useSteps, Button, Input, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Card, CardBody, Code, Flex, IconButton, InputGroup, InputLeftElement, InputRightElement, Select
  } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"; 
import ApiService from "../services/apiService";
import { Task, TaskItem, ParkingTicket, Projects } from "../interfaces/types";


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
    const updatedTaskITem = await ApiService.updateTaskItemStatus(!status, item_id)
    if(updatedTaskITem.status === 'TASK_ITEM_UPDATED'){
      const updatedTasks = [...theTasks];

      const taskItemToUpdate = updatedTasks
        .flatMap(task => task.task_items) 
        .find(item => item.id === item_id);

        console.log(taskItemToUpdate)

      if (taskItemToUpdate) {
        taskItemToUpdate.done = !taskItemToUpdate.done;
      }

      setTasks(updatedTasks);
    }
  }
  
  const deleteTask = async (taskId: number) => {
    const deletedTask = await ApiService.deleteTask(taskId);
    if(deletedTask.status == 'TASK_DELETED'){
        const updatedTasks = theTasks.filter(theTasks => theTasks.id !== taskId);
        setTasks(updatedTasks);
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
      setTasks(await ApiService.getTasks())
    }
    const getProfile = async () => {
      const userProfile = await ApiService.getProfile()
      setUserId( userProfile.id)
    };
    const getProjects = async () => {
      const projects = await ApiService.getProjects()
      setProjects(projects)
    };
    getProjects()
    getProfile()
    getTasks()
    setTrigger(false);
        
  }, [trigger]);

  const addTask = async () => {
    const addedTask = await ApiService.addTask(userId)
    if(addedTask.status === 'TASK_ADDED'){
      const newTask: Task = {
        id: addedTask.data.id,
        user_id: addedTask.data.user_id,
        name: addedTask.data.name,
        description: addedTask.data.description,
        project_id: 0,
        task_items: []
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
  }

  const addTaskItem = async (task_id: any) => {
    const addedTaskItem = await ApiService.addTaskItem(task_id)
    setTrigger(true);
  }

  const handleParkingLot = async (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event.nativeEvent;
    console.log("Clicked position:", clientX, clientY);
    parkinTicket(clientX, clientY)
  }
  
  const { activeStep } = useSteps({
    index: 0,
    count: theTasks.length,
  })

  const changeItem = async (value: string, item_id: number) => {
    await ApiService.updateTaskItemName(value, item_id)
    const updatedTasks = [...theTasks];
      
    const taskItemToUpdate = updatedTasks
      .flatMap(task => task.task_items) 
      .find(item => item.id === item_id);

    if (taskItemToUpdate) {
      taskItemToUpdate.name = value;
    }

    setTasks(updatedTasks);
    
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
    const updatedProjectTask = await ApiService.updateProjectId(selected_project_id, task_id )
    if(updatedProjectTask.status === 'PROJECT_ID_UPDATED'){
      const updatedTasks = [...theTasks];
      const taskToUpdate = updatedTasks.find(task => task.id === task_id);
      if (taskToUpdate) {
        taskToUpdate.project_id = selected_project_id;
      }
      setTasks(updatedTasks);
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
                {theTasks.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink='0'>
                      <StepTitle>{step.name}</StepTitle>
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