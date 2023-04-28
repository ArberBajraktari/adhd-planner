import React, { useEffect } from 'react';
import { Button, Flex } from "@chakra-ui/react";
import { useLocalStorage } from 'react-use';
import { useNavigate } from 'react-router-dom';
import Dashboard from './dashboard';
import ParkingLot from './parking_lot';
import Navbar from './sidebar';
import { useState } from 'react';

function Home() {

    const [logged, setLogged, remove] = useLocalStorage('logged', 'dummy');
    const navigate = useNavigate();

    const [value, setValue] = useState('');

  const handleValueChange = (newValue: React.SetStateAction<string>) => {
    setValue(newValue);
  };

    return (
        
        <div className="App">
            <Navbar logged={logged} onValueChange={handleValueChange}></Navbar>
            <Dashboard logged={logged} value={value}></Dashboard>
        </div>
      );
    
    
}

export default Home;

