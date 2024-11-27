'use server';
import { revalidatePath } from "next/cache";
import { formatInTimeZone } from "date-fns-tz";
import { createClient } from "./supabase/server";

export async function createProject() {
  try {
    const supabase = await createClient();
    const {data:userData} = await supabase.auth.getUser();
    const userId = userData.user?.id;
    const { data } = await supabase
      .from("projects")
      .insert([
        {
          user_id: userId,
          title: "",
          start_date: null,
          end_date: null,
        },
      ])
      .select();
    if(!data){
      return null;
    }
    console.log('create projectid',data[0].id);
    const redirectUrl = `/projects/${data[0].id}`;
    return {redirectUrl:redirectUrl};

  } catch (error) {
    console.error(error);
  }
}

export async function deleteProject(projectId: number) {
  try {
    const supabase = await createClient();
    const { status } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);
    if (status === 204) {
      revalidatePath(`/projects`);
      return { message: 'Project Deleted Successfully.' };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateProject(projectId:number, title:string,startDate:Date|undefined,endDate:Date|undefined){
  try {
    const supabase = await createClient();
    const koreanTimeZone = 'Asia/Seoul';
    const formatStartDate = startDate
      ? formatInTimeZone(startDate, koreanTimeZone, 'yyyy-MM-dd HH:mm:ssXXX')
      : undefined;
    const formatEndDate = endDate
      ? formatInTimeZone(endDate, koreanTimeZone, 'yyyy-MM-dd HH:mm:ssXXX')
      : undefined;
    const { data, status } = await supabase
      .from("projects")
      .update({
        title: title,
        start_date: formatStartDate,
        end_date: formatEndDate,
      })
      .eq("id", projectId)
      .select();

    if (data !== null && status === 200) {
      revalidatePath(`/projects/${projectId}`);
      return { message: 'Project Updated Successfully.' };
    }
  } catch (error) {
    console.error('Failed to update project:', error);
  }

}
