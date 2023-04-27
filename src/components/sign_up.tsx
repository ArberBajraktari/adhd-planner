import React, { ChangeEvent } from 'react';
import { useState } from "react";
import { Container, Text, Flex, Input, InputGroup, Stack, InputRightElement, Button, Card, CardHeader, CardBody, Heading, StackDivider, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const [show, setShow] = React.useState(false);
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

        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='4'>
              <Button colorScheme='teal' variant='outline' onClick={goBack}>
                  Back
              </Button>
            </Box>
        </Flex>
    <Container mt={20}>
      <Card>
        <CardHeader>
            <Heading size='md'>Sign up</Heading>
        </CardHeader>
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
                <Button colorScheme='teal' variant='outline' onClick={handleRegisterUserClick}>
                  Sign up
                </Button>
            </Box>
            </Stack>
          </CardBody>
      </Card>
      <Text fontSize='sm'>{errorMsg}</Text>
    </Container>
    </div>
    );
}

export default SignUp;
