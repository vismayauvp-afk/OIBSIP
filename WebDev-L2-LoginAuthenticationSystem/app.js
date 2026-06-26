/**
 * Core Authentication Manager
 */

// Native SHA-256 Hashing System using standard Browser Web Crypto API
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Clean View Transitions
function showView(viewName) {
    const views = {
        register: document.getElementById('register-view'),
        login: document.getElementById('login-view'),
        dashboard: document.getElementById('dashboard-view')
    };

    // Clear all alerts automatically when navigating
    document.querySelectorAll('.msg').forEach(m => { m.classList.add('hidden'); m.textContent = ''; });

    // Handle Session Gate Protection
    if (viewName === 'dashboard') {
        const sessionUser = localStorage.getItem('session_user');
        if (!sessionUser) {
            showView('login');
            return;
        }
        // Update user presentation layers dynamically
        document.getElementById('user-avatar').textContent = sessionUser.charAt(0).toUpperCase();
    }

    // Toggle viewport visibility classes smoothly
    Object.keys(views).forEach(key => {
        if (key === viewName) {
            views[key].classList.remove('hidden');
        } else {
            views[key].classList.add('hidden');
        }
    });
}

function postNotification(containerId, message, statusType = 'error') {
    const box = document.getElementById(containerId);
    box.textContent = message;
    box.className = `msg ${statusType}`;
    box.classList.remove('hidden');
}

// --- FEATURES SYSTEM ---

// 1. Account Registration Core
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userField = document.getElementById('reg-username').value.trim();
    const passField = document.getElementById('reg-password').value;

    // Validation: Deny empty structural inputs
    if (!userField || !passField) {
        postNotification('reg-msg', 'Please complete all authorization values.');
        return;
    }

    // Validation Check: Min 8 length configuration with at least 1 number digit
    const complexitySchema = /^(?=.*[0-9]).{8,}$/;
    if (!complexitySchema.test(passField)) {
        postNotification('reg-msg', 'Security requirement: Password requires minimum 8 characters and at least 1 numeric digit.');
        return;
    }

    const database = JSON.parse(localStorage.getItem('users')) || {};
    const normalizedKey = userField.toLowerCase();

    // Duplicate account handling
    if (database[normalizedKey]) {
        postNotification('reg-msg', 'Identity key match found. This identifier already exists.');
        return;
    }

    // Cryptographic process hashing logic and persistence commit
    const secureHash = await hashPassword(passField);
    database[normalizedKey] = {
        username: userField,
        password: secureHash
    };

    localStorage.setItem('users', JSON.stringify(database));
    
    postNotification('reg-msg', 'Account registered successfully. Route initializing...', 'success');
    document.getElementById('register-form').reset();
    
    setTimeout(() => showView('login'), 1500);
});

// 2. Authorization Login Core
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userField = document.getElementById('login-username').value.trim();
    const passField = document.getElementById('login-password').value;

    if (!userField || !passField) {
        postNotification('login-msg', 'Please completely provide registration access metrics.');
        return;
    }

    const database = JSON.parse(localStorage.getItem('users')) || {};
    const matchProfile = database[userField.toLowerCase()];

    // Fail early or fail gracefully with masked error returns to avoid exploitation vectors
    if (!matchProfile) {
        postNotification('login-msg', 'Invalid credential combination matches.');
        return;
    }

    const verificationHash = await hashPassword(passField);
    if (verificationHash !== matchProfile.password) {
        postNotification('login-msg', 'Invalid credential combination matches.');
        return;
    }

    // Active session assignment
    localStorage.setItem('session_user', matchProfile.username);
    document.getElementById('login-form').reset();
    showView('dashboard');
});

// 3. Clear Storage Sign Out Engine
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('session_user');
    showView('login');
});

// --- STATE LOADER ENGINE ---
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('session_user')) {
        showView('dashboard');
    } else {
        showView('login');
    }
});