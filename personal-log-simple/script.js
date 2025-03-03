const logEntry = document.getElementById('logEntry');
const saveButton = document.getElementById('saveButton');
const logDisplay = document.getElementById('logDisplay');
const voiceButton = document.getElementById('voiceButton');
const logoutButton = document.getElementById('logoutButton');
const motivationalQuote = document.getElementById('motivationalQuote');

function displayLogs() {
    const username = localStorage.getItem('activeUser');
    if (!username) {
        window.location.href = 'login.html';
        return;
    }

    const logs = JSON.parse(localStorage.getItem(username + '_logs')) || [];
    logDisplay.innerHTML = logs.map(log => {
        const date = new Date(log.timestamp);
        const formattedDate = date.toLocaleString();
        return `<p><strong>${formattedDate}:</strong> ${log.entry}</p><hr>`; // Added timestamp and separator
    }).join('');
}

saveButton.addEventListener('click', () => {
    const entry = logEntry.value;
    if (entry) {
        const username = localStorage.getItem('activeUser');
        let logs = JSON.parse(localStorage.getItem(username + '_logs')) || [];
        logs.push({
            entry: entry,
            timestamp: Date.now() // Add timestamp
        });
        localStorage.setItem(username + '_logs', JSON.stringify(logs));
        logEntry.value = '';
        displayLogs();
    }
});

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('activeUser');
    window.location.href = 'login.html';
});

displayLogs();

// Voice Input
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    voiceButton.addEventListener('click', () => {
        recognition.start();
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        logEntry.value += transcript + ' ';
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };
} else {
    voiceButton.disabled = true;
    voiceButton.textContent = 'Voice input not supported';
}

function getMotivationalQuote() {
    const quotes = [
        "The needs of the many outweigh the needs of the few, or the one. - Spock",
        "Space, the final frontier. These are the voyages of the Starship Enterprise. - Captain Kirk",
        "Live long and prosper. - Spock",
        "Make it so. - Captain Picard",
        "Engage. - Captain Kirk",
        "Things are only impossible until they're not. - Captain Picard",
        "Logic is the beginning of wisdom, not the end. - Spock",
        "Resistance is futile. - Borg",
        "To boldly go where no one has gone before. - Captain Kirk"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

motivationalQuote.textContent = getMotivationalQuote();