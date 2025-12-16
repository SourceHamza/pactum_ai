"use client"

import { useState } from "react"
import { UploadCloud } from "lucide-react"

export default function FileUpload() {
  const [isHover, setIsHover] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsHover(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsHover(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsHover(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setFile(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  return (
    <div
      className={`relative w-full max-w-lg mx-auto my-10 p-8 border-2 border-dashed rounded-lg text-center transition-colors duration-300 ${
        isHover
          ? "border-blue-500 bg-blue-900/10"
          : "border-gray-600 bg-gray-800/20"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <UploadCloud className="w-16 h-16 text-gray-500" />
        <p className="text-gray-400">
          Drag and drop your file here, or{" "}
          <span className="text-blue-400 font-semibold">browse</span>
        </p>
        {file && (
          <p className="text-gray-300 mt-4">Selected file: {file.name}</p>
        )}
      </div>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        onClick={() => console.log("Upload button clicked")}
      >
        Upload
      </button>
    </div>
  )
}