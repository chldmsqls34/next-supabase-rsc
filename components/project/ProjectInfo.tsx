"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { Button } from "@/components/ui";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DeleteProject, UpdateProject } from "./ProjectButton";
import { Progress } from "@/components/ui";
import { CreateTask } from "./task/TaskButton";
import { ko } from "date-fns/locale";
import { ProgressData, ProjectDTO } from "@/types";

export default function ProjectInfo({project,progressData}:{project:ProjectDTO,progressData:ProgressData}) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    project.startDate ? new Date(project.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    project.endDate ? new Date(project.endDate) : undefined
  );
  const [title, setTitle] = useState<string>(project.title);
  const percentage = progressData.percentage;
  const total = progressData.total;
  const completed = progressData.completed;


  return(
    <div className="flex w-full">
      <Card className="flex flex-col w-full h-full rounded-none border-none">
        <CardHeader>
          <CardTitle>
            <input type="text" value={title} className="text-4xl pt-12 pb-2 text-gray-700" onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Title Here"/>
            <div className="flex space-x-4 items-center">
              <p className="text-sm text-gray-400">{completed}/{total}</p>
              <p className="text-sm text-gray-400">Completed</p>
              <Progress value={percentage} className="w-52"/>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap space-x-5 space-y-2 items-center">
            <span>From</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {startDate ? format(startDate, "yyyy/MM/dd", { locale: ko }) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  locale={ko}

                />
              </PopoverContent>
            </Popover>
            <span>To</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {endDate ? format(endDate, "yyyy/MM/dd", { locale: ko }) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  locale={ko}
                />
              </PopoverContent>
            </Popover>
            <UpdateProject projectId={project.id} title={title} startDate={startDate} endDate={endDate}/>
            <DeleteProject projectId={project.id}/>
            <CreateTask projectId={project.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}