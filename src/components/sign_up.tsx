import React, { ChangeEvent } from 'react';
import { useState, useEffect } from "react";
import { useLocalStorage } from 'react-use';
import { Container, Modal, ModalOverlay, ModalContent, 
          ModalHeader, ModalCloseButton, ModalBody, 
          ModalFooter, Text, Flex, Input, InputGroup, Stack, 
          InputRightElement, Button, Card, CardHeader, 
          CardBody, Heading, StackDivider, Box, useDisclosure, useToast, FormControl, FormLabel, FormErrorMessage, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, VisuallyHidden, Tooltip } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import config from '../conf/config';
import TooltipInfo from './tooltip_info';

function SignUp(props: any) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow((prevShow) => !prevShow);
  const [inputUsername, setInputUsername] = useState("");
  const [usernameError, setUsernameError] = useState('');
  const [fNameError, setFNameError] = useState('');
  const [inputEmail, setInputEmail] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputBD, setInputBD] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const toast = useToast();
  const [fNameCorrect, setFNameCorrect] = useState(true);
  const [lNameCorrect, setLNameCorrect] = useState(true);
  const [emailCorrect, setEmailCorrect] = useState(true);
  const [usernameCorrect, setUsernameCorrect] = useState(true);
  const [pwdCorrect, setPwdCorrect] = useState(true);
  const [isTooltipUsername, setTooltipUsername] = useState(false);
  const [isTooltipFirstName, setTooltipFirstName] = useState(false);
  const [isTooltipLastName, setTooltipLastName] = useState(false);
  const [isTooltipEmail, setTooltipEmail] = useState(false);
  const [isTooltipPwd, setTooltipPwd] = useState(false);

  const openTooltipUsername = () => {
    setTooltipUsername(true);
  };

  const closeTooltipUsername = () => {
    setTooltipUsername(false);
  };

  const openTooltipFirstName = () => {
    setTooltipFirstName(true);
  };

  const closeTooltipFirstName = () => {
    setTooltipFirstName(false);
  };

  const openTooltipLastName = () => {
    setTooltipLastName(true);
  };

  const closeTooltipLastName = () => {
    setTooltipLastName(false);
  };

  const openTooltipEmail = () => {
    setTooltipEmail(true);
  };

  const closeTooltipEmail = () => {
    setTooltipEmail(false);
  };

  const openTooltipPwd = () => {
    setTooltipPwd(true);
  };

  const closeTooltipPwd = () => {
    setTooltipPwd(false);
  };

  const registerUser = async () => {
    console.log(fNameCorrect)
    if (fNameCorrect === true && lNameCorrect === true && emailCorrect === true && usernameCorrect === true) {
      try {
        const response = await fetch('http://localhost:8009/checkUsername?username=' + inputUsername, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        const data = await response.json()
        if(data['status'] !== null){
          setErrorMsg('Username already exists!')
        }else{
          try {
            const response = await fetch('http://localhost:8009/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: inputEmail,
                password: inputPassword,
                is_active: true,
                is_superuser: false,
                is_verified: false,
                username: inputUsername,
                first_name: inputFirstName,
                last_name: inputLastName,
                gender: "male",
                date_of_birth: inputBD
              })
            });
      
            const responseData = await response.json();
            if (response.status === 422) {
              load('FORM_UNCOMPLETE')
            }
            if (!response.ok) {
              if (responseData.detail === "REGISTER_USER_ALREADY_EXISTS"){
                load('REGISTER_USER_ALREADY_EXISTS')
              }else{
                load('USER_REGISTERED')
              }
            } else {
              load('USER_REGISTERED')
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }


  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputEmail(value);
    if (value.trim() === ''){
      setEmailCorrect(true);
      closeTooltipEmail()
    }else{
      if (!config.emailRegex.test(value)) {
        setEmailCorrect(false);
        openTooltipEmail()
      } else {
        closeTooltipEmail()
        setEmailCorrect(true);
      }
    }  
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputUsername(e.target.value);
    if (value.trim() === ''){
      setUsernameCorrect(true);
      setUsernameError('');
      closeTooltipUsername()
    }else{
      if (!config.usernameRegex.test(value)) {
        setUsernameCorrect(false);
        openTooltipUsername()
      } else {
        closeTooltipUsername()
        setUsernameCorrect(true);
      }
    }  
  };

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputFirstName(e.target.value);
    if (value.trim() === ''){
      setFNameCorrect(true);
      closeTooltipFirstName()
    }else{
      if (!config.usernameRegex.test(value)) {
        setFNameCorrect(false);
        openTooltipFirstName()
      } else {
        closeTooltipFirstName()
        setFNameCorrect(true);
      }
    } 
  };

  const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputLastName(e.target.value);
    if (value.trim() === ''){
      setLNameCorrect(true);
      closeTooltipLastName()
    }else{
      if (!config.usernameRegex.test(value)) {
        setLNameCorrect(false);
        openTooltipLastName()
      } else {
        closeTooltipLastName()
        setLNameCorrect(true);
      }
    } 
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
    if (inputPassword.length < 8) {
      setPwdCorrect(false);
      openTooltipPwd()
    } else {
      setPwdCorrect(true);
      closeTooltipPwd()
    }
  };

  const handleBD = (e: ChangeEvent<HTMLInputElement>) => {
    setInputBD(e.target.value);
  };

  const load = (status: string) => {
    if(status === 'REGISTER_USER_ALREADY_EXISTS'){
      toast({
        title: 'User exists already.',
        description: "This email has an account, try remember password.",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
    }else if(status === 'FORM_UNCOMPLETE'){
      toast({
        title: 'Form not comlpeted!',
        description: "Please fill the form",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
    }else{
      toast({
        title: 'Account created!',
        description: "You can log in",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const handleRegisterUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    registerUser();
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
                  <Stack spacing='4'>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Username:</FormLabel>
                        <Input placeholder="filan_123" 
                        variant='filled'
                        onChange={handleUsername}
                        value={inputUsername} 
                        borderColor={usernameCorrect ? 'gray.300' : 'red.500'}
                        _focus={{ borderColor: usernameCorrect ? 'gray.300' : 'red.500'}}/>
                        {usernameError}
                        <TooltipInfo 
                          isOpen={isTooltipUsername}
                          onClose={closeTooltipUsername}
                          status={config.usernameErrorMessage}/>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>First Name:</FormLabel>
                        <Input placeholder="Filan" 
                        variant='filled'
                        onChange={handleFirstName}
                        value={inputFirstName}
                        borderColor={fNameCorrect ? 'gray.300' : 'red.500'}
                        _focus={{ borderColor: fNameCorrect ? 'gray.300' : 'red.500'}}/>
                        <TooltipInfo 
                          isOpen={isTooltipFirstName}
                          onClose={closeTooltipFirstName}
                          status={config.firstNameErrorMessage}/>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Last Name:</FormLabel>
                        <Input placeholder="Fisteku" 
                        variant='filled'
                        onChange={handleLastName}
                        value={inputLastName}
                        borderColor={lNameCorrect ? 'gray.300' : 'red.500'}
                        _focus={{ borderColor: lNameCorrect ? 'gray.300' : 'red.500'}}/>
                        <TooltipInfo 
                          isOpen={isTooltipLastName}
                          onClose={closeTooltipLastName}
                          status={config.lastNameErrorMessage}/>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Birthday:</FormLabel>
                        <Input
                        placeholder="2000.01.01"
                        size="md"
                        type="date"
                        variant='filled'
                        onChange={handleBD}
                        value={inputBD}
                        borderColor="gray.300"
                        _focus={{ borderColor: 'gray.300' }}
                      />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Email:</FormLabel>
                        <Input placeholder="filanfisteku@gmail.com" 
                        variant='filled'
                        onChange={handleEmail}
                        value={inputEmail}
                        borderColor={emailCorrect ? 'gray.300' : 'red.500'}
                        _focus={{ borderColor: emailCorrect ? 'gray.300' : 'red.500'}}/>
                        <TooltipInfo 
                          isOpen={isTooltipEmail}
                          onClose={closeTooltipEmail}
                          status={config.emailErrorMessage}/>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Password:</FormLabel>
                        <InputGroup size="md">
                          <Input
                            pr="4.5rem"
                            variant='filled'
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                            onChange={handlePassword}
                            value={inputPassword}
                            borderColor={pwdCorrect ? 'gray.300' : 'red.500'}
                            _focus={{ borderColor: pwdCorrect ? 'gray.300' : 'red.500'}}/>
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                              {show ? "Hide" : "Show"}
                            </Button>
                            <TooltipInfo 
                          isOpen={isTooltipPwd}
                          onClose={closeTooltipPwd}
                          status={config.emailErrorPwd}/>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
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
