import {
    Box,
    Button,
    Avatar
  } from "@chakra-ui/react";
  
  export default function NavbarMenu(props: any) {
    const buttonStyles = {
        width: '100%',
      };

      const openTab = (item: string) => {
        props.onTabOpen(item)
      }

  
    return (
        <Box w='100vh' bg='green.500' flexDirection="column">
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='green.400'
            onClick={() => openTab('today')}
            _hover={{bg: 'green.600'}}>
                Today
            </Button>
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='green.400'
            onClick={() => openTab('backlog')}
            _hover={{bg: 'green.600'}}>
                Backlog
            </Button>
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='green.400'
            onClick={() => openTab('projects')}
            _hover={{bg: 'green.600'}}>
                Projects
            </Button>
            <Button w='100%' rounded={'none'} mt='2' h='20' bg='green.400'
            onClick={() => openTab('reports')}
            _hover={{bg: 'green.600'}}>
                Reports
            </Button>
        </Box>
    )
  }
    