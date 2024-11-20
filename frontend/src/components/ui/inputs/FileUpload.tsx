"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from 'lucide-react'

import { cn } from "@/lib/utils"

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFilesSelected: (files: File[]) => void
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, onFilesSelected, ...props }, ref) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: onFilesSelected,
    })

    return (
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
          isDragActive && "border-primary",
          className
        )}
      >
        <input {...getInputProps()} ref={ref} {...props} />
        <Upload className="w-10 h-10 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">
          {isDragActive
            ? "Drop the files here ..."
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"

export { FileUpload }