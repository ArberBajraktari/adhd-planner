import {
    Box,
    useColorModeValue
  } from "@chakra-ui/react";
import DashboardToday from './dashboard_today';
import DashboardBacklog from "./dashboard_backlog";
import DashboardProjects from "./dashboard_projects";
import DashboardReports from "./dashboard_reports";
  
  export default function Dashboard(props: any) {
    return (
        <div>
          <Box
            h='100vh'
            bg={useColorModeValue("gray.100", "gray.900")}
            width={'85%'}
            float='left'>

              {props.value === 'today' ? (
              <DashboardToday value={props.value} />
            ) : props.value === 'backlog' ? (
              <DashboardBacklog value={props.value} />
            ) : props.value === 'projects' ? (
              <DashboardProjects value={props.value} />
            ) : (
              <DashboardReports value={props.value} />
            )}
          </Box>
      </div>
      );
}