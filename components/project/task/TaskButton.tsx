'use client';

import { BasicButton } from '@/components/ui';
import { toast } from '@/hooks/use-toast';
import { createTask, deleteTask, duplicateTask, updateTask } from '@/lib/taskAction';
import { useRouter } from 'next/navigation';

export function CreateTask({projectId}: {projectId: number}) {
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createTask(projectId);
      if(result&&result.message){
        toast({
          title: "Create Success",
          description: "프로젝트에 작업을 추가했습니다.",
        });
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        variant: "destructive",
        title: "Create Failed",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });

    }
  }
  return (
    <BasicButton variant='filled' onClick={handleCreateTask}>
      Add New
    </BasicButton>
  );
}

export function CreateTaskWithSecondaryButton({ projectId }: { projectId: number }) {
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createTask(projectId);
      if(result&&result.message){
        toast({
          title: "Create Success",
          description: "프로젝트에 작업을 추가했습니다.",
        });
      }
      
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        variant: "destructive",
        title: "Create Failed",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });

    }
  }
  return (
    <button onClick={handleCreateTask}>
      <div className="group inline-block">
        <svg
          width="74"
          height="74"
          viewBox="0 0 74 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current text-[#E79057] group-active:text-[#AD4500] transition-colors duration-200"
        >
          <circle cx="37" cy="37" r="36.5" />
          <line x1="21" y1="36.5" x2="53" y2="36.5" />
          <line x1="37.5" y1="21" x2="37.5" y2="53" />
        </svg>
      </div>
    </button>
  );
}

export function UpdateTask({ taskId,title,startDate,endDate,content,isCompleted,closeModal }: { taskId: number,title:string,startDate:Date|undefined,endDate:Date|undefined,content:string,isCompleted:boolean|undefined,closeModal:()=>void }) {
  const router = useRouter();
  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateTask(taskId,title,startDate,endDate,content,isCompleted);
      if(result&&result.message){
        toast({
          title: "Update Success",
          description: "수정한 정보를 확인해주세요.",
        });
        closeModal();
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });
    }
  }
  return (
    <BasicButton variant='filled' onClick={handleUpdateTask}>
      Done
    </BasicButton>
  );
}

export function DeleteTask({ taskId }: { taskId: number }) {
  const router = useRouter();
  const handleDeleteTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = window.confirm('정말로 이 작업을 삭제하시겠습니까?');
    if (!confirmed) {
      return;
    }
    try {
      const result = await deleteTask(taskId);
      if(result&&result.message){
        toast({
          title: "Delete Success",
          description: "삭제가 완료되었습니다.",
        });
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });
    }
  };
  return (
    <BasicButton variant='text' onClick={handleDeleteTask}>
      Delete
    </BasicButton>
  );
}

export function DuplicateTask({ projectId,title,startDate,endDate,content,isCompleted }: { projectId: number,title:string,startDate:string|undefined,endDate:string|undefined,content:string|undefined,isCompleted:boolean|undefined }) {
  const router = useRouter();
  const handleDuplicate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await duplicateTask(projectId,title,startDate,endDate,content,isCompleted);
      if(result&&result.message){
        toast({
          title: "Duplicate Success",
          description: "작업이 복제되었습니다.",
        });
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        variant: "destructive",
        title: "Duplicate Failed",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });
    }
  }
  return (
    <BasicButton variant='text' onClick={handleDuplicate}>
      Duplicate
    </BasicButton>
  );
}