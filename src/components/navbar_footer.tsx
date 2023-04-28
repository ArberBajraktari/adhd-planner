import {
    Box,
    Button,
    useColorMode,
    ButtonGroup,
    useDisclosure
  } from "@chakra-ui/react";
  import { useNavigate } from 'react-router-dom';
  import { useLocalStorage } from 'react-use';
  
  
  export default function NavbarFooter(props: { logged: any;}) {
    const navigate = useNavigate();
    const [logged, setLogged] = useLocalStorage('logged', 'dummy');
  
  
    const gotToSignUp = () => {
        navigate('/sign_up');
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
    
    if(props.logged === 'true'){
      return (
        <Box bg='green.500' h='100vh'>
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
        <Box bg='green.500' h='100vh'>
          <ButtonGroup gap='2' m={3}>
            <Button
              backgroundColor="#b1e6ea"
              color='black'
              _hover={{ bg: "#2198c3", color: "white" }}
              onClick={gotToSignUp}>
                Sign Up
            </Button>
            <Button
              backgroundColor="#b1e6ea"
              color='black'
              _hover={{ bg: "#2198c3", color: "white" }}
              onClick={gotToLogIn}>
                Log in
            </Button>
          </ButtonGroup>
        </Box>
      )
    }
  }
    