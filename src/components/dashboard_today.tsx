import {
    Grid, GridItem, Heading
  } from "@chakra-ui/react";

export default function DashboardToday(props: any) {
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
        boxShadow='inner'
        // boxShadow='inset 0px 0px 10px rgba(0, 0, 0.5, 0.5)'
        >
        <Heading>Today</Heading>
      </GridItem>
      <GridItem
        pl='2'
        area={'parking'}
        bg='#f7f7f7'
      >
        <Heading>Parking Lot</Heading>
      </GridItem>
    </Grid>


    );
}