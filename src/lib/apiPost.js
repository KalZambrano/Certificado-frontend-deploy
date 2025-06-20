import { getApiUrl } from "../../config";

export function setupPostForm({ endpoint, formName, getData, eventName }) {
  document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById(`${formName}Form`);

    if (userForm) {
      userForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const data = getData();
        try {
          const response = await fetch(getApiUrl(endpoint), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            alert('Registrado correctamente');
            userForm.reset();

            window.dispatchEvent(new Event(eventName))

            const newUserModal = document.getElementById(`${formName}Modal`);
            if (newUserModal) {
              newUserModal.classList.add('hidden');
            }
          } else {
            alert('Error al registrar datos: ' + response.status);
          }
        } catch (error) {
          console.error('Error al enviar datos:', error);
          alert('Error de red o servidor');
        }
      });
    }
  });
}
