"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
  value: File | null; // Single file instead of FileList
  onChange: (file: File | null) => void; // Accept a single file or null
  isLoading: boolean;
}

export const ImageUpload = ({ value, onChange, isLoading }: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; // Get the first file
    onChange(file); // Update the state with the single file
    setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
  };

  const handleRemoveFile = () => {
    onChange(null); // Clear the file
    setPreviewUrl(null); // Clear the preview URL
  };

  return (
    <div>
      {previewUrl && (
        <div className="pb-5 flex justify-center sm:justify-start">
          <div className="relative w-[200px] h-[200px] rounded-md">
            <Button
              type="button"
              disabled={isLoading}
              className="z-10 absolute -top-4 -right-4 hover:bg-destructive rounded-full p-0 h-6 w-6"
              variant={"destructive"}
              onClick={handleRemoveFile}
            >
              <X width={16} height={16} className="w-4 h-4" />
            </Button>
            <img
              src={previewUrl}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        id="image-upload"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="image-upload"
        className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
      >
        Choose Image
      </label>
    </div>
  );
};
