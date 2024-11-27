"use client";

import { CalendarIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Button } from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { Calendar } from "@/components/ui";
import { DeleteTask, DuplicateTask, UpdateTask } from "./TaskButton";
import { ko } from "date-fns/locale";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { TaskDTO } from "@/types";
import { BasicButton } from '@/components/ui';

export default function TaskCard({task}:{task:TaskDTO}) {
  const [title, setTitle] = useState<string>(task.title);
  const [startDate, setStartDate] = useState<Date | undefined>(
    task.startDate ? new Date(task.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    task.endDate ? new Date(task.endDate) : undefined
  );
  const [content, setContent] = useState<string>(task.content||"");
  const [check, setCheck] = useState<boolean|undefined>(task.isCompleted);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const checked = () => setCheck((prev) => !prev);


  return (
    <Card key={task.id}>
    <CardHeader className="flex flex-row space-x-4 items-center">
      <div
        onClick={checked}
        className={cn(
          "w-6 h-6 flex items-center justify-center border rounded-xl cursor-pointer",
          check ? "bg-[#00F38D] text-white" : "border-gray-300 rounded-sm"
        )}
      >
        {check && <CheckIcon className="w-4 h-4" />}
      </div>
      <CardTitle>
        <input type="text" value={task.title} className="text-2xl text-gray-700" placeholder="Board Title Here..." disabled={true}/>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-row flex-wrap space-y-2 space-x-5 pb-5 items-center">
        <span>From</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
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
        <div className="grow"></div>
        <DuplicateTask projectId={task.projectId} title={task.title} startDate={task.startDate} endDate={task.endDate} content={task.content} isCompleted={task.isCompleted}/>
        <DeleteTask taskId={task.id} />
      </div>
      <div className="flex flex-col justify-center pt-5 border-t border-t-gray-200">
        {task.content&&
          <MarkdownEditor.Markdown source={task.content} className="text-center py-2"/>
        }
        <BasicButton variant="text" onClick={()=>{setIsModalOpen(true);setTitle(task.title);setContent(task.content||"")}}>Add Contents</BasicButton>
        {
          isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white w-[70%] h-[80%] p-5 rounded-md">
                <div className="flex flex-col">
                  <div className="flex space-x-4 pb-6 items-center">
                    <div
                      onClick={checked}
                      className={cn(
                        "w-6 h-6 flex items-center justify-center border rounded-xl cursor-pointer",
                        check ? "bg-[#00F38D] text-white" : "border-gray-300 rounded-sm"
                      )}
                    >
                      {check && <CheckIcon className="w-4 h-4" />}
                    </div>
                    <input type="text" value={title} className="text-3xl pt-5" onChange={(e)=>setTitle(e.target.value)} placeholder="Board Title Here"/>
                  </div>
                  <div className="flex space-x-4">
                    <span>From</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
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
                  </div>
                </div>
                <div className="py-5">
                  <MarkdownEditor className="h-[500px]" value={content} onChange={(value)=>{setContent(value)}}/>
                </div>
                <div className="flex justify-end space-x-4 py-2 text-xs md:text-sm">
                  <BasicButton variant="text" onClick={()=>{setIsModalOpen(false)}}>Cancle</BasicButton>
                  <UpdateTask taskId={task.id} title={title} startDate={startDate} endDate={endDate} content={content} isCompleted={check} closeModal={closeModal} />
                </div>
              </div>
            </div>
          )
        }
      </div>
    </CardContent>
  </Card>



  );

}