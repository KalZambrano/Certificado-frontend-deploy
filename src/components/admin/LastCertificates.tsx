import { useState, useEffect } from "react";
import { getApiUrl, config } from "config";
import { SkeletonRow } from "../skeletons/SkeletonRow";
import { type CertificateUniqueAPI } from "types";
import { FaRegEye } from "react-icons/fa";
import { DownloadButton } from "../DowloadButton";
import "@/styles/dashboard.css";

export function LastCertificates() {
  const [certificates, setCertificates] = useState<CertificateUniqueAPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiUrl(config.endpoints.certificates.list))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((certificates) => {
        // console.log(certificates);
        setCertificates(certificates);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Alumno
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Curso
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Fecha de Emisión
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {loading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : (
          Array.from({ length: 4 }).map((_, index) => {
            const cert = certificates[certificates.length - 4 + index] ?? {};
            const estudiante = cert.estudiante ?? {};
            const nombre = estudiante.nombre ?? "Nombre";
            const apellido = estudiante.apellido ?? "Apellido";
            const curso = cert.curso ?? "Curso desconocido";
            const fechaEmision = cert.fechaEmision
              ? new Date(cert.fechaEmision).toLocaleDateString()
              : "Fecha no disponible";
            const codigoVerificacion = cert.codigoVerificacion ?? "";

            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="user-info text-center">
                    <span className="avatar">{nombre.charAt(0)}</span>
                    {nombre} {apellido}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {curso}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {fechaEmision}
                </td>
                <td className="px-12 py-8 flex gap-x-2">
                  <DownloadButton pretty={false} certificateId={cert.id}/>
                  <a
                    className="flex gap-x-1 items-center py-1 px-2 hover:bg-gray-200 rounded-md"
                    target="_blank"
                    href={`/verification/certificado/?link=${codigoVerificacion}`}
                  >
                    <FaRegEye className="size-4" />
                    Revisar
                  </a>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
