"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { updateUserInfo } from "@/lib/memberAction";


function MyPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const togglePassword = () => setShowPassword((prevState) => !prevState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    try {
      const result = await updateUserInfo(formData);
      if (!result) {
        toast({
          title: "비밀번호가 변경되었습니다.",
          description: "로그인 페이지로 이동합니다.",
        });
        return;
      }
      if(result.errors){
        setErrors(result.errors);
        return;
      };
      if (result.status === 'validation_error') {
        toast({
          variant: "destructive",
          title: "비밀번호 변경 실패",
          description: result.message,
        });
        return;
      };
      if (result.status === 'update_error') {
        toast({
          variant: "destructive",
          title: "비밀번호 변경 실패",
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
    <div className="w-screen h-screen flex">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col items-center mt-10">
          <h4 className="text-lg font-semibold">안녕하세요 👋🏻</h4>
          <div className="flex flex-col items-center justify-center mt-2 mb-4">
            <div className="text-sm text-muted-foreground">
              <small className="text-sm text-[#e79057] font-medium leading-none">TASK 관리 앱</small>에 방문해주셔서 감사합니다.
            </div>
            <p className="text-sm text-muted-foreground">서비스를 이용하려면 로그인을 진행해주세요.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <Card className="w-[500px] p-5">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">비밀번호 변경</CardTitle>
              <CardDescription>비밀번호 변경을 위해 아래 정보를 입력해주세요.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요."
                  required
                />
                {errors.password &&
                  errors.password.map((error, idx) => (
                    <p className="mt-2 text-sm text-red-500" key={`password-error-${idx}`}>
                      {error}
                    </p>
                  ))}
              </div>
              <div className="relative grid gap-2">
                <Label htmlFor="password">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 한번 더 입력하세요."
                  required
                />
                <Button
                  size={"icon"}
                  className="absolute top-8 right-2 -translate-y-1/4 bg-transparent hover:bg-transparent"
                  type="button"
                  onClick={togglePassword}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5 text-muted-foreground" /> : <EyeIcon className="h-5 w-5 text-muted-foreground" />}
                </Button>
                {errors.password &&
                  errors.password.map((error, idx) => (
                    <p className="mt-2 text-sm text-red-500" key={`password-error-${idx}`}>
                      {error}
                    </p>
                  ))}
              </div>
            </CardContent>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">간편 회원가입을 원하시면 이전 버튼을 누르세요.</span>
              </div>
            </div>
            <CardFooter className="w-full flex flex-col mt-6">
              <div className="w-full flex items-center gap-4">
                <Button variant={"outline"} className="w-full" type="button" onClick={() => router.push("/")}>
                  이전
                </Button>
                <Button
                  className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
                  type="submit"
                >
                  비밀번호 변경
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                로그인 페이지로 돌아가기{" "}
                <Link href={"/login"} className="underline text-sm ml-1">
                  로그인
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>

      </div>
    </div>
  );
}
export default MyPage;