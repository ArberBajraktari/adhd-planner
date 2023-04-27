import { Button, ButtonGroup, Heading, Flex, Box, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useLocalStorage } from 'react-use';

function Main() {
    const navigate = useNavigate();

    const [logged, setLogged, remove] = useLocalStorage('logged', 'dummy');

    const gotToSignUp = () => {

        // This will navigate to first component
        navigate('/sign_up');
    };

    const gotToLogIn = () => {

        // This will navigate to first component
        navigate('/log_in');
    };

    useEffect(() => {
        if(logged === "true"){
            navigate('/home');
        }
    }, [logged, navigate]);

    return (
        <div className="App">
        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2'  m={3}>
                <Heading size='md'>ADHD Planner</Heading>
            </Box>
            <Spacer />
            <ButtonGroup gap='2'  m={3}>
                <Button colorScheme='teal' onClick={gotToSignUp}>Sign Up</Button>
                <Button colorScheme='teal' onClick={gotToLogIn}>Log in</Button>
            </ButtonGroup>

            </Flex>
        </div>
    );
}

export default Main;
