import React, { useEffect } from 'react';
import { Button, Flex } from "@chakra-ui/react";
import { useLocalStorage } from 'react-use';
import { useNavigate } from 'react-router-dom';
import Dashboard from './dashboard';
import ParkingLot from './parking_lot';
import Navbar from './sidebar';

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
            <Navbar logged={logged}></Navbar>
            <Dashboard></Dashboard>
            <ParkingLot></ParkingLot>
        </div>
      );
    
    
}

export default Home;
