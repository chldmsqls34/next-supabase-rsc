import { createClient } from "./supabase/server";
import { ProgressData, ProjectDTO } from "@/types";

export async function fetchAllProject() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select()
      .order("id", { ascending: true });
    if (!data) {
      return null;
    }
    const clientData: ProjectDTO[] = data.map((project) => ({
      id: project.id,
      title: project.title,
    }));
    return clientData;
  } catch (error) {
    console.error(error);
    throw new Error("데이터가 가져오기 실패");
  }
}

export async function fetchProjectById(projectId: number) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select(
        `
          id,
          title,
          start_date,
          end_date,
          tasks (
            id,
            project_id,
            title,
            start_date,
            end_date,
            content,
            is_completed
            )
          `
      )
      .eq("id", projectId)
      .single();
    if (!data) {
      return null;
    }
    const clientProjectData: ProjectDTO = {
      id: data.id,
      title: data.title,
      startDate: new Date(data.start_date).toISOString(),
      endDate: new Date(data.end_date).toISOString(),
      tasks: data.tasks
        ? data.tasks.map((task) => ({
            id: task.id,
            projectId: task.project_id,
            title: task.title,
            startDate: new Date(task.start_date).toISOString(),
            endDate: new Date(task.end_date).toISOString(),
            content: task.content,
            isCompleted: task.is_completed,
          }))
        : [],
    };
    return clientProjectData;
  } catch (error) {
    console.error(error);
    throw new Error("데이터가 가져오기 실패");
  }
}


export async function fetchProgress(projectId: number): Promise<ProgressData>{
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", projectId)
    if (!data) {
      return {
        percentage: 0,
        total: 0,
        completed: 0,
      };
    }
    const totalTasks = data.length;
    const completedTasks = data.filter(task => task.is_completed === true).length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const progressData: ProgressData = {
      percentage: progressPercentage,
      total: totalTasks,
      completed: completedTasks,
    }
    return progressData;
  } catch (error) {
    console.error(error);
    throw new Error("데이터가 가져오기 실패");
  }
}

