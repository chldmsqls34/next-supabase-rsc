"use client"
import { signout } from "@/lib/memberAction"
import { BasicButton } from "../ui";

export function LogOutBtn(){
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signout()
  };
  return (
    <form onSubmit={handleSubmit}>
      <BasicButton variant="filled" type="submit" className="font-bold">LogOut</BasicButton>
    </form>
  )
}