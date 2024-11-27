"use client";
import { Input } from "@/components/ui";
import { CreateProject } from "./ProjectButton";
import ProjectList from "./ProjectList";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MemberDTO, ProjectDTO } from "@/types";

export default function Sidebar({projects,project,memberData}:{projects:ProjectDTO[]|null,project:ProjectDTO|null,memberData:MemberDTO|null}) {
  const [search, setSearch] = useState<string>('');
  const filteredProjects = projects ? projects.filter((project) => project.title.toLowerCase().includes(search.toLowerCase())) : [];

  return(
    <div className="flex w-full h-full flex-col p-2 border-l border-r border-gray-200">
      <div className="flex flex-col text-white p-2 space-y-4">
        <div className="relative bg-[#F2F2F2] rounded-sm focus:bg-white focus:border focus:border-[#C4C4C4]">
          <MagnifyingGlassIcon className="absolute w-2 h-2 md:w-5 md:h-5 text-gray-600 left-3 top-1/2 transform -translate-y-1/2" />
          <Input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className="text-[#828282] pl-6 text-xs focus:text-[#000000] md:pl-10 md:text-sm" placeholder="Search"/>
        </div>
        <CreateProject/>
      </div>
      <div className="flex flex-col px-2 py-2 space-y-4 md:px-4">
        <h1 className="text-xs text-gray-400 md:text-sm">{memberData?.nickname}</h1>
        <ProjectList projects={filteredProjects} projectDetail={project}/>
      </div>
    </div>
  )
}