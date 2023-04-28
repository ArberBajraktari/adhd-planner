import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    DrawerContent,
    HStack,
    DrawerOverlay,
    useDisclosure,
    IconButton,
    Square,
    Text,
    Center,
    DrawerHeader,
    Heading
  } from "@chakra-ui/react";
  import { useNavigate } from 'react-router-dom';
  import { useLocalStorage } from 'react-use';
  import { useState } from "react";
  
  
  export default function ParkingLot() {
    const navigate = useNavigate();

    return (

      <Box w='100vh' bg='red.500'>
        <Heading size="md">
            Parking Lot
        </Heading>
      </Box>
      );
}