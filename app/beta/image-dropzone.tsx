"use client";

import React from "react";
import { useDropzone } from "react-dropzone-esm";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// V0 help here.
export default function ImageDropZone (
  { userId }: { userId: string }
) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [uploading, setUploading] = React.useState(false);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("imageField", file);
    });
    formData.append("userId", userId);
    try {
      const response = await fetch("/cloudinary", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Upload successful:", data);
      // Handle successful upload response
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle upload error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <div
        { ...getRootProps() }
        className={ `cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
          }` }
      >
        <input { ...getInputProps() } />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-gray-600">
          Drag or drop some files here, or click to select files
        </p>
      </div>

      { files.length > 0 && (
        <div className="mt-4">
          <h4 className="mb-2 text-lg font-semibold">Uploaded Files:</h4>
          <ul className="space-y-2">
            { files.map((file, index) => (
              <li
                key={ index }
                className="flex items-center justify-between rounded bg-gray-100 p-2"
              >
                <div className="flex items-center">
                  <File className="mr-2 h-5 w-5 text-blue-500" />
                  <span className="text-sm">{ file.name }</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={ () => removeFile(file) }
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </li>
            )) }
          </ul>
          <button
            onClick={ handleUpload }
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            disabled={ uploading }
          >
            { uploading ? "Uploading..." : "Upload" }
          </button>
        </div>
      ) }
    </div>
  );
}
