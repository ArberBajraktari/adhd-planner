import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Heading,
  Spacer,
  ButtonGroup,
  useDisclosure,
  IconButton,
  Square,
  Text,
  Center,
  DrawerHeader
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { useState } from "react";
import NavbarFooter from "./navbar_footer";


export default function Navbar(props: { logged: any; }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [logged, setLogged, remove] = useLocalStorage('logged', 'dummy');


  const gotToSignUp = () => {

    // This will navigate to first component
    navigate('/sign_up');
};

const gotToLogIn = () => {

    // This will navigate to first component
    navigate('/log_in');
};

  const logOut = () => {
    setLogged("false")
  };

const handleLogOutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    logOut()
    navigate('/');
  };

    return (
      <>
        <NavbarFooter logged={props.logged}></NavbarFooter>
      </>
      )
}
  