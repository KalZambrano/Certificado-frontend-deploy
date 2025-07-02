// File: components/CertificateForm.tsx
import { useRef, useState, useEffect } from "react";
import { config, getApiUrl } from "../../../config";
import { StudentsOptions } from "../StudentsOptions";
import { TagInput } from "./TagInput";

interface CertificateFormProps {
  onClose: () => void;
}

export function CertificateForm({ onClose }: CertificateFormProps) {
  const [formData, setFormData] = useState({
    correo: "",
    descripcion: "",
    curso: "",
    nota: "",
  });

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const habilidades = (hiddenInputRef.current?.value || "")
      .split(",")
      .map((tag) => tag.trim().toUpperCase())
      .filter((tag) => tag.length > 0);

    if (!formData.correo || !formData.descripcion || !formData.curso || !formData.nota || habilidades.length === 0) {
      alert("Faltan campos en el formulario");
      return;
    }

    const payload = {
      ...formData,
      habilidades,
    };

    try {
      const res = await fetch(getApiUrl(config.endpoints.certificates.create), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Registrado correctamente");
        onClose();
        setFormData({ correo: "", descripcion: "", curso: "", nota: "" });
        if (hiddenInputRef.current) hiddenInputRef.current.value = "";
        window.dispatchEvent(new Event("certificadoCreado"));
      } else {
        alert("Error al registrar datos: " + res.status);
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("Error de red o servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estudiante">
          Estudiante
        </label>
        <select
          className="shadow border rounded w-full py-2 px-3"
          name="correo"
          id="estudiante"
          required
          onChange={handleChange}
          value={formData.correo}
        >
          <StudentsOptions />
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Descripción
        </label>
        <textarea
          className="shadow border rounded w-full py-2 px-3"
          rows={4}
          id="description"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Ej: Certificado otorgado por haber completado con éxito todos los módulos"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
          Etiquetas
        </label>
        <TagInput hiddenInputRef={hiddenInputRef} />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nota">
            Nota
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3"
            id="nota"
            type="number"
            step="0.1"
            min="0"
            max="20"
            name="nota"
            value={formData.nota}
            onChange={handleChange}
            placeholder="Ej: 15.5"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="curso">
            Curso
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3"
            id="curso"
            type="text"
            name="curso"
            value={formData.curso}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
