document.addEventListener("DOMContentLoaded", async () => {
    const directory = document.querySelector("#directory");
    const gridButton = document.querySelector("#grid");
    const listButton = document.querySelector("#list");

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error loading members:", error);
        }
    }

    function displayMembers(members) {
        directory.innerHTML = "";
        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");
            
            card.innerHTML = `
                <img src="${member.image}" alt="Corporate logo" loading="lazy">
                <h3>${member.name}</h3>
                <p class="hide-on-small"><strong>Address: </strong>${member.address}</p>
                <p><strong>Phone: </strong>${member.phone}</p>
                <p class="hide-on-small"><strong>Founded: </strong> ${member.founded}</p>
                <p><a href="${member.website}" target="_blank">Details</a></p>
            `;
            directory.appendChild(card);
        });
    }

    gridButton.addEventListener("click", () => {
        directory.classList.add("grid");
        directory.classList.remove("list");
    });

    listButton.addEventListener("click", () => {
        directory.classList.add("list");
        directory.classList.remove("grid");
    });

    fetchMembers();
});
