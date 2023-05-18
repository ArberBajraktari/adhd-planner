import {
    Box, useToast,
    Grid, GridItem, Heading, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, useSteps, Button, Input, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Card, CardBody, Code, Flex
  } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function DashboardToday(props: any) {
  const toast = useToast();
  const [theTasks, setTasks] = useState<any[]>([])
  const [userId, setUserId] = useState('');

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

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch('http://localhost:8009/tasks', {
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
    const getProfile = async () => {
      try {
        const response = await fetch('http://localhost:8009/users/me', {
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
          setUserId(responseData.id)
          console.log(userId)
        }
      }catch (error) {
        console.error(error);
      }
    };
    getProfile()
    getTasks()
        
  }, []);

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
          user_id: userId
        })
      });
      const responseData = await response.json();
      if (!response.ok) {
        load('TASK_NOT_CREATED')
      } else {
        const newTask = { name: 'New Task', description: 'New Task Description', id: responseData.id };
        setTasks([...theTasks, newTask]);
        load('TASK_CREATED')
      }
    }catch (error) {
      console.error(error);
    }
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
                <Button colorScheme='teal' size='md' onClick={addTask}>
                  Button
                </Button>
                {theTasks.length > 0 && (
                  theTasks.map((task: any) => (
                    <div key={task.id}>
                      <Card mb='3'>
                        <CardBody>
                          <Box width='100vh'>
                            <Flex direction="column">
                              <Box mb={2}>{task.name}</Box>
                              <Box width="100%">
                                <Code colorScheme='red' children="var chakra = 'awesome!'" />
                              </Box>
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
      >
        <Heading>Parking Lot</Heading>
      </GridItem>
    </Grid>


    );
}