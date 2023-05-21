interface TaskItem {
    id: number;
    task_id: number;
    name: string;
    done: boolean;
  }
  
  interface Task {
    id: number;
    user_id: string;
    name: string;
    project_id: number;
    description: string;
    task_items: TaskItem[];
  }
  
  interface ParkingTicket {
    id: number;
    name: string;
    top: number;
    left: number;
  }
  
  interface Projects {
    id: number;
    name: string;
    description: string;
  }

export type {Task, TaskItem, ParkingTicket, Projects};