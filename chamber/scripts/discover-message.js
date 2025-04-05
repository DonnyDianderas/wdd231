document.addEventListener('DOMContentLoaded', function() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();
    const overlay = document.getElementById('welcome-overlay');
    const welcomeText = document.getElementById('welcome-text');
    const closeButton = document.getElementById('close-overlay');

    if (lastVisit) {
        const timeDifference = currentDate - lastVisit;
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24)); 
        
        if (daysDifference < 1) {
            welcomeText.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            welcomeText.textContent = `You last visited 1 day ago.`;
        } else {
            welcomeText.textContent = `You last visited ${daysDifference} days ago.`;
        }
    } else {
        welcomeText.textContent = "Welcome! Let us know if you have any questions.";
    }

    // Display message
    overlay.style.display = 'flex';

    
    closeButton.addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    // Save new visit
    localStorage.setItem('lastVisit', currentDate);
});
