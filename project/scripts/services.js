let allServices = [];

async function loadServices() {
    try {
        console.log("Loading services from JSON...");

        const response = await fetch('./data/services.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const services = await response.json();
        console.log("Loaded services:", services);
        return services;

    } catch (error) {
        console.error("Error loading services:", error);
        document.getElementById('servicesContainer').innerHTML = `
            <p class="error">Error loading services. Please refresh the page.</p>
        `;
        return [];
    }
}

function showServices(services) {
    const container = document.getElementById('servicesContainer');

    if (!services || services.length === 0) {
        container.innerHTML = '<p class="error">No services available.</p>';
        return;
    }

    container.innerHTML = services.map(service => `
        <div class="service-card" data-category="${service.category}">
            <img src="${service.image}" alt="${service.title}" loading="lazy" decoding="async" style="opacity:0; transition: opacity 2.5s ease;" onload="this.style.opacity=1;" onerror="this.src='images/default.webp';">
            <div class="service-content">
                <h3>${service.title}</h3>
                ${service.price ? `<p class="price">${service.price}</p>` : ""}
                <ul class="features">
                    ${service.features.map(feat => `<li>${feat}</li>`).join('')}
                </ul>
                <button class="learn-more" data-id="${service.id}">View Details</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', function () {
            const serviceId = parseInt(this.getAttribute('data-id'));
            openModal(serviceId);
        });
    });
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-filter');
            filterServices(category);
        });
    });
}

function filterServices(category) {
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function openModal(serviceId) {
    const service = allServices.find(s => s.id === serviceId);
    if (!service) return;

    document.getElementById('modalTitle').textContent = service.title;
    document.getElementById('modalDescription').textContent = service.description;

    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = service.features.map(feat => `<li>${feat}</li>`).join('');

    document.getElementById('serviceModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('serviceModal').style.display = 'none';
}

window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('serviceModal')) {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM loaded, starting...");
    allServices = await loadServices();
    showServices(allServices);
    setupFilters();

    document.querySelector('.close').addEventListener('click', closeModal);
});

