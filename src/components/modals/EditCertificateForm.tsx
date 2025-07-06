import { useState } from "react";
import { CertificateForm } from "./CertificateForm";
import { BiSolidPencil } from "react-icons/bi";

export function EditCertificateForm({certificateId}: {certificateId: number}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="bg-blue-700 rounded-md p-1 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <BiSolidPencil className="text-white size-6 rounded-md"/>
      </button>
      

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Editar Certificado
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 text-4xl"
                >
                  &times;
                </button>
              </div>
              <CertificateForm onClose={() => setShowModal(false)} certificateId={certificateId}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
