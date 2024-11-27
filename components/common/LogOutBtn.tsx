"use client"
import { signout } from "@/lib/memberAction"

export function LogOutBtn(){
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signout()
  };
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg">로그아웃</button>
    </form>
  )
}