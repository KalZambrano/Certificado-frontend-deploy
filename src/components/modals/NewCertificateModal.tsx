// File: components/NewCertificateModal.tsx
import { useState } from "react";
import { CertificateForm } from "./CertificateForm";

export function NewCertificateModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        onClick={() => setShowModal(true)}
      >
        + Nuevo Certificado
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Nuevo Certificado</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 text-4xl"
                >
                  &times;
                </button>
              </div>
              <CertificateForm onClose={() => setShowModal(false)} certificateId={null}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
