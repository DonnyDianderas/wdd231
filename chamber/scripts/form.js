document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    
    const membershipDescriptions = {
        np: "NP Membership (Non-Profit Organizations): For non-profits committed to Lima's socioeconomic development. Cost: Free (document validation required). Benefits: Access to networking events, training workshops, and newsletters with funding opportunities.",
        
        bronze: "Bronze Membership: Ideal for startups and small businesses seeking visibility. Cost: S/ 800 per year (≈ US$ 210). Benefits: Participation in trade fairs, 20% discount on workshops/certifications, and listing in the Chamber's digital directory.",
        
        silver: "Silver Membership: For growing businesses needing greater exposure. Cost: S/ 2,500/year (≈ US$ 650). Benefits (includes Bronze +): Priority event access, Chamber platform promotion, and 1 annual advisory session on trade/legal matters.",
        
        gold: "Gold Membership: Premium tier for corporate leadership. Cost: S/ 8,000/year (≈ US$ 2,100). Benefits (includes Silver +): VIP access to international events, sponsorship opportunities, and private meetings with decision-makers."
    };

    window.openModal = function(level) {
        modalText.innerText = membershipDescriptions[level];
        modal.style.display = "flex";
    };

    window.closeModal = function() {
        modal.style.display = "none";
    };

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});
