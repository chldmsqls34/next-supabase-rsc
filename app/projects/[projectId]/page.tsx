import ProjectInfo from "@/components/project/ProjectInfo";
import Sidebar from "@/components/project/Sidebar";
import { CreateTaskWithSecondaryButton } from "@/components/project/task/TaskButton";
import TaskList from "@/components/project/task/TaskList";
import { fetchAllProject, fetchMember, fetchProgress, fetchProjectById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { projectId: number };
}) {
  const {projectId} = params;

  const [projects,project,progressData,memberData] = await Promise.all([
    fetchAllProject(),
    fetchProjectById(projectId),
    fetchProgress(projectId),
    fetchMember()
  ]);
  
  if(!project){
    notFound();
  }

  if (!project.tasks || project.tasks.length === 0 ) {
    return (
      <main className="h-screen flex md:px-10 lg:px-24 xl:px-52">
        <div className="flex w-full md:w-1/5 h-full justify-center">
          <Sidebar projects={projects} project={project} memberData={memberData}/>
        </div>
        <div className="flex w-full md:w-4/5">
          <div className="flex flex-col w-full">
            <ProjectInfo project={project} progressData={progressData} />
            <div className="flex flex-col w-full h-full px-6 py-4 space-y-4 bg-gray-100 items-center justify-center">
                <h1 className="text-lg font-bold">There is no board yet.</h1>
                <p className="text-sm">Click the button and start flashing!</p>
                <CreateTaskWithSecondaryButton projectId={projectId} />
            </div>
          </div>
        </div>
      </main>

    );
  }

  return(
    <main className="h-screen flex md:px-10 lg:px-24 xl:px-52">
      <div className="flex w-full md:w-1/5 h-full justify-center">
        <Sidebar projects={projects} project={project} memberData={memberData}/>
      </div>
      <div className="flex w-full md:w-4/5">
        <div className="flex flex-col w-full">
          <ProjectInfo project={project} progressData={progressData} />
          <TaskList tasks={project.tasks} />
        </div>
      </div>
    </main>
  )
}