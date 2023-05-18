import {
    Box,
    ButtonGroup, useDisclosure,
    Button,
  } from "@chakra-ui/react";
  import React, { ChangeEvent } from 'react';
  import { useState, useEffect, useRef } from "react";
  import { useNavigate } from 'react-router-dom';
  import { useLocalStorage } from 'react-use';
  import LogIn from "../update/log_in";
  import SignUp from "../update/sign_up";
  
  
  export default function NavbarFooter(props: { logged: any;}) {
    const navigate = useNavigate();
    const [logged, setLogged] = useLocalStorage('logged', 'dummy');
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow((prevShow) => !prevShow);
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    const logOut = async () => {
      try {
        const response = await fetch('http://localhost:8009/auth/jwt/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });
        console.log(response)
        if (!response.ok) {
          console.log("could not log out")
          setLogged("false")
        }else{
          console.log("logged out")
          setLogged("false")
          navigate('/');
        }
      }catch (error) {
        console.error(error);
      }
    };
  
    const handleLogOutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      logOut()
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
        <Box bg='#2E4756' h='100vh'>
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
        <Box bg='#2E4756' h='100vh'>
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
    