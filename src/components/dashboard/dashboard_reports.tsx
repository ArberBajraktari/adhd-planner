import {
    Box, Heading
  } from "@chakra-ui/react";

export default function DashboardReports(props: any) {
  return (
    <Box bg='#eeecff' h='100%' boxShadow='inset 0px 0px 10px rgba(0, 0, 0, 0.5)'>
        <Heading>Reports</Heading>
        {(() => {
          if (props.logged === "true") {
            return <> To be done </>
          }else{
            return <><h1>Please log in</h1></>
          }
        })()}
    </Box>
    );
}