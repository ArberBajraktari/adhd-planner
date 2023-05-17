import React, { ChangeEvent } from 'react';
import { useState, useEffect } from "react";
import { Container, Flex, Text, Input, InputGroup, Stack, 
          InputRightElement, Button, Card, CardHeader, CardBody, 
          Heading, StackDivider, Box, ModalOverlay, Modal, ModalBody, 
          ModalCloseButton, ModalContent, ModalHeader, useToast, Spinner, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay 
        } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { ArrowBackIcon } from '@chakra-ui/icons';

function LogIn(props: any) {
    const [show, setShow] = React.useState(false);
    const [logged, setLogged] = useLocalStorage('logged', 'dummy');
    const handleClick = () => setShow((prevShow) => !prevShow);
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const toast = useToast()
    const cancelRef = React.useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const [showContent1, setShowContent1] = useState(true);

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
      setInputEmail(e.target.value);
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
      setInputPassword(e.target.value);
    };

    const forgotPassword = () => {
      setShowContent1(!showContent1);
    }

    const sendToken = async () => {
      try {
        const response = await fetch('http://localhost:8009/auth/forgot-password', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: inputEmail }),
        });
      
        if (response.ok) {
          // Success
          // Display a success message or perform any additional actions
          console.log('Password reset email sent successfully');
        } else {
          // Error
          // Display an error message or handle the error appropriately
          console.error('Failed to send password reset email');
        }
      } catch (error) {
        // Exception/Error occurred
        // Handle the error, display an error message, or perform any necessary actions
        console.error('An error occurred during password reset:', error);
      }      
    }

    const goHome = () => {
      toast({
        title: 'Logged in!',
        description: "Be productive!",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      navigate('/home');
    };

    const logIn = async () => {
      try {
        const response = await fetch('http://localhost:8009/auth/jwt/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            'grant_type': '',
            'username': inputEmail,
            'password': inputPassword,
            'scope': '',
            'client_id': '',
            'client_secret': ''
          })
        
        });
        if (!response.ok) {
          toast({
            title: 'Cannot log in!',
            description: "Credentials are wrong!",
            status: 'warning',
            duration: 2000,
            isClosable: true,
          })
          onClose()
          setLogged("false")
        }else{
          setLogged("true")
          goHome()
        }
      }catch (error) {
        console.error(error);
      }
    };

    const handleLogInClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsOpen(true)
      event.preventDefault();
      logIn();
    };
  
    useEffect(() => {
        if(logged === "true"){
            navigate('/home');
        }
    }, [logged, navigate]);

    return (
      <div className="App">
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
              display="flex"
              alignItems="center"
              justifyContent="center">
                Authenticating
              </AlertDialogHeader>
              <AlertDialogBody
              display="flex"
              alignItems="center"
              justifyContent="center">
                <Spinner size='xl' color='green'/>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Modal isOpen={props.isOpen} onClose={props.onClose} closeOnOverlayClick={false} size={'xl'}  isCentered>
          <ModalOverlay />
            <ModalContent m={20} p={3}>
              <ModalHeader>Log in</ModalHeader>
              <ModalCloseButton />
              <ModalBody >
              <Container>
                <Card size={'lg'} mb='10'>
                {showContent1 ? (
                  <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                        Email:
                      </Heading>
                      <Input placeholder="email" 
                      onChange={handleEmail}
                      value={inputEmail}/>
                    </Box>
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                        Password:
                      </Heading>
                      <InputGroup size="md">
                        <Input
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          placeholder="Enter password"
                          onChange={handlePassword}
                          value={inputPassword}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <Button colorScheme='teal' variant='link' mt='4' onClick={forgotPassword}>
                        Forgot password?
                      </Button>
                    </Box>
                    <Box>
                        <Button colorScheme='teal' variant='outline' onClick={handleLogInClick}>
                          Log in
                        </Button>
                    </Box>
                  </Stack>
                </CardBody>
                ) : (
                  <>
                    <Flex justify="flex-start">
                      <Button colorScheme='teal' variant='outline' onClick={forgotPassword}>
                        <ArrowBackIcon >
                        </ArrowBackIcon>
                        </Button>
                    </Flex>
                    <CardBody>
                    <Stack divider={<StackDivider />} spacing='2'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase'>
                          Email:
                        </Heading>
                        <Input placeholder="email" 
                        onChange={handleEmail}
                        value={inputEmail}/>
                      </Box>
                      <Box>
                          <Button colorScheme='teal' variant='outline' onClick={sendToken}>
                            Send token
                          </Button>
                      </Box>
                    </Stack>
                  </CardBody>
                </>
                )}
                  
                </Card>
                <Text fontSize='sm'>{errorMsg}</Text>
              </Container>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      );
}

export default LogIn;
