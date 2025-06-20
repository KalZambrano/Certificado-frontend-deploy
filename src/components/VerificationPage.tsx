import { config, getApiUrl } from "../../config";
import { useEffect, useState, useRef } from "react";

export function VerificationPage() {
    const [certificate, setCertificate] = useState(null);
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
    if (certificate && canvasRef.current && typeof window !== 'undefined') {
        // @ts-ignore: QRCode viene de script global
        const QRCode = window.QRCode;
        if (QRCode) {
            QRCode.toCanvas(canvasRef.current, window.location.href, {
                width: 200,
                color: {
                    dark: "#000000",
                    light: "#ffffff"
                }
            }, (error: any) => {
                if (error) console.error("Error generando QR:", error);
            });
        } else {
            console.error("QRCode no está definido");
        }
    }
}, [certificate]);


    if (loading) { return <p className="grid min-h-screen place-content-center text-5xl font-extrabold animate-pulse bg-blue-200 text-black">Cargando...</p> }

    if (!certificate) { return <p className="grid min-h-screen place-content-center text-5xl font-extrabold bg-blue-200 text-black">Certificado no encontrado...</p> }

    const { nombreEstudiante, nota, fechaEmision, curso } = certificate

    return (
        <>
            <div className="grid min-h-screen place-content-center text-5xl font-extrabold bg-blue-200 text-black">
                <h1>Certificado de finalización</h1>
                <p>Nombre del estudiante: {nombreEstudiante}</p>
                <p>Curso: {curso}</p>
                <p>Nota: {nota}</p>
                <p>Fecha de emisión: {new Date(fechaEmision).toLocaleDateString()}</p>
                <div className="mt-8">
                    <p className="text-2xl mb-4">Codigo de Prueba</p>
                    <canvas ref={canvasRef}></canvas>
                </div>
            </div>
        </>
    )
}