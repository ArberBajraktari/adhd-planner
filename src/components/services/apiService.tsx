class ApiService {
    static getTasks = async () => {
        try {
            const response = await fetch('http://localhost:8009/tasks_full', {
            credentials: 'include',
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return { 'status': 'error' };
        }
    };

    static getProfile = async () => {
        try {
          const response = await fetch('http://localhost:8009/users/me', {
            method: "GET",
            credentials: 'include',
            headers: {
                accept: "application/json",
            },
          });
          const data = await response.json();
          return data;
        } catch (error) {
          return { 'status': 'error' };
        }
    };

    static getProjects = async () => {
        try {
          const response = await fetch('http://localhost:8009/projects', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'accept': 'application/json',
            },
          });
    
          if (response.ok) {
            const responseData = await response.json();
            return responseData;
          } else {
            return { 'status': 'error' };
          }
        } catch (error) {
            return { 'status': error };
        }
    };

    static addTaskItem = async (task_id: number) => {
        try {
            const response = await fetch('http://localhost:8009/tasks_item', {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  name: '<to-do-item>',
                  task_id: task_id,
                  done: false
                })
            });
    
          if (response.ok) {
            const responseData = await response.json();
            return responseData;
          } else {
            return { 'status': 'error' };
          }
        } catch (error) {
            return { 'status': error };
        }
    };

    static addTask = async (user_id: string) => {
        try {
            const response = await fetch('http://localhost:8009/tasks', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: 'string',
                description: 'string',
                user_id: user_id,
                project_id: 0
              })
            });
            const responseData = await response.json();
            if (response.ok) {
                return {'status' : 'TASK_ADDED',
                        'data' : responseData}
            }else{
                return { 'status': 'TASK_NOT_ADDED' };
            }
        }catch (error) {
            return { 'status': 'ERROR: ' + error }; 
        }
    }

    static updateTaskItemName = async (value: string, item_id: number) => {
        try {
            const response = await fetch(`http://localhost:8009/tasks_item/${item_id}`, {
              method: 'PUT',
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ "name": value })
            });
            if (response.ok) {
                return response;
            } else {
                return { 'status': 'error' };
            }
        } catch (error) {
            return { 'status': 'ERROR: ' + error }; 
        }
    }

    static updateTaskItemStatus = async (status: boolean, item_id: number) => {
        try {
            const response = await fetch(`http://localhost:8009/tasks_item/${item_id}`, {
              method: 'PUT',
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ "done": status })
            });
            if (response.ok) {
                return { 'status': 'TASK_ITEM_UPDATED' };
            } else {
                return { 'status': 'TASK_ITEM_NOT_UPDATED' };
            }
        } catch (error) {
            return { 'status': 'ERROR: ' + error };            
        }
    }

    static updateProjectId = async (project_id: number, task_id: number) => {
        try {
            const response = await fetch(`http://localhost:8009/tasks/${task_id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            project_id: project_id
            })
        });

        if (response.ok) {
            return { 'status': 'PROJECT_ID_UPDATED' };
        } else {
            return { 'status': 'PROJECT_ID_NOT_UPDATED' };
        }
        } catch (error) {
            return { 'status': 'ERROR: ' + error };            
        }
    }

    static deleteTask = async (task_id: number) => {
        try {
            const response = await fetch(`http://localhost:8009/tasks/${task_id}`, {
            method: 'DELETE',
            credentials: 'include',
                headers: {
                'Accept': 'application/json'
                }
            });

            if (response.ok) {
                return { 'status': 'TASK_DELETED' };
            } else {
                return { 'status': 'TASK_NOT_DELETED' };
            }
        } catch (error) {
            return { 'status': 'ERROR: ' + error };
        }
    }
}
     
  
  export default ApiService;
  