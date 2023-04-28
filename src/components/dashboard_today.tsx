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
      fontWeight='bold'>
      <GridItem pl='2' bg='red.100' area={'dashboard'}>
        <Heading>
          Today
        </Heading>
      </GridItem>
      <GridItem pl='2' bg='red.200' area={'parking'}>
        <Heading>
          Parking Lot
        </Heading> 
      </GridItem>
  </Grid>
    );
}