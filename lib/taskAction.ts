"use server";

import { revalidatePath } from "next/cache";
import { formatInTimeZone } from "date-fns-tz";
import { createClient } from "./supabase/server";

export async function createTask(projectId: number) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("tasks")
      .insert([
        {
          project_id: projectId,
          title: "",
          start_date: null,
          end_date: null,
          content: null,
          is_completed: false,
        },
      ])
      .select();
    if (!data) {
      return null;
    }
    revalidatePath(`/projects/${projectId}`);
    return { message: "Project Created Successfully." };
  } catch (error) {
    console.error("Failed to create task:", error);
  }
}

export async function deleteTask(taskId: number) {
  try {
    const supabase = await createClient();
    const { status } = await supabase.from("tasks").delete().eq("id", taskId);

    if (status === 204) {
      return { message: "Deleted Task" };
    }
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
}

export async function updateTask(
  taskId: number,
  title: string,
  startDate: Date | undefined,
  endDate: Date | undefined,
  content: string,
  isCompleted: boolean | undefined
) {
  try {
    const supabase = await createClient();
    const koreanTimeZone = "Asia/Seoul";
    const formatStartDate = startDate
      ? formatInTimeZone(startDate, koreanTimeZone, "yyyy-MM-dd HH:mm:ssXXX")
      : undefined;
    const formatEndDate = endDate
      ? formatInTimeZone(endDate, koreanTimeZone, "yyyy-MM-dd HH:mm:ssXXX")
      : undefined;
    const updateTask = {
      title: title,
      start_date: formatStartDate,
      end_date: formatEndDate,
      content: content,
      is_completed: isCompleted,
    };
    const { data, status } = await supabase
      .from("tasks")
      .update(updateTask)
      .eq("id", taskId)
      .select();

    if (data !== null && status === 200) {
      return { message: "Updated Task" };
    }
  } catch (error) {
    console.error("Failed to update task:", error);
  }
}

export async function duplicateTask(
  projectId: number,
  title: string,
  startDate: string | undefined,
  endDate: string | undefined,
  content: string | undefined,
  isCompleted: boolean | undefined
) {
  try {
    const supabase = await createClient();
    const { data, status } = await supabase
      .from("tasks")
      .insert([
        {
          project_id: projectId,
          title: title,
          start_date: startDate,
          end_date: endDate,
          content: content,
          is_completed: isCompleted,
        },
      ])
      .select();

    if (data !== null && status === 200) {
      revalidatePath(`/projects/${projectId}`);
      return { message: "Project Duplicated Successfully." };
    }
  } catch (error) {
    console.error("Failed to create task:", error);
  }
}
