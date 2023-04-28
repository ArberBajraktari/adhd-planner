import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useLocalStorage } from 'react-use';
import Navbar from './sidebar';
import Dashboard from './dashboard';
import { useState } from 'react';

function Main() {
    const navigate = useNavigate();
    const [logged] = useLocalStorage('logged', 'dummy');
    const [value, setValue] = useState('');

    const handleValueChange = (newValue: React.SetStateAction<string>) => {
        setValue(newValue);
      };

    useEffect(() => {
        if (logged === "true") {
            navigate('/home');
        }
    }, [logged, navigate]);

    return (
        <div className="App">
            <Navbar logged={logged} onValueChange={handleValueChange}></Navbar>
            <Dashboard logged={logged} value={value}></Dashboard>
        </div>
    );
}

export default Main;
