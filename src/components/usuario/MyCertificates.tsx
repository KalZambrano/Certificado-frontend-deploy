import { config, getApiUrl } from "config";
import { useEffect, useState } from "react";
import { SkeletonRow } from "../skeletons/SkeletonRow";
import { type StudentCertificatesAPI } from "types";
import { FaRegEye } from "react-icons/fa";
import { DownloadButton } from "../DowloadButton";
import "@/styles/dashboard.css";

export function MyCertificates() {
  const [certificates, setCertificates] = useState<StudentCertificatesAPI[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const correo = localStorage.getItem("user");
    if (correo) {
      fetch(getApiUrl(config.endpoints.users.certificates(correo)))
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((certificates) => {
          // console.log(users);
          setCertificates(certificates);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
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
            <SkeletonRow rowCount={2} />
            <SkeletonRow rowCount={2} />
            <SkeletonRow rowCount={2} />
            <SkeletonRow rowCount={2} />
          </>
        ) : (
          certificates.map((cert, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {cert.curso}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(cert.fechaEmision).toLocaleDateString()}
              </td>
              <td className="my-auto">
                <div className="flex gap-x-2">
                  <DownloadButton/>
                  <a
                    className="flex gap-x-1 items-center py-1 px-2 hover:bg-gray-200 rounded-md"
                    target="_blank"
                    href={`/verification/certificado/?link=${cert.codigoVerificacion}`}
                  >
                    <FaRegEye className="size-4" />
                    Revisar
                  </a>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
