import React, { ChangeEvent } from 'react';
import { useState, useEffect } from "react";
import { Container, Flex, Text, Input, InputGroup, Stack, 
          InputRightElement, Button, Card, CardHeader, CardBody, 
          Heading, StackDivider, Box, ModalOverlay, Modal, ModalBody, 
          ModalCloseButton, ModalContent, ModalHeader, useToast, Spinner, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay 
        } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

function UpdateLastName(props: any) {
    const [logged, setLogged] = useLocalStorage('logged', 'dummy');
    const [inputLastName, setLastName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const cancelRef = React.useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
      setLastName(e.target.value)
    };

    const updateFirstName = async () => {
      try {
        const response = await fetch('http://localhost:8009/users/me', {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ last_name: inputLastName })
        });
        if (!response.ok){
          setErrorMsg('Error trying to update the last name')
        }
        
        setErrorMsg('Last name updated')
        props.updateLastName(inputLastName)
      } catch (error) {
        console.error('Error:', error);
      }
    }



    const handleUpdateFirstName = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      updateFirstName()
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
              <ModalHeader>Update last name:</ModalHeader>
              <ModalCloseButton />
              <ModalBody >
              <Container>
                <Card size={'lg'} mb='10'>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' pb='3'>
                          Last name:
                        </Heading>
                        <Input placeholder="your_username" 
                        onChange={handleLastName}
                        value={inputLastName}/>
                      </Box>
                      <Box>
                          <Button colorScheme='teal' variant='outline' onClick={handleUpdateFirstName}>
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

export default UpdateLastName;