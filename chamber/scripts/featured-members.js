document.addEventListener("DOMContentLoaded", async () => {
    const featuredContainer = document.querySelector("#featured-members");

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const members = await response.json();
            displayFeaturedMembers(members);
        } catch (error) {
            console.error("Error loading members:", error);
        }
    }

    function displayFeaturedMembers(members) {
        featuredContainer.innerHTML = "";

        // Filter just GOLD and SILVER
        const eligibleMembers = members.filter(member =>
            member.membership === "GOLD" || member.membership === "SILVER"
        );

        // Randomly select 2 or 3 members
        const selectedMembers = [];
        const count = Math.floor(Math.random() * 2) + 2; 

        while (selectedMembers.length < count && eligibleMembers.length > 0) {
            const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
            selectedMembers.push(eligibleMembers.splice(randomIndex, 1)[0]);
        }

        // Show the selected member
        selectedMembers.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <p><strong>Industry:</strong> ${member.industry}</p>
                <p><strong>Membership:</strong> ${member.membership}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            featuredContainer.appendChild(card);
        });
    }

    fetchMembers();
});
