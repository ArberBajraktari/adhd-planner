import React, { ChangeEvent } from 'react';
import { useState, useEffect } from "react";
import { Container, Flex, Text, Input, InputGroup, Stack, 
          InputRightElement, Button, Card, CardHeader, CardBody, 
          Heading, StackDivider, Box, ModalOverlay, Modal, ModalBody, 
          ModalCloseButton, ModalContent, ModalHeader, useToast, Spinner, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay 
        } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

function UpdateGender(props: any) {
    const [logged, setLogged] = useLocalStorage('logged', 'dummy');
    const [inputGender, setGender] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const cancelRef = React.useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    const handleGender = (e: ChangeEvent<HTMLInputElement>) => {
      setGender(e.target.value)
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
          body: JSON.stringify({ gender: inputGender })
        });
        if (!response.ok){
          setErrorMsg('Error trying to update the gender')
        }
        
        setErrorMsg('Gender updated')
        props.updateGender(inputGender)
      } catch (error) {
        console.error('Error:', error);
      }
    }



    const handleUpdateGender = (event: React.MouseEvent<HTMLButtonElement>) => {
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
              <ModalHeader>Update first name:</ModalHeader>
              <ModalCloseButton />
              <ModalBody >
              <Container>
                <Card size={'lg'} mb='10'>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' pb='3'>
                          First name:
                        </Heading>
                        <Input placeholder="your_gender" 
                        onChange={handleGender}
                        value={inputGender}/>
                      </Box>
                      <Box>
                          <Button colorScheme='teal' variant='outline' onClick={handleUpdateGender}>
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

export default UpdateGender;