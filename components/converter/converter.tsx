import { ArrowRightToLine } from "lucide-react";
import { Button } from "../ui/button";
import {
  initializeImageMagick,
  ImageMagick,
  MagickFormat,
} from "@imagemagick/magick-wasm";

export const PngToWebpConverterButton = ({
  files = [],
  addBlob,
}: {
  files: File[];
  addBlob: (blob: Blob, fileName: string) => void;
}) => {
  const convertToWebP = async () => {
    const wasm = await fetch("/magick.wasm");
    const wasmBuffer = await wasm.arrayBuffer();

    Promise.all(
      files.map(async (file) => {
        await initializeImageMagick(wasmBuffer);
        const arrayBuffer = await file.arrayBuffer();

        ImageMagick.read(new Uint8Array(arrayBuffer), (image) => {
          image.write(MagickFormat.Webp, (data) => {
            const blob = new Blob([data], { type: `image/webp` });

            addBlob(blob, file.name.split(".").slice(0, -1).join("."));
          });
        });
      })
    );
  };

  return (
    <Button className="my-auto" variant="ghost" onClick={convertToWebP}>
      <ArrowRightToLine />
    </Button>
  );
};
