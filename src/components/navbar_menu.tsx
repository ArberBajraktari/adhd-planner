import {
    Box,
    Button
  } from "@chakra-ui/react";
import { useState, useEffect } from "react";
  
  export default function NavbarMenu(props: any) {
    const [value, setValue] = useState('today');

    const openTab = (item: string) => {
        props.onTabOpen(item)
    }

    useEffect(() => {
        props.onTabOpen(value)
    }, []);

    return (
        <Box w='100vh' bg='#2E4756' flexDirection="column">
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='#466E87'
            onClick={() => openTab('today')}
            _hover={{bg: '#F6FFDE'}}>
                Today
            </Button>
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='#466E87'
            onClick={() => openTab('backlog')}
            _hover={{bg: '#F6FFDE'}}>
                Backlog
            </Button>
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='#466E87'
            onClick={() => openTab('projects')}
            _hover={{bg: '#F6FFDE'}}>
                Projects
            </Button>
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='#466E87'
            onClick={() => openTab('reports')}
            _hover={{bg: '#F6FFDE'}}>
                Reports
            </Button>
        </Box>
    )
  }
    