import React, { ChangeEvent } from 'react';
import { useState, useEffect } from "react";
import { Container, Flex, Text, Input, InputGroup, Stack, InputRightElement, Button, Card, CardHeader, CardBody, Heading, StackDivider, Box, ModalOverlay, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

function LogIn(props: any) {
    const [show, setShow] = React.useState(false);
    const [logged, setLogged] = useLocalStorage('logged', 'dummy');

    const handleClick = () => setShow((prevShow) => !prevShow);
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
      setInputEmail(e.target.value);
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
      setInputPassword(e.target.value);
    };
  
    const goBack = () => {
      navigate('/');
    };


    const goHome = () => {
      navigate('/home');
    };

    const logIn = async () => {
      try {
        const response = await fetch('http://localhost:8009/auth/jwt/login', {
          method: 'POST',
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
        const responseJSON = await response.json()
        if (!response.ok) {
          if(responseJSON.detail == "LOGIN_BAD_CREDENTIALS"){
            setErrorMsg("Email or password are wrong!")
          }
        }else{
          setLogged("true")
          goHome()
        }
      }catch (error) {
        console.error(error);
      }

    };

    const handleLogInClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <Modal isOpen={props.isOpen} onClose={props.onClose} closeOnOverlayClick={false} size={'xl'}  isCentered>
          <ModalOverlay />
            <ModalContent m={20} p={3}>
              <ModalHeader>Log in</ModalHeader>
              <ModalCloseButton />
              <ModalBody >
              <Container>
                <Card size={'lg'} mb='10'>
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
                      </Box>
                      <Box>
                          <Button colorScheme='teal' variant='outline' onClick={handleLogInClick}>
                            Log in
                          </Button>
                      </Box>
                    </Stack>
                  </CardBody>
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
