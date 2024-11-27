"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui";
import { login } from "@/lib/memberAction";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "@/hooks/use-toast";

function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const togglePassword = () => setShowPassword((prevState) => !prevState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    try {
      const result = await login(formData);
      if (!result) {
        toast({
          title: "로그인 성공",
          description: "프로젝트 페이지로 이동합니다.",
        });
        return;
      }
      if(result.errors){
        setErrors(result.errors);
        return;
      };
      if (result.status === 'auth_error') {
        toast({
          variant: "destructive",
          title: "인증에 실패하였습니다.",
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
              <CardTitle className="text-2xl">로그인</CardTitle>
              <CardDescription>로그인을 위한 정보를 입력해주세요.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" name="email" type="email" placeholder="이메일을 입력하세요." required />
                {errors.email &&
                  errors.email.map((error, idx) => (
                    <p className="mt-2 text-sm text-red-500" key={`email-error-${idx}`}>
                      {error}
                    </p>
                  ))}
              </div>
              <div className="relative grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">비밀번호</Label>
                  {/* <Link href={"#"} className="ml-auto inline-block text-sm underline">
                    비밀번호를 잊으셨나요?
                  </Link> */}
                </div>
                <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="비밀번호를 입력하세요." required />
                <Button size={"icon"} className="absolute top-[38px] right-2 -translate-y-1/4 bg-transparent hover:bg-transparent" onClick={togglePassword}>
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
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <CardFooter className="flex flex-col mt-6">
              <Button className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg" type="submit">
                로그인
              </Button>
              <div className="mt-4 text-center text-sm">
                계정이 없으신가요?
                <Link href={"/signup"} className="underline text-sm ml-1">
                  회원가입
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;