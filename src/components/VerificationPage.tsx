import { config, getApiUrl } from "../../config";
import { useEffect, useState, useRef } from "react";
import { loadExternalScript } from "@/lib/localExternalScript";

export function VerificationPage() {
    interface CertificateAPI {
        id:                 number;
        nombreEstudiante:   string;
        curso:              string;
        nota:               number;
        fechaEmision:       Date;
        codigoVerificacion: string;
        habilidades:        string[];
        descripcion:        string;
    }

    const [certificate, setCertificate] = useState<CertificateAPI | null>(null);
    const [loading, setLoading] = useState(true)

    const canvasRef = useRef(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const linkParam = urlParams.get('link');
        if (!linkParam) return;
        
        fetch(getApiUrl(config.endpoints.certificates.link(linkParam)))
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            setCertificate(data);
            setLoading(false);
        })
        .catch(() => {
            setCertificate(null);
            setLoading(false);
        });
    },[])

    useEffect(() => {
        if (certificate && canvasRef.current) {
            loadExternalScript("https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.4.4/qrcode.min.js", "QRCode")
            .then((QRCode: any) => {
                QRCode.toCanvas(canvasRef.current, window.location.href, {
                width: 200,
                color: { dark: "#000000", light: "#ffffff" }
                }, (error: any) => {
                if (error) console.error("Error generando QR:", error);
                });
            })
            .catch((err) => console.error("Error cargando QRCode:", err));
        }
    }, [certificate]);


    if (loading) { return <p className="grid min-h-screen place-content-center text-5xl font-extrabold animate-pulse bg-blue-200 text-black">Cargando...</p> }

    if (!certificate) { return <p className="grid min-h-screen place-content-center text-5xl font-extrabold bg-blue-200 text-black">Certificado no encontrado...</p> }
    console.log(certificate)

    const { nombreEstudiante, nota, fechaEmision, curso, habilidades, descripcion } = certificate

    return (
        <>
            <div className="grid min-h-screen place-content-center text-5xl font-extrabold text-black max-w-6xl mx-auto">
                <h1>Certificado de finalización</h1>
                <p>Nombre del estudiante: {nombreEstudiante}</p>
                <p>Curso: {curso}</p>
                <p>Nota: {nota}</p>
                <p>{descripcion}</p>
                {
                    habilidades && habilidades.length > 0 && (
                        <div>
                            <p className="text-2xl mb-4">Habilidades adquiridas</p>
                            <ul className="list-disc pl-5">
                                {habilidades.map((habilidad, index) => (
                                    <li className="first-letter:uppercase lowercase" key={index}>{habilidad}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
                <p>Fecha de emisión: {new Date(fechaEmision).toLocaleDateString()}</p>
                <div className="mt-8">
                    <p className="text-2xl mb-4">Codigo de Prueba</p>
                    <canvas ref={canvasRef}></canvas>
                </div>
            </div>
        </>
    )
}