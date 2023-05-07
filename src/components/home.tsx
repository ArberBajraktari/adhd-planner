import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import Dashboard from './dashboard';
import Navbar from './sidebar';
import { useState } from 'react';

function Home() {
    const navigate = useNavigate();
    const [logged] = useLocalStorage('logged', 'dummy');
    const [value, setValue] = useState('');

    const handleValueChange = (newValue: React.SetStateAction<string>) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (logged === "false") {
            navigate('/');
        }
    }, [logged, navigate]);

    return (
        <div className="App">
            <Navbar logged={logged} onValueChange={handleValueChange}></Navbar>
            <Dashboard logged={logged} value={value}></Dashboard>
        </div>
    );
}

export default Home;

