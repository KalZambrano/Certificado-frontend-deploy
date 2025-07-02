import { useEffect, useRef, useState } from "react";
import { config, getApiUrl } from "../../../config";
import { StudentsOptions } from "../StudentsOptions";

export function NewCertificateModal() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    correo: "",
    descripcion: "",
    curso: "",
    nota: "",
    habilidades: [] as string[],
  });

  const tagsInputRef = useRef<HTMLInputElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const tagsListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  if (!showModal) return;

  const tagsInput = tagsInputRef.current;
  const tagsList = tagsListRef.current;
  const hiddenInput = hiddenInputRef.current;

  if (!tagsInput || !tagsList || !hiddenInput) return;

  const handleAddTag = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tagText = tagsInput.value.trim().replace(",", "");
      if (tagText) {
        const tagDiv = document.createElement("div");
        tagDiv.className =
          "flex justify-center items-center bg-gray-300 capitalize rounded-full px-2 py-1 gap-2 tag";
        tagDiv.innerHTML = `
          ${tagText}
          <span class="tag-remove cursor-pointer font-bold">×</span>
        `;
        tagsList.appendChild(tagDiv);

        tagDiv.querySelector(".tag-remove")?.addEventListener("click", () => {
          tagDiv.remove();
          updateHiddenInput();
        });

        tagsInput.value = "";
        updateHiddenInput();
      }
    }
  };

  const updateHiddenInput = () => {
    const tagElements = tagsList.querySelectorAll(".tag");
    const tags = Array.from(tagElements)
      .map((tag) => tag.textContent?.replace("×", "").trim() || "")
      .filter((tag) => tag.length > 0);

    hiddenInput.value = tags.join(",");
  };

  tagsInput.addEventListener("keydown", handleAddTag);

  return () => {
    tagsInput.removeEventListener("keydown", handleAddTag);
  };
}, [showModal]); // 👈 Ejecuta lógica cada vez que se abre el modal


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const habilidades = (hiddenInputRef.current?.value || "")
      .split(",")
      .map((tag) => tag.trim().toUpperCase())
      .filter((tag) => tag.length > 0);

    if (
      !formData.correo ||
      !formData.descripcion ||
      !formData.curso ||
      !formData.nota ||
      habilidades.length === 0
    ) {
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
        setShowModal(false);
        setFormData({
          correo: "",
          descripcion: "",
          curso: "",
          nota: "",
          habilidades: [],
        });
        hiddenInputRef.current!.value = "";
        tagsListRef.current!.innerHTML = "";
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
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      name="tags"
                      id="tags-input"
                      placeholder="Escribe un tag y presiona 'Enter' o una coma."
                      className="shadow border rounded w-full py-2 px-3"
                      ref={tagsInputRef}
                    />
                    <div id="tags-list" className="flex gap-2 flex-wrap" ref={tagsListRef}></div>
                  </div>
                  <input type="hidden" name="tags" id="tags" ref={hiddenInputRef} />
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
                    onClick={() => setShowModal(false)}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
