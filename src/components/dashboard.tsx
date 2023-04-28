import {
    Box,
    Grid,
    GridItem,
    useColorModeValue,
    SimpleGrid,
    useColorMode,
    Heading,
    HStack,
    DrawerOverlay,
    useDisclosure,
    IconButton,
    Square,
    Text,
    Center,
    DrawerHeader
  } from "@chakra-ui/react";
  import { useNavigate } from 'react-router-dom';
  import { useLocalStorage } from 'react-use';
  import { useEffect, useState } from "react";
import ParkingLot from "./parking_lot";
import NavbarMenu from "./navbar_menu";
import DashboardToday from './dashboard_today';
import DashboardBacklog from "./dashboard_backlog";
  
  
  export default function Dashboard(props: any) {
    const [value, setValue] = useState('');
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const [logged, setLogged, remove] = useLocalStorage('logged', 'dummy');
  
  
    const logOut = () => {
      setLogged("false")
    };

    return (
        <div>
            <Box
              h='100vh'
              bg={useColorModeValue("gray.100", "gray.900")}
              width={'85%'}
              float='left'
            >
              {props.value === 'today' ? (
                <DashboardToday value={props.value} />
              ) : (
                <DashboardBacklog value={props.value} />
              )}
            </Box>
      </div>
      );
}