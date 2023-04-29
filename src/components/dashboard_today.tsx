import {
  Box,
    Card,
    CardBody,
    Flex, Text,
    Grid, GridItem, Heading, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, useSteps, Button
  } from "@chakra-ui/react";
import NavbarMenu from "./navbar_menu";
import NavbarTop from "./navbar_top";

export default function DashboardToday(props: any) {
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
              <Button w='100%' mt='2' h='150' bg='#e9e8f1'
                _hover={{bg: '#d5d4e4'}}>
                Today
              </Button>
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