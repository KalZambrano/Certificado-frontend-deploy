export async function eliminar(nombre: string, endpoint: string, onSuccess?: () => void) {
    const confirmation = confirm("Desea eliminar: " + nombre);
    if(confirmation) {
        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Eliminado correctamente');
                if (onSuccess) onSuccess()
            } else {
                alert('Error al eliminar recurso: ' + response.status);
            }
        } catch (error) {
            console.error('Error al enviar sintaxis:', error);
            alert('Error de red o servidor');
        }
    }
}

export function editar(nombre: string) {
    alert("Función de editar aún no implementada para: " + nombre);
}