import {
  Avatar,
    Box, Button, Card, CardBody, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Stack, WrapItem
  } from "@chakra-ui/react";
import { useEffect } from "react";

export default function DashboardProfile(props: any) {

  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:8009/users/me', {
        credentials: 'include',
        headers: {
          accept: "application/json",
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        console.log("Here:")
        console.log(response)
        console.log(responseData)
      }else{
        console.log("Here:")
        console.log(responseData)
      }
    }catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile()
  }, []);

  return (
    <Box bg='#eeecff' h='100%' boxShadow='inset 0px 0px 10px rgba(0, 0, 0, 0.5)'>
        <Heading>Profile</Heading>
        <Container>
          <Card size={'lg'} mb='10'>
            <CardBody>
              <Stack spacing='4'>
                <Box>
                <WrapItem
                display="flex"
                justifyContent="center"
                alignItems="center">
                  <Link>
                      <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                  </Link>
                </WrapItem>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Username:</FormLabel>
                    <Input placeholder="filan_123" 
                    variant='filled'/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>First Name:</FormLabel>
                    <Input placeholder="Filan" 
                    variant='filled'/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Last Name:</FormLabel>
                    <Input placeholder="Fisteku" 
                    variant='filled'/>
                  </FormControl>
                </Box>
                <Box>
                    <Button colorScheme='teal' variant='outline'>
                      Sign up
                    </Button>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Container>
    </Box>
    );
}

function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; }) {
  throw new Error("Function not implemented.");
}
