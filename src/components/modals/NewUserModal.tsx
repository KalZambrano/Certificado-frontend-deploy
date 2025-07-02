import { useState, useRef } from 'react';
import { config, getApiUrl } from 'config';

export function NewUserModal() {
  const [isOpen, setIsOpen] = useState(false);

  const nombreRef = useRef<HTMLInputElement>(null);
  const apellidoRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const claveRef = useRef<HTMLInputElement>(null);
  const rolRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nombre = nombreRef.current?.value || '';
    const apellido = apellidoRef.current?.value || '';
    const correo = correoRef.current?.value || '';
    const clave = claveRef.current?.value || '';
    const rol = rolRef.current?.value || '';

    if (!nombre || !apellido || !correo || !clave || !rol) {
      alert("Faltan campos en el formulario");
      return;
    }

    const data = { nombre, apellido, correo, clave, rol };

    try {
      const response = await fetch(getApiUrl(config.endpoints.users.register), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Registrado correctamente');
        formRef.current?.reset()
        setIsOpen(false);
        window.dispatchEvent(new Event('userCreated'));
      } else {
        alert(`Error al registrar datos: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      alert('Error de red o servidor');
    }
  };

  return (
    <>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        onClick={() => setIsOpen(true)}
      >
        + Nuevo Usuario
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Nuevo Usuario</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 text-4xl hover:text-gray-500"
                >
                  &times;
                </button>
              </div>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    ref={nombreRef}
                    type="text"
                    placeholder="Nombre"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">
                    Apellido
                  </label>
                  <input
                    id="apellido"
                    ref={apellidoRef}
                    type="text"
                    placeholder="Apellido"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="correo" className="block text-gray-700 text-sm font-bold mb-2">
                    Correo electrónico
                  </label>
                  <input
                    id="correo"
                    ref={correoRef}
                    type="email"
                    placeholder="Correo"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="clave" className="block text-gray-700 text-sm font-bold mb-2">
                    Contraseña
                  </label>
                  <input
                    id="clave"
                    ref={claveRef}
                    type="password"
                    placeholder="Contraseña"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="rol" className="block text-gray-700 text-sm font-bold mb-2">
                    Rol
                  </label>
                  <select
                    id="rol"
                    ref={rolRef}
                    required
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="USER">Usuario</option>
                    <option value="ADMINISTRADOR">Administrador</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
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
};
