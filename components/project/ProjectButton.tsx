'use client';
import { createProject, deleteProject, updateProject } from '@/lib/projectAction';
import { useRouter } from 'next/navigation';
import { BasicButton } from '@/components/ui';
import { toast } from '@/hooks/use-toast';

export function CreateProject() {
  const router = useRouter();

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createProject();
      if(result&&result.redirectUrl){
        toast({
          title: "Create Success",
          description: "생성한 프로젝트에 작업을 추가해주세요!",
        });
        router.push(result.redirectUrl);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        variant: "destructive",
        title: "Create Failed",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });
    }
  }
  return (
    <BasicButton variant='secondary' onClick={handleCreateProject} className='text-xs md:text-sm'>
      Add New Page
    </BasicButton>
  );
}

export function UpdateProject({ projectId,title,startDate,endDate }:{projectId:number,title:string,startDate:Date|undefined,endDate:Date|undefined}) {
  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateProject(projectId,title,startDate,endDate);
      if(result&&result.message){
        toast({
          title: "Update Success",
          description: "수정한 정보를 확인해주세요!",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });
    }
  }
  return (
    <BasicButton variant='filled' onClick={handleUpdateProject}>
      Save
    </BasicButton>
  );
}

export function DeleteProject({ projectId }: { projectId: number }) {
  const router = useRouter();
  const handleDeleteProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = window.confirm('정말로 이 프로젝트를 삭제하시겠습니까?');
    if (!confirmed) {
      return;
    }
    try {
      const result = await deleteProject(projectId);
      if(result&&result.message){
        toast({
          title: "Delete Success",
          description: "프로젝트를 성공적으로 삭제했습니다!",
        });
      }
      router.push('/projects');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
      });
    }
  };

  return (
    <BasicButton variant='filled' onClick={handleDeleteProject} >
      Delete
    </BasicButton>
  );
}