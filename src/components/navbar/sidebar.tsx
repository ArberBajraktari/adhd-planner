import {
  Flex,
  Box
} from "@chakra-ui/react";
import NavbarFooter from "./navbar_footer";
import NavbarTop from "../navbar_top";
import NavbarMenu from "../navbar_menu";


export default function Navbar(props: any) {
  function openTab(item: string){
    props.onValueChange(item)
  }

  return (
    <>
      <Box h='100vh' w={'15%'} float='left'>
        <Flex color='black' h='90%' justifyContent="flex-start" flexDirection="column">
          <Flex color='black' h='35%' w='100%'>
            <NavbarTop onTabOpen={openTab}></NavbarTop>
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
  