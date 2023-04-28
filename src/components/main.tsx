import { Button, ButtonGroup, Heading, Flex, Box, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useLocalStorage } from 'react-use';
import Navbar from './sidebar';

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
        if (logged === "true") {
            navigate('/home');
        }
    }, [logged, navigate]);

    return (
        <div className="App">
            <Navbar logged={logged}></Navbar>
        </div>
    );
}

export default Main;
