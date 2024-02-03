import Image from "next/image";
import { Card, CardContent } from "../ui/card";

type PreviewCardProps = {
  files: File[];
};
export const PreviewCard = ({ files }: PreviewCardProps) => (
  <Card>
    <CardContent className="flex flex-col gap-4 p-6 overflow-auto min-w-[300px] h-full">
      {files.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-muted-foreground">No images to display</p>
        </div>
      )}
      {files.map((file, i) => (
        <figure className="relative rounded-lg shadow-md overflow-hidden hover:scale-[1.05] transition-transform">
          <Image
            className="object-cover max-w-[300px]"
            key={file.name + i}
            src={URL.createObjectURL(file)}
            alt={""}
            width={300}
            height={300}
          />

          <figcaption className="pt-2 text-xs text-muted-foreground absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
            <span className="font-semibold text-foreground text-white">
              {file.name}
            </span>
          </figcaption>
        </figure>
      ))}
    </CardContent>
  </Card>
);
