import { config, getApiUrl } from "config";

export default function Login() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const correo = (form.usuario as HTMLInputElement).value;
    const clave = (form.password as HTMLInputElement).value;

    try {
      const response = await fetch(getApiUrl(config.endpoints.users.login), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ correo, clave }),
      });

      const data = await response.json();
      const { rol, correo: userCorreo } = data;

      if (response.ok) {
        localStorage.setItem("user", userCorreo);
        localStorage.setItem("role", rol);
        alert("Inicio de sesión exitoso");

        window.location.href =
          rol === "ADMINISTRADOR" ? "/admin/dashboard" : "/user/dashboard";
      } else {
        alert("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al hacer login:", error);
      alert("Hubo un problema de conexión con el servidor.");
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#020617] relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#020617",
          backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
        radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
      `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-around px-6 py-8 mx-auto h-screen max-w-7xl">
        <span className="flex flex-col justify-center items-center mb-6 text-3xl font-extrabold text-gray-300 z-20">
          <img
            src="/aucklandCity.png"
            className="hidden lg:block w-3/4"
            alt="El mejor equipo con el que puedes callar la boca de miles de aficionados argentinos"
          />
          Cer + Tech
        </span>
        <div className="w-full bg-black/30 backdrop-blur-lg rounded-lg shadow sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl">
              Ingresa a tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="usuario"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  Correo institucional
                </label>
                <input
                  type="email"
                  inputMode="email"
                  name="usuario"
                  placeholder="Ingresa tu usuario"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 ring-2 ring-purple-500 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  inputMode="text"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 ring-2 ring-purple-500 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              {/* <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                ¿Olvidó su contraseña?
              </a> */}
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 transition-colors focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 text-center cursor-pointer"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
