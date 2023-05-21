import {
    Box,
    useColorModeValue
  } from "@chakra-ui/react";
import DashboardToday from './dashboard_today';
import DashboardBacklog from "./dashboard_backlog";
import DashboardProjects from "./dashboard_projects";
import DashboardReports from "./dashboard_reports";
import DashboardProfile from "./dashboard_profile";
  
  export default function Dashboard(props: any) {
    return (
        <div>
          <Box
            h='100vh'
            bg='#F6FFDE'
            width={'85%'}
            float='left' >

              {props.value === 'today' ? (
              <DashboardToday value={props.value} logged={props.logged}/>
            ) : props.value === 'backlog' ? (
              <DashboardBacklog value={props.value} logged={props.logged}/>
            ) : props.value === 'projects' ? (
              <DashboardProjects value={props.value} logged={props.logged}/>
            ) : props.value === 'profile' ? (
              <DashboardProfile value={props.value} />
            ) : (
              <DashboardReports value={props.value} logged={props.logged}/>
            )}
          </Box>
      </div>
      );
}