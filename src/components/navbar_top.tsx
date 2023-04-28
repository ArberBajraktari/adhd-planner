import {
    Box,
    WrapItem,
    Avatar
  } from "@chakra-ui/react";
  
  export default function NavbarTop() {
    return (
        <Box w='100vh' bg='green.500' display='flex' justifyContent='center' alignItems='center'>
            <WrapItem>
                <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
            </WrapItem>
        </Box>
        )
  }
    