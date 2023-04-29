import React from 'react';
import { useLocalStorage } from 'react-use';
import Dashboard from './dashboard';
import Navbar from './sidebar';
import { useState } from 'react';

function Home() {

    const [logged] = useLocalStorage('logged', 'dummy');
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

