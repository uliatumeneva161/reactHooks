async function fetchPersons() {
    const response = await fetch('/api/persons');
    return await response.json();
}

async function updateList() {
    const persons = await fetchPersons();
    const list = document.getElementById('persons');
    const info = document.getElementById('info');
    
    // Update info
    info.innerHTML = `<p>Phonebook has info for ${persons.length} people</p>
                     <p>${new Date()}</p>`;
    
    // Update list
    list.innerHTML = persons.map(person => `
        <li>
            ${person.name} ${person.number}
            <button onclick="deletePerson('${person.id}')">Delete</button>
        </li>
    `).join('');
}

async function deletePerson(id) {
    await fetch(`/api/persons/${id}`, { method: 'DELETE' });
    await updateList();
}

document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    await fetch('/api/persons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: formData.get('name'),
            number: formData.get('number')
        })
    });
    
    e.target.reset();
    await updateList();
});

// Initial load
updateList();