document.addEventListener('DOMContentLoaded', () => {
    const morningMessages = [
        "Good Morning",
        "Rise and Shine",
        "Top of the Morning",
        "Morning, Sunshine",
        "Wakey, Wakey",
        "Bright and Early",
    ];

    const afternoonMessages = [
        "Good Afternoon",
        "Hope you're having a great day",
        "Making Progress?",
        "Afternoon Hustle?",
        "Keep Going!",
        "Stay Focused!",
    ];

    const eveningMessages = [
        "Good Evening",
        "Time to Relax?",
        "Take a Break",
        "Have a Break",
        "Have a KitKat",
    ];

    const nightMessages = [
        "Good Night",
        "Hello, Night Owl",
        "Working Late?",
        "Late Night Coding?",
        "Midnight Ideas?",
        "Coding in the Dark?",
        "Last-time Debugging?",
        "Don't Forget to Sleep",
    ];

    const hour = new Date().getHours();
    let pool;
    if (hour >= 22 || hour < 5) {
        pool = nightMessages;
    } else if (hour >= 5 && hour < 12) {
        pool = morningMessages;
    } else if (hour >= 12 && hour < 18) {
        pool = afternoonMessages;
    } else {
        pool = eveningMessages;
    }

    const holaDiv = document.querySelector('.hola');
    if (holaDiv && pool.length) {
        const random = pool[Math.floor(Math.random() * pool.length)];
        holaDiv.textContent = random;
    }

    const searchInput = document.getElementById('perplexity-search');
    if (searchInput) {
        searchInput.autocomplete = 'off';
        searchInput.value = '';
        window.addEventListener('pageshow', (e) => {
            if (e.persisted) searchInput.value = '';
        });

        window.addEventListener('keydown', (e) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            if (e.key.toLowerCase() !== 't') return;
            const active = document.activeElement;
            const tag = active && active.tagName;
            const isEditable = active && (active.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT');
            if (isEditable) return;
            e.preventDefault();
            searchInput.focus();
            if (typeof searchInput.select === 'function') searchInput.select();
        });
    }

    const githubBtn = document.getElementById('github-btn');
    if (githubBtn) {
        githubBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = githubBtn.dataset && githubBtn.dataset.url
                ? githubBtn.dataset.url
                : 'https://github.com/WyliGr/hl-dashboard-frontpage';
            window.open(url, '_blank', 'noopener');
        });
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.cursor = card.style.cursor || 'pointer';

        card.addEventListener('click', (e) => {
            const url = card.dataset && card.dataset.url;
            if (url) {
                window.open(url, '_blank', 'noopener');
                return;
            }

            const titleEl = card.querySelector('h3') || card.querySelector('span') || card;
            const title = titleEl ? (titleEl.textContent || '').trim() : '';
            if (searchInput) {
                searchInput.value = title;
                searchInput.focus();
                if (typeof searchInput.select === 'function') searchInput.select();
            }

            card.classList.toggle('opacity-90');
        });
    });
});
