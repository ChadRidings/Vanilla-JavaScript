'use strict';

function onReady() {
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const nameElement = document.getElementById('name');
        const emailElement = document.getElementById('email');
        const phoneElement = document.getElementById('phone');

        const name = nameElement.value.trim();
        const email = emailElement.value.trim();
        const phone = phoneElement.value.trim();
        
        const emailRegex = /^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\d{10}$/;

        /**
         * Validation
         * - Name: Required
         * - Email: Required, Valid email
         * - Phone: Required, 10 digits
         * - add 'is-invalid' class to input if invalid
         */
        nameElement.classList.remove('is-invalid');
        emailElement.classList.remove('is-invalid');
        phoneElement.classList.remove('is-invalid');

        if (!name) {
            nameElement.classList.add('is-invalid');
            return;
        } else {
            nameElement.classList.remove('is-invalid');
        }

        if (!email || !emailRegex.test(email)) {
            emailElement.classList.add('is-invalid');
            return;
        } else {
            nameElement.classList.remove('is-invalid');
        }

        if (!phone || !phoneRegex.test(phone)) {
            phoneElement.classList.add('is-invalid');
            return;
        } else {
            nameElement.classList.remove('is-invalid');
        }

        // Add new contact to table
        const tbody = document.getElementById('contactsTbody');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
        `;
        tbody.appendChild(tr);

        // Reset (clear) form
        document.getElementById('contactForm').reset();
        nameElement.classList.remove('is-invalid');
        emailElement.classList.remove('is-invalid');
        phoneElement.classList.remove('is-invalid');
    });
}

if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
