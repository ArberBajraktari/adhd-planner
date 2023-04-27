import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Container, Flex, Input, InputGroup, Stack, InputRightElement, Button, Card, CardHeader, CardBody, Heading, StackDivider, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

type resultProps = {
  detail: string;
};

function SignUp() {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow((prevShow) => !prevShow);
  const [result, setResult] = useState<resultProps[]>([]);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    setInputEmail(e.target.value);
  };


  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    setInputPassword(e.target.value);
  };

  const goBack = () => {
    // This will navigate to first component
    navigate('/');
};

  const updateWinnersAndLosers = () => 
    async () => {
      const data = await fetch('http://localhost:8009/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
          is_active: true,
          is_superuser: false,
          is_verified: false
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
      
      // console.log("thirret")
      console.log(data)
    };
 

  return (

      <div className="App">

        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='4'>
            <button onClick={goBack}> 
                <Button colorScheme='teal' variant='outline'>
                    Back
                </Button>
            </button>
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
              <button onClick={updateWinnersAndLosers()}> 
                <Button colorScheme='teal' variant='outline'>
                  Sign up
                </Button>
              </button>
            </Box>
            </Stack>
          </CardBody>
      </Card>
    </Container>
    </div>
    );
}

export default SignUp;
