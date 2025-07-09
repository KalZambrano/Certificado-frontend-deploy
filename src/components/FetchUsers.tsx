import { config, getApiUrl } from "../../config";
import { useState, useEffect } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaRegTrashAlt, FaFilter } from "react-icons/fa";
import { SkeletonRow } from "./skeletons/SkeletonRow";
import { type UserAPI } from "types";

export function FetchUsers() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserAPI[]>([]);
  const [filter, setFilter] = useState("");

  const fetchUsers = () => {
    fetch(getApiUrl(config.endpoints.users.list))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((users) => {
        // console.log(users);
        setData(users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();

    const handleCertCreated = () => fetchUsers();
    window.addEventListener("userCreated", handleCertCreated);

    return () => {
      window.removeEventListener("userCreated", handleCertCreated);
    };
  }, []);

  const filteredData = data.filter((user) =>
    user.rol.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 px-2">
        <h2 className="section-title">Listado de Usuarios</h2>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name=""
            id=""
          >
            <option value="">Sin filtro</option>
            <option value="USER">Usuarios</option>
            <option value="ADMINISTRADOR">Administradores</option>
          </select>
          <FaFilter className="absolute top-3 left-2" />
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : (
            filteredData.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {user.nombre?.charAt(0) || "?"}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.nombre}
                      </div>
                      <div className="text-sm text-gray-500">{user.correo}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.correo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${
                                      user.rol === "ADMINISTRADOR"
                                        ? "bg-purple-100 text-purple-800"
                                        : "bg-green-100 text-green-800"
                                    }`}
                  >
                    {user.rol}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-x-2 items-center">
                  <button className="bg-blue-700 rounded-md p-1 cursor-pointer">
                    <BiSolidPencil className="text-white size-6 rounded-md" />
                  </button>
                  <button className="cursor-pointer">
                    <FaRegTrashAlt className="text-red-600 size-6" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
