import React, { useEffect } from 'react';
import { Button } from "@chakra-ui/react";
import { useLocalStorage } from 'react-use';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [logged, setLogged, remove] = useLocalStorage('logged', 'dummy');
    const navigate = useNavigate();

    const logOut = () => {
        setLogged("false")
      };

    const handleLogOutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        logOut()
        navigate('/');
      };

    useEffect(() => {
        if(logged === "false"){
            navigate('/');
        }
    }, [logged, navigate]);

    return (
        
        <div className="App">
            {logged}
            <Button colorScheme='teal' variant='outline' onClick={handleLogOutClick}>
                Log out
            </Button>
        </div>
      );
    
    
}

export default Home;
