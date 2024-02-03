"use client";
import { PngToWebpConverterButton } from "@/components/converter/converter";
import { ConvertedImagesDownloaderButton } from "@/components/downloader/ConvertedImagesDownloaderButton";
import { PreviewCard } from "@/components/preview/preview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [convedFiles, setConvedFiles] = useState<File[]>([]);

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setFiles(Array.from(files));
    }
  };

  const addBlob = (blob: Blob) => {
    setBlobs((prev) => [...prev, blob]);
    setConvedFiles((prev) => [
      ...prev,
      new File([blob], `file${prev.length + 1}.webp`, {
        type: "image/webp",
      }),
    ]);
  };

  return (
    <main className="flex min-h-screen gap-6 p-24 flex-wrap">
      <Card>
        <CardHeader>
          <CardTitle>Image Converter</CardTitle>
          <CardDescription>ddingg</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Upload</Label>
            <Input
              id="picture"
              type="file"
              multiple
              accept="image/*"
              onChange={uploadFiles}
            />
          </div>
        </CardContent>
      </Card>
      <PreviewCard files={files} />
      <PngToWebpConverterButton files={files} addBlob={addBlob} />
      <PreviewCard files={convedFiles} />
      <ConvertedImagesDownloaderButton blobs={blobs} />
    </main>
  );
}
