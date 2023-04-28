import {
    Box,
    Button
  } from "@chakra-ui/react";
  
  export default function NavbarMenu(props: any) {

    const openTab = (item: string) => {
        props.onTabOpen(item)
    }

    return (
        <Box w='100vh' bg='#C9DBB2' flexDirection="column">
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='#C9DBB2'
            onClick={() => openTab('today')}
            _hover={{bg: '#F6FFDE'}}>
                Today
            </Button>
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='#C9DBB2'
            onClick={() => openTab('backlog')}
            _hover={{bg: '#F6FFDE'}}>
                Backlog
            </Button>
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='#C9DBB2'
            onClick={() => openTab('projects')}
            _hover={{bg: '#F6FFDE'}}>
                Projects
            </Button>
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='#C9DBB2'
            onClick={() => openTab('reports')}
            _hover={{bg: '#F6FFDE'}}>
                Reports
            </Button>
        </Box>
    )
  }
    