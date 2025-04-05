const gridContainer = document.querySelector(".card-grid");

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalLink = document.getElementById("modal-link");

fetch("data/places.json")
  .then((response) => response.json())
  .then((places) => {
    places.forEach((place, index) => {
      const card = document.createElement("section");
      card.classList.add("place-card");
      card.style.gridArea = `card${index + 1}`;

      card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
          <img src="${place.image}" alt="${place.name}" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn-more-btn">Learn more</button>
      `;

      // Button "Learn more"
      const learnMoreButton = card.querySelector(".learn-more-btn");

      learnMoreButton.addEventListener("click", () => {
        modal.style.display = "flex";  
        modalTitle.textContent = place.name;
        modalDescription.textContent = place.detailedDescription;
        modalLink.href = place.url;
        modalLink.textContent = "Visit website";
      });

      gridContainer.appendChild(card);
    });
  })
  .catch((err) => console.error("Error loading JSON:", err));

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";  
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

  
