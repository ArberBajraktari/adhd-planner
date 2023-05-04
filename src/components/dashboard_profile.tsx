import {
  Avatar,
    Box, Button, ButtonGroup, Card, CardBody, Container, Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, Heading, Icon, IconButton, Input, InputGroup, InputRightElement, Link, Stack, useEditableControls, WrapItem
  } from "@chakra-ui/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { EditIcon } from '@chakra-ui/icons'

export default function DashboardProfile(props: any) {
  const [user, setUser] = useState({ username: '', email: '', gender: '', first_name:'', last_name: '' });

  const updateUser: MouseEventHandler<SVGElement> = async () => {
    try {
      const response = await fetch('http://localhost:8009/users/me', {
        method: "PATCH",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            username: 'arber2',
            first_name: 'asd',
            last_name: 'asd'
          }
        )
      });
      const responseData = await response.json();
      console.log(responseData)
    }catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch('http://localhost:8009/users/me', {
          method: "GET",
          credentials: 'include',
          headers: {
            accept: "application/json",
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          console.log(response)
        }else{
          setUser({username: responseData.username, 
                  email: responseData.email,
                  gender: responseData.gender,
                  first_name: responseData.first_name,
                  last_name: responseData.last_name})
        }
      }catch (error) {
        console.error(error);
      }
    };
    getProfile()
  }, []);

  return (
    <Box bg='#eeecff' h='100%' boxShadow='inset 0px 0px 10px rgba(0, 0, 0, 0.5)' pt='5'>
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
                  <FormLabel>Email:</FormLabel>
                  <Input placeholder={user.email} colorScheme="blue" style={{ opacity: 0.8 }} isDisabled />
                </Box>
                <Box>
                  <FormLabel>Username:</FormLabel>
                  <InputGroup>
                    <Input placeholder={user.username} colorScheme="blue" style={{ opacity: 0.8 }} isDisabled />
                    <InputRightElement>
                      <EditIcon />
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel>First Name:</FormLabel>
                  <InputGroup>
                    <Input placeholder={user.first_name} colorScheme="blue" style={{ opacity: 0.8 }} isDisabled />
                    <InputRightElement>
                      <EditIcon onClick={updateUser}/>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel>Last Name:</FormLabel>
                  <InputGroup>
                    <Input placeholder={user.last_name} colorScheme="blue" style={{ opacity: 0.8 }} isDisabled />
                    <InputRightElement>
                      <EditIcon />
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel>Password:</FormLabel>
                  <InputGroup>
                    <Input placeholder='xXxXxXxXxX' colorScheme="blue" style={{ opacity: 0.8 }} isDisabled />
                    <InputRightElement>
                      <EditIcon />
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel>Gender:</FormLabel>
                  <InputGroup>
                    <Input placeholder={user.gender} colorScheme="blue" style={{ opacity: 0.8 }} isDisabled />
                    <InputRightElement>
                      <EditIcon />
                    </InputRightElement>
                  </InputGroup>
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