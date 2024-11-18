"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LoaderCircle } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";

const UploadPdfDialog = ({ children }) => {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const addFile = useMutation(api.fileStorage.addFileEntrytoDb);
  const { user } = useUser();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [loading, setLoading] = useState(false);

  const onFileSelect = (event) => {
    setFile(event.target.files[0]);
  };
  const onUpload = async () => {
    setLoading(true);
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file
    });
    const { storageId } = await result.json();
    const fileId = uuid4();
    const fileUrl = await getFileUrl({ storageId: storageId });
    const response = await addFile({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ? fileName : "NA",
      fileUrl: fileUrl,
      createdBy: user?.primaryEmailAddress?.emailAddress
    });
    // Step 3: Save the newly allocated storage id to the database
    setLoading(false);
    console.log(response);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="flex mt-5 gap-2 p-3 rounded-md border">
                <h2>Select a file to Upload</h2>
                <input
                  className="w-[300px]"
                  type="file"
                  accept="application/pdf"
                  onChange={(event) => onFileSelect(event)}
                />
              </div>
              <div className="mt-2">
                <label>
                  File Name: <span className="text-red-800">*</span>
                </label>
                <Input
                  placeholder="File Name"
                  onChange={(event) => setFileName(event.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={onUpload}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdfDialog;
