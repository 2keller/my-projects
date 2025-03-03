const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const motivationalQuote = document.getElementById('motivationalQuote');

loginButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (localStorage.getItem(username + '_password') === password) {
        localStorage.setItem('activeUser', username);
        window.location.href = 'index.html';
    } else {
        alert('Invalid credentials');
    }
});

function getMotivationalQuote() {
    const quotes = [
        "The needs of the many outweigh the needs of the few, or the one. - Spock",
        "Space, the final frontier. These are the voyages of the Starship Enterprise. - Captain Kirk",
        "Live long and prosper. - Spock",
        "Make it so. - Captain Picard",
        "Engage. - Captain Kirk",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

motivationalQuote.textContent = getMotivationalQuote();