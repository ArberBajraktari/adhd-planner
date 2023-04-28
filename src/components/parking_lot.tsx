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
        <div>
            <Box
                    h='100vh'
                    // backgroundImage="url(//google.com/sample-image-that-doesnt-exist.svg),linear-gradient(106.61deg, #F8E1EC 0%, #FDF3F3 100%)"
                    backgroundSize="cover"
                    backgroundPosition="center"
                    bg={'red.100'}
                    px={9}
                    width={["15%"]}
                    float='left'
                >
                    <Heading size="md" p="4">
                        Parking Lot
                    </Heading>
                </Box>
      </div>
      );
}