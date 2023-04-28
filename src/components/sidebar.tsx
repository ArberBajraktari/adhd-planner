import {
  Flex,
  Box,
  useColorMode,
  Button,
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
import Home from "./home";
import Main from "./main";
import SignUp from "./sign_up";
import NavbarTop from "./navbar_top";
import NavbarMenu from "./navbar_menu";


export default function Navbar(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [logged, setLogged, remove] = useLocalStorage('logged', 'dummy');
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Today', value: 1},
    { label: 'Backlog', value: 2 },
  ];

  function handleChange(event: { target: { value: any; } }) {
    const newValue = event.target.value
  }

  function openTab(item: string){
    props.onValueChange(item)
  }

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
        <Box h='100vh' w={'15%'} float='left'>
          <Flex color='black' h='90%' justifyContent="flex-start" flexDirection="column">
            <Flex color='black' h='35%' w='100%'>
              <NavbarTop></NavbarTop>
            </Flex>
            <Flex color='black' h='65%' w='100%'>
              <NavbarMenu onTabOpen={openTab}></NavbarMenu>
            </Flex>
          </Flex>
          <Flex color='black' h='10%' flexDirection="column">
            <NavbarFooter logged={props.logged} ></NavbarFooter>
          </Flex>
        </Box>
      </>
      )
}
  