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
    DrawerHeader
  } from "@chakra-ui/react";
  import { useNavigate } from 'react-router-dom';
  import { useLocalStorage } from 'react-use';
  import { useState } from "react";
  
  
  export default function Dashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const [logged, setLogged, remove] = useLocalStorage('logged', 'dummy');
  
  
    const logOut = () => {
      setLogged("false")
    };
  
  const handleLogOutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      logOut()
      navigate('/');
    };

    return (
        <div>
            <Box
                    h='100vh'
                    bg={useColorModeValue("gray.100", "gray.900")}
                    px={9}
                    width={["70%"]}
                    float='left'
                >
                    
                </Box>
      </div>
      );
}