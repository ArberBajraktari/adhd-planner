import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Container, Input, InputGroup, Stack, InputRightElement, Button, Card, CardHeader, CardBody, Heading, StackDivider, Box } from '@chakra-ui/react'
  
type resultProps = {
  detail: string;
};

function SignUp() {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow((prevShow) => !prevShow);
  const [result, setResult] = useState<resultProps[]>([]);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    setInputEmail(e.target.value);
  };


  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    setInputPassword(e.target.value);
  };
  // useEffect(() => {
  //   const api = async () => {
  //     const data = await fetch("http://localhost:8009/auth/register", {
  //       method: "POST"
  //     });
  //     const jsonData = await data.json();
  //     setResult(jsonData.results);
  //   };

  //   api();
  // }, []);
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
      <h1>
        <div>
        </div>
      </h1>
    <Container>
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
