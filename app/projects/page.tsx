import { CreateProject } from "@/components/project/ProjectButton";
import Sidebar from "@/components/project/Sidebar";
import { fetchAllProject } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function Page() {
  const projects = await fetchAllProject();
  const project = null;
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  if (!projects || projects.length === 0) {
    return (
      <main className="h-screen flex md:px-10 lg:px-24 xl:px-52">
        <div className="flex w-full md:w-1/5 h-full justify-center">
          <Sidebar projects={projects} project={project}/>
        </div>
        <div className="flex w-full md:w-4/5">
          <div className="flex flex-col w-full h-full bg-slate-100 items-center justify-center space-y-2">
            <h1 className="mb-4 text-xl md:text-2xl font-bold">How to start</h1>
            <p>1. Create a page</p>
            <p>2. Add boards to page</p>
            <CreateProject />
          </div>
        </div>
      </main>

    );
  }
  redirect(`/projects/${projects[0].id}`);

}