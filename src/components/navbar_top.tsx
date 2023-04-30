import {
    Box,
    WrapItem,
    Avatar,
    Link
  } from "@chakra-ui/react";
  
  export default function NavbarTop(props: any) {
    const openTab = (item: string) => {
        props.onTabOpen(item)
    }

    return (
        <Box w='100vh' bg='#2E4756' display='flex' justifyContent='center' alignItems='center'>
            <WrapItem>
                <Link>
                    <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' 
                    onClick={() => openTab('profile')}/>
                </Link>
            </WrapItem>
        </Box>
        )
  }
    