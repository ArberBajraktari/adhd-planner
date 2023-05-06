import React, { ChangeEvent } from 'react';
import { useState, useEffect } from "react";
import { Container, Flex, Text, Input, InputGroup, Stack, 
          InputRightElement, Button, Card, CardHeader, CardBody, 
          Heading, StackDivider, Box, ModalOverlay, Modal, ModalBody, 
          ModalCloseButton, ModalContent, ModalHeader, useToast, Spinner, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay 
        } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

function UpdateUsername(props: any) {
    const [logged, setLogged] = useLocalStorage('logged', 'dummy');
    const [inputUsername, setUsername] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const cancelRef = React.useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value)
    
    };

    const checkUsername = async () => {
      try {
        const response = await fetch('http://localhost:8009/checkUsername?username=' + inputUsername, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        const data = await response.json()
        if(data['status'] !== null){
          setErrorMsg('Username already exists!')
        }else{
          try {
            const response = await fetch('http://localhost:8009/users/me', {
              method: 'PATCH',
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username: inputUsername })
            });
            if (!response.ok){
              setErrorMsg('Error trying to update the username')
            }
            setErrorMsg('Username updated')
            props.updateUsername(inputUsername)
          } catch (error) {
            console.error('Error:', error);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }


    const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      checkUsername()
    };
  
    useEffect(() => {
        if(logged === "true"){
            navigate('/home');
        }
    }, [logged, navigate]);

    return (
      <div className="App">
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
              display="flex"
              alignItems="center"
              justifyContent="center">
                Authenticating
              </AlertDialogHeader>
              <AlertDialogBody
              display="flex"
              alignItems="center"
              justifyContent="center">
                <Spinner size='xl' color='green'/>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Modal isOpen={props.isOpen} onClose={props.onClose} closeOnOverlayClick={false} size={'xl'}  isCentered>
          <ModalOverlay />
            <ModalContent m={20} p={3}>
              <ModalHeader>Update username:</ModalHeader>
              <ModalCloseButton />
              <ModalBody >
              <Container>
                <Card size={'lg'} mb='10'>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' pb='3'>
                          Username:
                        </Heading>
                        <Input placeholder="your_username" 
                        onChange={handleUsername}
                        value={inputUsername}/>
                      </Box>
                      <Box>
                          <Button colorScheme='teal' variant='outline' onClick={handleUpdate}>
                            Update
                          </Button>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
                <Text fontSize='sm'>{errorMsg}</Text>
              </Container>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      );
}

export default UpdateUsername;
