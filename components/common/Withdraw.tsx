"use client"
import { withdraw } from "@/lib/memberAction"
import { BasicButton } from "../ui";

export function Withdraw(){
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await withdraw()
  };
  return (
    <form onSubmit={handleSubmit}>
      <BasicButton variant="secondary" type="submit" className="w-[200px]">회원 탈퇴</BasicButton>
    </form>
  )
}