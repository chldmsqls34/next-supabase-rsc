import { LogOutBtn } from "@/components/common/LogOutBtn"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center">
      <div className="px-32">
        <div className="max-w-md text-center">
          <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl">
            Boost your productivity. Start using our app today.
          </h2>
          <p className="mt-6 text-pretty text-lg/8 text-gray-300">
            Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
          </p>
          <div className="mt-10 pl-5 flex items-center space-x-6">
            <Link
              href="/projects"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </Link>
            {data.user && (
              <>
                <LogOutBtn />
                <Link
                  href="/mypage"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  My Page
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  )


}
