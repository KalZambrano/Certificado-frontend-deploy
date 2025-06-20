import { SkeletonRow } from "./skeletons/SkeletonRow";
import { useState, useEffect } from "react";
import { config, getApiUrl } from "../../config";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";

export function FetchCertificates() {
    
    interface CertificateAPI {
        id:                 number;
        nombreEstudiante:   string;
        codigo:             string;
        curso:              string;
        nota:               number;
        fechaEmision:       Date;
        codigoVerificacion: string;
        habilidades:        any[];
        descripcion:        null;
    }

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<CertificateAPI[]>([])

    function editarCertificado(nombre: string) {
      alert("Función de editar aún no implementada para: " + nombre);
    }

    useEffect(() => {
        fetch(getApiUrl(config.endpoints.certificates.list))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(certificates => {
                console.log(certificates);
                setData(certificates);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setLoading(false);
            });
    }, []);

    return(
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Curso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario Registrado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Emisión</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vencimiento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nota</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>

              </tr>
            </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {
                loading ? (
                    <>
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                    </>
                ):(
                    data.map((cert, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{cert.curso}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{cert.nombreEstudiante}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{new Date(cert.fechaEmision).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">Vencera Algun dia</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{cert.nota}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">Espacio para estados</td>
                            {/* <td className="px-6 py-4">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${cert.estado === 'Vigente' 
                                    ? 'bg-green-100 text-green-800' 
                                    : cert.estado === 'Por renovar' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-red-100 text-red-800'}`}>
                                {cert.estado}
                                </span>
                            </td> */}
                            <td className="px-6 py-4 text-sm font-medium flex gap-x-2">
                                <button onClick={() => editarCertificado(`${cert.curso}`)} className="bg-blue-700 rounded-md p-1 cursor-pointer">
                                    <FaPencilAlt className="text-white size-6 rounded-md"/>
                                </button>
                                <button className="cursor-pointer">
                                    <FaRegTrashAlt className="text-red-600 size-6"/>
                                </button>
                            </td>
                        </tr>
                    ))
                )
            }
        </tbody>
        </table>
    )
}