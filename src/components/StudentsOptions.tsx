import { useEffect, useState } from "react"
import { getApiUrl, config } from "config"
import { type OnlyUsersAPI } from "types"

export function StudentsOptions(){
    const [users, setUsers] = useState<OnlyUsersAPI[]>([])

    useEffect(() => {
        fetch(getApiUrl(config.endpoints.users.listUsers))
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(users => {
            // console.log(users);
            setUsers(users);
            
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            
        });
    }, [])
    return (
        <>
        <option value="">----Seleccione un estudiante----</option>
        {users.length > 0 
            ? users.map((user, index) => {
                    return <option key={index} value={user.correo}>{user.nombre} {user.apellido}</option>
                })
            : <option>No hay usuarios registrados</option>
        }
        </>
    )
}