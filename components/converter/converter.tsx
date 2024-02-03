import fs from "node:fs";
import { ArrowRightToLine } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  initializeImageMagick,
  ImageMagick,
  Magick,
  MagickFormat,
  Quantum,
} from "@imagemagick/magick-wasm";

const fileToDataUri = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target) {
        resolve(event.target.result as string);
      } else {
        reject(new Error("Failed to read the file."));
      }
    };

    reader.readAsDataURL(file);
  });

export const PngToWebpConverterButton = ({ files = [] }: { files: File[] }) => {
  const [convertedWebP, setConvertedWebP] = useState(null);

  const convertToWebP = async () => {
    const wasm = fs.readFileSync("@imagemagick/magick-wasm/magick.wasm");
    files.map(async (file) => {
      const buffer = await fileToDataUri(file);

      const blob = new Blob([buffer], { type: file.type });

      const magik = await initializeImageMagick(wasm);
    });

    // const { data, info } = magick.convert({
    //   input: inputBuffer,
    //   outputFormat: "webp",
    // });

    // const blob = new Blob([data], { type: `image/webp` });
    // const url = URL.createObjectURL(blob);
    // setConvertedWebP(url);
  };

  return (
    <Button className="my-auto" variant="ghost" onClick={convertToWebP}>
      <ArrowRightToLine />
    </Button>
  );
};
