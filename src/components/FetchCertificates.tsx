import { SkeletonRow } from "./skeletons/SkeletonRow";
import { useState, useEffect } from "react";
import { config, getApiUrl } from "../../config";
import { FaRegTrashAlt, FaFilter } from "react-icons/fa";
import { eliminar } from "../lib/actionFunctions";
import { type CertificateUniqueAPI } from "types";
import { EditCertificateForm } from "./modals/EditCertificateForm";
import "@/styles/dashboard.css";

export function FetchCertificates() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CertificateUniqueAPI[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const fetchCertificates = () => {
    setLoading(true);
    fetch(getApiUrl(config.endpoints.certificates.list))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((certificates) => {
        // console.log(certificates);
        setData(certificates);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCertificates();

    const handleCertCreated = () => fetchCertificates();
    window.addEventListener("certificadoCreado", handleCertCreated);

    return () => {
      window.removeEventListener("certificadoCreado", handleCertCreated);
    };
  }, []);

  const filteredByCourse = data.filter((cert) =>
    cert.curso.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredData = selectedMonth
    ? filteredByCourse.filter((cert) => {
        const certDate = new Date(cert.fechaEmision);
        const certMonth = certDate.toISOString().slice(0, 7); // "YYYY-MM"
        return certMonth === selectedMonth;
      })
    : filteredByCourse;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 px-2">
        <h2 className="section-title">Listado de Certificados</h2>
        <div className="relative">
          <input
            id="buscador"
            type="text"
            placeholder="Buscar certificado..."
            className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <span className="absolute left-2 top-3">🔍</span>
        </div>
      </div>
      <div className="flex items-center gap-x-2 mb-4">
        <div className="flex gap-x-1 items-center">
          <FaFilter/>
          <h2>Filtrar</h2>
        </div>
        <input
            type="month"
            className="pl-2 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Curso
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Usuario Registrado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Emisión
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Nota
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
          ) : filteredData.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No se encontraron certificados.
              </td>
            </tr>
          ) : (
            filteredData.map((cert, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {cert.curso ?? "Curso desconocido"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {cert.estudiante?.apellido ?? "Apellido"},{" "}
                  {cert.estudiante?.nombre ?? "Nombre"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {cert.fechaEmision
                    ? new Date(cert.fechaEmision).toLocaleDateString()
                    : "Fecha no disponible"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {cert.nota ?? "N/A"}
                </td>
                <td className="px-6 py-4 text-sm font-medium flex gap-x-2">
                  <EditCertificateForm certificateId={cert.id} />
                  <button
                    onClick={() =>
                      eliminar(
                        `${cert.curso}`,
                        getApiUrl(
                          config.endpoints.certificates.delete(cert.id)
                        ),
                        fetchCertificates
                      )
                    }
                    className="cursor-pointer"
                  >
                    <FaRegTrashAlt className="text-red-600 size-6" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
