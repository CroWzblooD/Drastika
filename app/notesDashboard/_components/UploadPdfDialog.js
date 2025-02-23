"use client"; 

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FaSpinner, FaUpload, FaTimes } from 'react-icons/fa';
import { useUser } from "@clerk/nextjs";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

function UploadPdfDialog({ children }) {
  const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
  const AddFileEntry = useMutation(api.pdfStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.pdfStorage.getFileUrl);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const embeddDocument = useAction(api.myActions.ingest);
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilename(selectedFile.name.replace('.pdf', ''));
    }
  };

  const onUpload = async () => {
    if (!file || !filename) {
      toast.error("Please select a file and enter a name");
      return;
    }

    setLoading(true);
    try {
      const postUrl = await generateUploadUrl({ filename });
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId } = await result.json();
      const fileUrl = await getFileUrl({ storageId });
      const fileId = uuidv4();

      await AddFileEntry({
        fileId,
        storageId,
        fileName: filename,
        fileUrl,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      const { data } = await axios.get('/api/processPdf?pdfUrl=' + fileUrl);
      await embeddDocument({
        splitText: data.result,
        fileId: fileId
      });

      toast.success("Resource uploaded successfully!");
      setOpen(false);
      router.replace('/workspace/' + fileId);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload resource");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl z-50 w-[400px]">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-semibold text-[#614434]">
              Upload Teaching Resource
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-[#8B4513] hover:text-[#614434]">
                <FaTimes />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div className="p-4 border-2 border-dashed border-[#E6D5C3] rounded-lg hover:border-[#C8A087] transition-colors">
              <input
                type="file"
                accept="application/pdf"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#FAF3ED] file:text-[#C8A087] hover:file:bg-[#C8A087] hover:file:text-white file:cursor-pointer w-full"
                onChange={onFileSelect}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#614434] mb-1">
                Resource Name
              </label>
              <Input
                placeholder="Enter resource name"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="border-[#E6D5C3] focus:border-[#C8A087] focus:ring-[#C8A087]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Dialog.Close asChild>
              <Button variant="outline" className="border-[#E6D5C3] text-[#614434]">
                Cancel
              </Button>
            </Dialog.Close>
            <Button 
              onClick={onUpload} 
              disabled={loading}
              className="bg-[#C8A087] hover:bg-[#B38B6D] text-white"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <FaUpload className="mr-2" />
                  Upload
                </>
              )}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default UploadPdfDialog;
