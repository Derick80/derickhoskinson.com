/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useDropzone } from "react-dropzone-esm";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { create } from "../actions/cloudinary";
import { Label } from "@/components/ui/label";
import { ProfileImageDisplayProps } from "./profile-image-display";
import { CustomUserImageType } from "@/lib/types";
import { useFileURLs } from "./use-file-url";
import FileImage from "./file-image";
import { ImageWithPlaceholder } from "./image-with-placeholder";
// V0 help here.

interface UploadResponse {
  url: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
}

interface CloudinaryUploadFileType extends File {
  preview: string;
}

export default function ImageDropZone ({
  userImages,
  userId,
}: {
  userImages: CustomUserImageType[];
  userId: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [errorMessage, setErrorMessage] = React.useState("");

  const getFileUrl = useFileURLs();
  console.log(userImages, "userImages from ImageDropZone");
  const [files, setFiles] = React.useState<CloudinaryUploadFileType[]>([]);
  const [uploading, setUploading] = React.useState(false);

  console.log(
    userImages.map((image) => image.fileName),
    "filenames from the userImages",
  );

  const displayPendingFiles = files.filter((file) => {
    console.log(file.name, "file.name");
    return !userImages.some((image) => image.fileName === file.name);
  });

  const existingImages = userImages.map((image) => ({
    ...image,
  }));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    async onDrop (files) {
      try {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        const formData = formRef.current
          ? new FormData(formRef.current)
          : new FormData();

        const newFiles = files.map((file) => {
          return !userImages.some(
            (existingImages) => existingImages.fileName === file.name,
          );
        });
        files.forEach((file, index) => {
          formData.append("imageField", file);
          formData.append("userId", userId);
          formData.append("intent", "upload");
        });
        try {
          const response = await fetch("/cloudinary", {
            method: "POST",
            body: formData,
          });
          const data: UploadResponse[] = await response.json();
          console.log(data, "data from cloudinary");
          if (data) {
            toast("Upload successful:");
            setFiles((prevFiles) => [
              ...prevFiles,
              ...files.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                }),
              ),
            ]);
          }

          // Handle successful upload response
        } catch (error) {
          if (error instanceof Error) {
            setErrorMessage(error.message);
          }

          setFiles([]);
          // Handle upload error
        } finally {
          setUploading(false);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

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
    formData.append("intent", "upload");
    try {
      const response = await fetch("/cloudinary", {
        method: "POST",
        body: formData,
      });
      const data: UploadResponse[] = await response.json();
      toast("Upload successful:");
      // Handle successful upload response
    } catch (error) {
      toast.error("Upload failed");
      console.error(error);

      // Handle upload error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <h2>Upload Image</h2>
      <div className="mt-4 flex flex-wrap gap-4">
        { existingImages.map((image) => {
          const pendingFile = files.find(
            (file) => file.name === image.fileName,
          );
          return (
            <FileImage
              key={ image.fileName }
              onDelete={ () => { } }
              userImage={ {
                userImages: userImages,
              } }
            >
              <ImageWithPlaceholder
                key={ image.fileName }
                src={ image.imageUrl || "" }
                className="mt-2 h-20 w-20 rounded-lg border-2 border-white ring-2 ring-neutral-400 ring-offset-1 hover:ring-primary-foreground"
                placeholderSrc={
                  pendingFile ? getFileUrl(pendingFile) : undefined
                }
                onLoad={ () => {
                  console.log("loaded", pendingFile);
                  setFiles((pendingFiles) => {
                    return pendingFiles.filter((p) => p !== pendingFile);
                  });
                } }
              />
            </FileImage>
          );
        }) }

        { displayPendingFiles.map((file) => (
          <div
            className="relative mt-2 h-20 w-20 overflow-hidden rounded-lg border border-neutral-100"
            key={ file.name }
          >
            <img
              src={ getFileUrl(file) }
              alt="Uploaded file"
              className="opacity-50"
            />
          </div>
        )) }
      </div>

      {/* Dropzone */ }
      <form
        action={ create }
        { ...getRootProps({
          className: cn("w-full h-fit", {
            "bg-primary-foreground": isDragActive,
            "bg-neutral-100": !isDragActive,
          }),
        }) }
        className={ `cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
          }` }
      >
        <Label htmlFor="imageField" className="block w-full items-center">
          <div className="flex w-full cursor-pointer place-items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-6 text-neutral-500 transition-colors hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-800 md:py-12">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-gray-600">
              Drag or drop some files here, or click to select files
            </p>
          </div>

          <Input
            { ...getInputProps() }
            type="file"
            name="imageField"
            id="imageField"
            multiple
            className="hidden"
          />
        </Label>
      </form>
      {/* { errorMessage && <p className='text-red-500'>{ errorMessage }</p> } */ }
    </div>
  );
}
