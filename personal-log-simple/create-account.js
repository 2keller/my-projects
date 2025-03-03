const newUsernameInput = document.getElementById('newUsername');
const newPasswordInput = document.getElementById('newPassword');
const createAccountButton = document.getElementById('createAccountButton');

createAccountButton.addEventListener('click', () => {
    const newUsername = newUsernameInput.value;
    const newPassword = newPasswordInput.value;
    if (newUsername && newPassword) {
        localStorage.setItem(newUsername + '_password', newPassword);
        alert('Account created! Please login.');
        window.location.href = 'login.html';
    } else {
        alert('Please enter a username and password.');
    }
});