import { SkeletonRow } from "./skeletons/SkeletonRow";
import { useState, useEffect } from "react";
import { config, getApiUrl } from "../../config";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import { editar, eliminar } from "../lib/actionFunctions";
import { type CertificateUniqueAPI } from "types";

export function FetchCertificates() {


    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<CertificateUniqueAPI[]>([])

    const fetchCertificates = () => {
        setLoading(true)
        fetch(getApiUrl(config.endpoints.certificates.list))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(certificates => {
                // console.log(certificates);
                setData(certificates);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchCertificates()

        const handleCertCreated = () => fetchCertificates();
        window.addEventListener('certificadoCreado', handleCertCreated)
        
        return () => {
            window.removeEventListener('certificadoCreado', handleCertCreated);
        };
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
                        <SkeletonRow rowCount={4}/>
                        <SkeletonRow rowCount={4}/>
                        <SkeletonRow rowCount={4}/>
                        <SkeletonRow rowCount={4}/>
                    </>
                ):(
                    data.map((cert, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{cert.curso}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{cert.estudiante.apellido}, {cert.estudiante.nombre}</td>
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
                                <button onClick={() => editar(`${cert.curso}`)} className="bg-blue-700 rounded-md p-1 cursor-pointer">
                                    <BiSolidPencil className="text-white size-6 rounded-md"/>
                                </button>
                                <button 
                                onClick={() => eliminar(`${cert.curso}`,getApiUrl(config.endpoints.certificates.delete(cert.id)), fetchCertificates)}
                                className="cursor-pointer">
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