"use client"

import FileUpload from "@/components/ui/file-upload"
import { UserButton } from "@clerk/nextjs"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#141414] text-gray-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-600 bg-[#0c0c0c] shadow-md">
        <div className="bg-[#0c0c0c] p-6">
          <h1 className="text-2xl font-bold text-white">Pactum.ai</h1>
        </div>
      </aside>

      <div className=" flex flex-col flex-1">
        {/* Navbar */}
        {/* <header className="flex items-center justify-end p-4 bg-black shadow-md">
          <UserButton afterSignOutUrl="/" />
        </header> */}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-center h-full">
            <FileUpload />
          </div>
        </main>
      </div>
    </div>
  )
}