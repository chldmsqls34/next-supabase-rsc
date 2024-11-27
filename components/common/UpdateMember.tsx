"use client";
import { useState } from "react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { updateNickname } from "@/lib/memberAction";

export default function UpdateMember() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    try {
      const result = await updateNickname(formData);
      if (!result) {
        toast({
          title: "닉네임이 변경되었습니다.",
          description: "메인 페이지로 이동합니다.",
        });
        return;
      }
      if(result.errors){
        setErrors(result.errors);
        return;
      };
      if (result.status === 'update_error') {
        toast({
          variant: "destructive",
          title: "닉네임 변경 실패",
          description: result.message,
        });
        return;
      };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와의 연결에 실패했습니다. 다시 시도해주세요.",
      });
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[500px] p-5">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">닉네임 변경</CardTitle>
          <CardDescription>닉네임 변경을 위해 아래 정보를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="password">닉네임</Label>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="변경할 닉네임을 입력하세요."
              required
            />
            {errors.nickname &&
              errors.nickname.map((error, idx) => (
                <p className="mt-2 text-sm text-red-500" key={`nickname-error-${idx}`}>
                  {error}
                </p>
              ))}
          </div>
        </CardContent>
        <CardFooter className="w-full flex flex-col mt-6">
          <div className="w-full flex items-center gap-4">
            <Button variant={"outline"} className="w-full" type="button" onClick={() => router.push("/")}>
              이전
            </Button>
            <Button
              className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
              type="submit"
            >
              닉네임 변경
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}