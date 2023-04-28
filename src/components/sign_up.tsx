import React, { ChangeEvent } from 'react';
import { useState, useEffect } from "react";
import { useLocalStorage } from 'react-use';
import { Container, Modal, ModalOverlay, ModalContent, 
          ModalHeader, ModalCloseButton, ModalBody, 
          ModalFooter, Text, Flex, Input, InputGroup, Stack, 
          InputRightElement, Button, Card, CardHeader, 
          CardBody, Heading, StackDivider, Box, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function SignUp(props: any) {
  const [logged] = useLocalStorage('logged', 'dummy');
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow((prevShow) => !prevShow);
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setInputUsername(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };

  const goBack = () => {
    navigate('/');
  };

  const handleRegisterUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    registerUser();
  };

  const registerUser = async () => {
    try {
      const response = await fetch('http://localhost:8009/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
          is_active: true,
          is_superuser: false,
          is_verified: false
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.detail === "REGISTER_USER_ALREADY_EXISTS"){
          setErrorMsg("User already exists!")
        }
      } else {
        setErrorMsg("User registered!")
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Modal isOpen={props.isOpen} onClose={props.onClose} closeOnOverlayClick={false} size={'xl'} isCentered>
        <ModalOverlay />
          <ModalContent m={20} p={3}>
            <ModalHeader>Sign up</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Container>
              <Card size={'lg'} mb='10'>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                        Username:
                      </Heading>
                      <Input placeholder="email" 
                      onChange={handleUsername}
                      value={inputUsername}/>
                    </Box>
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                        ** Email: **
                      </Heading>
                      <Input placeholder="email" 
                      onChange={handleEmail}
                      value={inputEmail}/>
                    </Box>
                    <Box>
                      <Heading size='xs' textTransform='uppercase'>
                        ** Password: **
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
                        <Button colorScheme='teal' variant='outline' onClick={handleRegisterUserClick}>
                          Sign up
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

export default SignUp;
