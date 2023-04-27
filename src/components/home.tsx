import React, { useEffect } from 'react';
import { Button } from "@chakra-ui/react";
import { useLocalStorage } from 'react-use';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

function Home() {

    const [logged, setLogged, remove] = useLocalStorage('logged', 'dummy');
    const navigate = useNavigate();


    useEffect(() => {
        if(logged === "false"){
            navigate('/');
        }
    }, [logged, navigate]);

    return (
        
        <div className="App">
            <Sidebar></Sidebar>
            
        </div>
      );
    
    
}

export default Home;
