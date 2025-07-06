import { config, getApiUrl } from "../../config";
import { useEffect, useState } from "react";
import { type CertificatesAPI } from "../../types";
import "@/styles/dashboard.css";

import { LoadingPage } from "./LoadingPage";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlineSignature } from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { LuClipboardCheck } from "react-icons/lu";

export function VerificationPage() {
  const [certificate, setCertificate] = useState<CertificatesAPI | null>(null);
  const [loading, setLoading] = useState(true);

  // const canvasRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const linkParam = urlParams.get("link");
    if (!linkParam) return;

    fetch(getApiUrl(config.endpoints.certificates.link(linkParam)))
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setCertificate(data);
        setLoading(false);
      })
      .catch(() => {
        setCertificate(null);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //     if (certificate && canvasRef.current) {
  //         loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.4.4/qrcode.min.js", "QRCode")
  //         .then((QRCode: any) => {
  //             QRCode.toCanvas(canvasRef.current, window.location.href, {
  //             width: 200,
  //             color: { dark: "#000000", light: "#ffffff" }
  //             }, (error: any) => {
  //             if (error) console.error("Error generando QR:", error);
  //             });
  //         })
  //         .catch((err) => console.error("Error cargando QRCode:", err));
  //     }
  // }, [certificate]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!certificate) {
    return (
      <p className="grid min-h-screen place-content-center text-5xl font-extrabold bg-blue-200 text-black">
        Certificado no encontrado...
      </p>
    );
  }
  // console.log(certificate)

  const {
    nombreCompleto,
    nota,
    fechaEmision,
    curso,
    habilidades,
    descripcion,
  } = certificate;

  const fecha = new Date(fechaEmision);

  const month = fecha.toLocaleDateString("es-ES", { month: "long" });
  const day = fecha.getDate().toString().padStart(2, "0");
  const year = fecha.getFullYear();

  const fechaFormateada = `${
    month.charAt(0).toUpperCase() + month.slice(1)
  } ${day}, ${year}`;

  return (
    <>
      <header className="flex justify-center md:justify-between items-center w-full max-w-6xl mx-auto py-5 px-6">
        <div className="sidebar-logo">
          <span className="logo-box">Cer</span>
          <span className="logo-plus">+</span>
          <span className="logo-track">Tech</span>
        </div>
        <p className="font-semibold italic">R.I.P. Diogo Jota 20❤️</p>
      </header>
      <section className="bg-[#efefef] text-[#2e2e2e]">
        <div className="bg-[#efefef] text-[#2e2e2e] max-w-6xl flex flex-col md:flex-row justify-between items-center mx-auto py-5 px-8 gap-4">
          <div className="flex justify-center items-center gap-x-4">
            <div className="border border-gray-400 bg-white p-5 rounded-full hidden md:block">
              <FaRegUser className="size-10 text-gray-300" />
            </div>
            <div className="flex flex-col gap-y-2">
              <h1>
                Este certificado fue otrogado a{" "}
                <span className="uppercase text-blue-800">
                  {nombreCompleto}
                </span>
              </h1>
              <span>Fecha de emisión: {fechaFormateada}</span>
            </div>
          </div>
          <div>
            <button className="cursor-pointer group/download relative flex gap-1 px-8 py-4 bg-[#5c5fe9] text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 font-semibold shadow-xl active:shadow-inner transition-all duration-300">
              <MdOutlineFileDownload className="size-6" />
              Descargar
            </button>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 py-10 px-4 text-[#2e2e2e]">
        <img className="px-4" src="/certicado.webp" alt="Icon de certificado" />
        <div className="col-span-2 content-center gap-2">
          <h2 className="text-4xl font-bold">{curso}</h2>
          <p className="my-5">
            Emitido por <span className="text-blue-800">Cer+Tech</span>
          </p>
          <p>{descripcion}</p>
          <div className="flex gap-2 my-10">
            <p className="flex items-center gap-1 bg-gray-200 rounded-sm py-1 px-4 text-sm">
              <AiOutlineSignature className="size-4" />
              Aprendiendo
            </p>
            <p className="flex items-center gap-1 bg-gray-200 rounded-sm py-1 px-5 text-sm">
              <FiLayers className="size-4" />
              Intermedio
            </p>
          </div>
          <h3 className="font-bold">Habilidades</h3>
          {habilidades && habilidades.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 mb-10">
              {habilidades.map((habilidad, index) => (
                <span
                  className="first-letter:uppercase lowercase text-blue-800 px-4 py-1 border border-gray-400 rounded-md"
                  key={index}
                >
                  {habilidad}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-bold">Criterio de Optención</h3>
          <p className="flex gap-1 items-center my-6">
            <LuClipboardCheck className="text-green-700 size-4" />
            Puntuación de aprobación (70 %) en el examen integral de la academia
            responsable
          </p>
          <p className="font-semibold text-blue-600">
            Puntuación Obtenida {nota}
          </p>
        </div>
      </section>
      <footer className="flex flex-col items-center">
        <hr className="h-[2px] w-full min-w-[18rem] bg-transparent bg-gradient-to-r from-transparent via-black to-transparent bg-center"></hr>
        <p className="py-5">In every line of code there is a developer who didn't know what to do, but you are not the same as yesterday.</p>
      </footer>
    </>
  );
}
