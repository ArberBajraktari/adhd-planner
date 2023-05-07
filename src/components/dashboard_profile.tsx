import {
  Avatar,
    Box, Button, ButtonGroup, Card, CardBody, Container, Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, Heading, Icon, IconButton, Input, InputGroup, InputRightElement, Link, Stack, useDisclosure, useEditableControls, WrapItem
  } from "@chakra-ui/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { EditIcon, SearchIcon } from '@chakra-ui/icons'
import UpdateUsername from "./update/update_username";
import UpdateFirstName from "./update/update_first_name";
import UpdateLastName from "./update/update_last_name";
import UpdateGender from "./update/update_gender";

export default function DashboardProfile(props: any) {
  const [user, setUser] = useState({ username: '', email: '', gender: '', first_name:'', last_name: '' });

  const { 
    isOpen: isUsername,
    onOpen: onUsername, 
    onClose: closeUsername 
  } = useDisclosure()

  const { 
    isOpen: isFirstName,
    onOpen: onFirstName, 
    onClose: closeFirstName 
  } = useDisclosure()

  const { 
    isOpen: isLastName,
    onOpen: onLastName, 
    onClose: closeLastName 
  } = useDisclosure()

  const { 
    isOpen: isGender,
    onOpen: onGender, 
    onClose: closeGender 
  } = useDisclosure()

  const updateUsername = (username: string) => {
    setUser({
      ...user,
      username: username
    });
  }

  const updateFirstName = (firstname: string) => {
    setUser({
      ...user,
      first_name: firstname
    });
  }

  const updateLastName = (lastname: string) => {
    setUser({
      ...user,
      last_name: lastname
    });
  }

  const updateGender = (value: string) => {
    setUser({
      ...user,
      gender: value
    });
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
      <UpdateUsername isOpen={isUsername} onClose={closeUsername} updateUsername={updateUsername}></UpdateUsername>
      <UpdateFirstName isOpen={isFirstName} onClose={closeFirstName} updateFirstName={updateFirstName}></UpdateFirstName>
      <UpdateLastName isOpen={isLastName} onClose={closeLastName} updateLastName={updateLastName}></UpdateLastName>
      <UpdateGender isOpen={isGender} onClose={closeGender} updateGender={updateGender}></UpdateGender>
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
                  <Input placeholder={user.email} colorScheme="blue" css={{
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                  }}  />
                </Box>
                <Box>
                  <FormLabel>Username:</FormLabel>
                  <InputGroup>
                    <Input placeholder={user.username} colorScheme="blue" style={{ opacity: 0.8 }} css={{
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                  }}/>
                    <InputRightElement>
                      <IconButton aria-label='Search database' onClick={onUsername} icon={<EditIcon />} ml='3'/>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel>First Name:</FormLabel>
                  <InputGroup>
                    <Input placeholder={user.first_name} colorScheme="blue" style={{ opacity: 0.8 }} css={{
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                  }}  />
                    <InputRightElement>
                     <IconButton aria-label='Search database' onClick={onFirstName} icon={<EditIcon />} ml='3'/>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel>Last Name:</FormLabel>
                  <InputGroup>
                    <Input placeholder={user.last_name} colorScheme="blue" style={{ opacity: 0.8 }} css={{
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                  }}  />
                    <InputRightElement>
                     <IconButton aria-label='Search database' onClick={onLastName} icon={<EditIcon />} ml='3'/>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel>Password:</FormLabel>
                  <InputGroup>
                    <Input placeholder='xXxXxXxXxX' colorScheme="blue" style={{ opacity: 0.8 }} css={{
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                  }}  />
                    <InputRightElement>
                      <IconButton aria-label='Search database' icon={<EditIcon />} ml='3'/>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel>Gender:</FormLabel>
                  <InputGroup>
                    <Input placeholder={user.gender} colorScheme="blue" style={{ opacity: 0.8 }} css={{
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                  }}  />
                    <InputRightElement>
                      <IconButton aria-label='Search database' onClick={onGender} icon={<EditIcon />} ml='3'/>
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Container>
    </Box>
    );
}