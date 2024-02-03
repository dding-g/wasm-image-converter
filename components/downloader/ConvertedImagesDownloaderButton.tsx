import { DownloadCloudIcon } from "lucide-react";
import { Button } from "../ui/button";
import JSZip from "jszip";

type Props = {
  blobs: Blob[];
};
export const ConvertedImagesDownloaderButton = ({ blobs }: Props) => {
  const downloadWebP = async () => {
    const zip = new JSZip();

    blobs.forEach((blob, index) => {
      zip.file(`file${index + 1}.webp`, blob);
    });

    const content = await zip.generateAsync({ type: "blob" });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(content);
    downloadLink.download = "convert-result.zip";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Button className="my-auto" variant="ghost" onClick={downloadWebP}>
      <DownloadCloudIcon />
    </Button>
  );
};
