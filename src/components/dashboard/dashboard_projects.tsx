import { DeleteIcon } from "@chakra-ui/icons";
import {
    Box, Button, Card, CardBody, Flex, Heading, IconButton
  } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

interface Projects {
  id: number;
  name: string;
  description: string;
}


export default function DashboardProjects(props: any) {
  const [userId, setUserId] = useState('');
  const [projects, setProjects] = useState<Projects[]>([])

  const createProject = async (name: any, description: any) => {
    try {
      const response = await fetch('http://localhost:8009/projects', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          description,
          user_id: userId
        })
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const newTask: Projects = {
          id: responseData.id,
          name: responseData.name,
          description: responseData.description
        }
        setProjects(prevTasks => [...prevTasks, newTask]);
        console.log('Project created successfully:', responseData);
      } else {
        console.error('Error creating project:', response.status);
      }
    } catch (error) {
      console.error('Request error:', error);
    }
  }

  const deleteProject = async (project_id: number) => {
    try {
      const response = await fetch(`http://localhost:8009/project?task_id=${project_id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const updatedTasks = projects.filter(project => project.id !== project_id);
        setProjects(updatedTasks);
      } else {
        console.error('Error deleting task:', response.status);
      }
    } catch (error) {
      console.error('Request error:', error);
      // Handle any network or other errors
    }
  };


  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch('http://localhost:8009/users/me', {
          method: "GET",
          credentials: 'include',
          headers: {
            accept: "application/json",
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          console.log(response)
        }else{
          setUserId(responseData.id)
        }
      }catch (error) {
        console.error(error);
      }
    };

    const getProjects = async () => {
      try {
        const response = await fetch('http://localhost:8009/projects', {
          method: "GET",
          credentials: 'include',
          headers: {
            accept: "application/json",
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          console.log(response)
        }else{

          setProjects(responseData)
        }
      }catch (error) {
        console.error(error);
      }
    };
    getProfile()
    getProjects()

  }, []);

  return (
    <Box bg='#eeecff' h='100%' boxShadow='inset 0px 0px 10px rgba(0, 0, 0, 0.5)'>
        <Heading>Projects</Heading>
        <Button colorScheme='teal' size='md' onClick={() => createProject('d', 'd')}>
          Button
        </Button>
        {projects.map((project_item: any) => (
          <Card m='5'>
          <CardBody>
            <Box width='100vh'>
                {project_item.name}
                <Flex justify="flex-end" mt={4}>
                  <IconButton
                    colorScheme="red"
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    onClick={() => deleteProject(project_item.id)}
                  />
                </Flex>
            </Box>
          </CardBody>
          </Card>
          )
        )}
    </Box>
    );
}