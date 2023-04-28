import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Heading,
    Spacer,
    ButtonGroup,
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
  
  
  export default function NavbarFooter(props: { logged: any; }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const [logged, setLogged, remove] = useLocalStorage('logged', 'dummy');
  
  
    const gotToSignUp = () => {
  
      // This will navigate to first component
      navigate('/sign_up');
  };
  
  const gotToLogIn = () => {
  
      // This will navigate to first component
      navigate('/log_in');
  };
  
    const logOut = () => {
      setLogged("false")
    };
  
  const handleLogOutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      logOut()
      navigate('/');
    };
  
    if(props.logged === 'true'){
      return (
        <div>
          <Box h='100vh' w={'15%'} float='left'>
            <Flex color='white' h='100%' flexDirection="column">
              <Box w='100%' h='90%' bg='green.500' float='left'>
                <Text>Box 1</Text>
              </Box>
              <Box w='100%' h='10%' bg='green.500'>
                <Button
                    backgroundColor="#f8985b"
                    _hover={{ bg: "#e54a2e", color: "white" }}
                    color="white"
                    variant="solid"
                    size={["sm", "md"]}
                    id="resumeBtn"
                    alignSelf="flex-end"
                    onClick={handleLogOutClick}>
                    <a target="_blank">
                      Log out
                    </a>
                </Button>
              </Box>
            </Flex>
          </Box>
        </div>)
    }else{
      return (
        <div>
          <Box h='100vh' w={'15%'} float='left'>
            <Flex color='white' h='100%' flexDirection="column">
              <Box w='100%' h='90%' bg='green.500' float='left'>
                <Text>Box 1</Text>
              </Box>
              <Box w='100%' h='10%' bg='green.500'>
                <Flex minWidth='max-content' alignItems='center' gap='2'>
                    <ButtonGroup gap='2' m={3}>
                        <Button
                            backgroundColor="#b1e6ea"
                            color='black'
                            _hover={{ bg: "#2198c3", color: "white" }}
                            onClick={gotToSignUp}>Sign Up</Button>
                        <Button
                            backgroundColor="#b1e6ea"
                            color='black'
                            _hover={{ bg: "#2198c3", color: "white" }}
                            onClick={gotToLogIn}>Log in</Button>
                    </ButtonGroup>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </div>)
    }
  }
    