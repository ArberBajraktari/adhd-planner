import {
    useColorMode, Box, Button,
    ButtonGroup, Container, Modal, ModalOverlay, ModalContent, 
    ModalHeader, ModalCloseButton, ModalBody, 
    ModalFooter, Text, Flex, Input, InputGroup, Stack, 
    InputRightElement, Card, CardHeader, 
    CardBody, Heading, StackDivider, useDisclosure
  } from "@chakra-ui/react";
  import React, { ChangeEvent } from 'react';
import { useState, useEffect } from "react";
  import { useNavigate } from 'react-router-dom';
  import { useLocalStorage } from 'react-use';
import LogIn from "./log_in";
import SignUp from "./sign_up";
  
  
  export default function NavbarFooter(props: { logged: any;}) {
    const navigate = useNavigate();
    const [logged, setLogged] = useLocalStorage('logged', 'dummy');
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow((prevShow) => !prevShow);
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
  
  
    const gotToSignUp = () => {
        // navigate('/sign_up');
    };
  
    const gotToLogIn = () => {
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

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
      setInputEmail(e.target.value);
    };
  
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
      setInputPassword(e.target.value);
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

    const handleRegisterUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      registerUser();
    };

    const { 
      isOpen: isSignUp,
      onOpen: onSignUp, 
      onClose: closeSignUp 
    } = useDisclosure()
    const { 
      isOpen: isLogIn, 
      onOpen: onLogIn, 
      onClose: closeLogIn 
    } = useDisclosure()

    if(props.logged === 'true'){
      return (
        <Box bg='#C9DBB2' h='100vh'>
          <Button
            backgroundColor="#f8985b"
            _hover={{ bg: "#e54a2e", color: "white" }}
            color="white"
            variant="solid"
            size={["sm", "md"]}
            id="resumeBtn"
            onClick={handleLogOutClick}
            alignSelf="flex-end">
              <a target="_blank">
                Log out
              </a>
          </Button>
        </Box>
        )
    }else{
      return (
        <Box bg='#C9DBB2' h='100vh'>
          <ButtonGroup gap='2' m={3}>
            <Button
              colorScheme='teal'
              color='white'
              _hover={{ bg: "#FFEBEB", color: "black" }}
              onClick={onSignUp}>
                Sign up
            </Button>
            <Button
              colorScheme='teal'
              color='white'
              _hover={{ bg: "#FFEBEB", color: "black" }}
              onClick={onLogIn}>
                Log in
              </Button>
          </ButtonGroup>
          <SignUp isOpen={isSignUp} onClose={closeSignUp}></SignUp>
          <LogIn isOpen={isLogIn} onClose={closeLogIn}></LogIn>
        </Box>
      )
    }
  }
    