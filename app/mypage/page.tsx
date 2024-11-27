"use client";

import UpdateMember from "@/components/common/UpdateMember";
import UpdatePassword from "@/components/common/UpdatePassword";
import { Withdraw } from "@/components/common/Withdraw";

function MyPage() {

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex flex-col px-32 items-center justify-center space-y-5">
        <h4 className="text-xl font-semibold">My Page</h4>
        <UpdateMember/>
        <UpdatePassword/>
        <Withdraw/>
      </div>
    </div>
  );
}
export default MyPage;