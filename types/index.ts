export interface ProjectDAO {
  id: number;
  title: string;
  start_date?: Date;
  end_date?: Date;
}

export interface TaskDAO {
  id: number;
  project_id: number; //foreign key
  title: string;
  start_date?: Date;
  end_date?: Date;
  content?: string;
  is_completed: boolean;
}

export interface ProjectDTO {
  id: number;
  title: string;
  startDate?: string;
  endDate?: string;
  tasks?: TaskDTO[];
}

export interface TaskDTO {
  id: number;
  projectId: number;
  title: string;
  startDate?: string;
  endDate?: string;
  content?: string;
  isCompleted: boolean;
}

export interface ProgressData {
  percentage: number;
  total: number;
  completed: number;
}