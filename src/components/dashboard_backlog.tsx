
import {
    Box, GridItem, Heading
  } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';

export default function DashboardBacklog(props: any) {
  const [value, setValue] = useState('');


  return (
    <Box bg='red.100' h='100%'>
        <Heading>Backlog</Heading>
    </Box>
    );
}