function onReady() {
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Add new contact to table
        const tbody = document.getElementById('tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
        `;
        tbody.appendChild(tr);

        // Reset (clear) form
        document.getElementById('contactForm').reset();
    });
}

if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
