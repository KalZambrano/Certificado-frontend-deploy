export function showTags(idTagsContainer, idTagsInput, idHiddenInput){

    const tagsList = document.getElementById(idTagsContainer);
    const hiddenInput = document.getElementById(idHiddenInput);
    const tagsInput = document.getElementById(idTagsInput);

    // Agregar tag al presionar Enter o coma
    tagsInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tagText = tagsInput.value.trim().replace(',', '');
            if (tagText) {
                addTag(tagText, tagsList, hiddenInput);
                tagsInput.value = '';
                updateHiddenInput(hiddenInput);
                }
            }
        }
    );
}

// Función para crear un tag visual
export function addTag(tagText, tagsList, hiddenInput) {
    const tag = document.createElement('div');
    tag.className = 'flex justify-center items-center bg-gray-300 capitalize rounded-full px-2 py-1 gap-2 tag';
    tag.innerHTML = `
    ${tagText}
    <span class="tag-remove cursor-pointer font-bold">×</span>
    `;
    tagsList.appendChild(tag);

    // Eliminación con actualización garantizada
    tag.querySelector('.tag-remove').addEventListener('click', () => {
        tag.remove();
        updateHiddenInput(hiddenInput); // ¡Actualiza aquí!
    });
}

export function updateHiddenInput(hiddenInput) {
    const tagElements = document.querySelectorAll('.tag');

    const tags = Array.from(tagElements).map(tag => {
        return tag.textContent.replace('×', '').trim();
    }).filter(tag => tag.length > 0);

    // Actualizar el hidden input con los tags visibles
    hiddenInput.value = tags.join(',');

}