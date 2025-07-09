import { MdOutlineFileDownload } from "react-icons/md";
import { getApiUrl, config } from "config";

export function DownloadButton({ pretty, certificateId }: { pretty: boolean, certificateId: number }) {
  const descargarPDF = async () => {
    try {
      const response = await fetch(
        getApiUrl(config.endpoints.certificates.download(certificateId)),
        {
          method: "GET",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo descargar el archivo");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "certificado.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };
  return pretty ? (
    <button
      onClick={descargarPDF}
      className="cursor-pointer group/download relative flex gap-1 px-8 py-4 bg-[#5c5fe9] text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 font-semibold shadow-xl active:shadow-inner transition-all duration-300"
    >
      <MdOutlineFileDownload className="size-6" />
      Descargar
    </button>
  ) : (
    <button
      className="flex items-center py-1 px-2 hover:bg-gray-200 rounded-md"
      onClick={descargarPDF}
    >
      <MdOutlineFileDownload className="size-4" />
    </button>
  );
}
