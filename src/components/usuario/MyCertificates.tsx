import { config, getApiUrl } from "config";
import { useEffect, useState } from "react";
import { SkeletonRow } from "../skeletons/SkeletonRow";
import { type StudentCertificatesAPI } from "types";
import '@/styles/dashboard.css'

export function MyCertificates (){
    
    const [certificates, setCertificates] = useState<StudentCertificatesAPI[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const correo = localStorage.getItem('user')
        if (correo) {
            fetch(getApiUrl(config.endpoints.users.certificates(correo)))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(certificates => {
                // console.log(users);
                setCertificates(certificates);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setLoading(false);
            });
        }
        
    }, [])
    

    return(
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Curso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha de Emisión</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>

                </tr>
            </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {
                loading ? (
                    <>
                        <SkeletonRow rowCount={2}/>
                        <SkeletonRow rowCount={2}/>
                        <SkeletonRow rowCount={2}/>
                        <SkeletonRow rowCount={2}/>
                    </>
                ):(
                    certificates.map((cert, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{cert.curso}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{new Date(cert.fechaEmision).toLocaleDateString()}</td>
                            <td className="my-auto">
                                <div className="flex gap-x-2">
                                    <button className="action-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                    <button className="action-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                        </svg>
                                    </button>
                                    <a target="_blank" href={`/verification/certificado/?link=${cert.codigoVerificacion}`}>Revisar</a>
                                </div>
                            </td>
                            
                        </tr>
                    ))
                )
            }
        </tbody>
        </table>
    )
}