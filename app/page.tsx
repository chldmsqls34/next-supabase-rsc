import { LogOutBtn } from "@/components/common/LogOutBtn";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center space-y-16">
        <Link href="/projects">
          <p>Create To Do List</p>
        </Link>
        <LogOutBtn/>
        <Link href="/mypage">
          <p>비밀번호 재설정</p>
        </Link>

      </div>
    </main>

  );
}
