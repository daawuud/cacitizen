let travelPeriods = [];

function calculateInitialDates() {
    const prDateInput = document.getElementById("prDate").value;
    
    if (!prDateInput) {
        alert("Please select your PR Start Date.");
        return;
    }

    const prDate = new Date(prDateInput);
    const end5Years = new Date(prDate);
    end5Years.setFullYear(end5Years.getFullYear() + 5);

    const citizenshipDate = new Date(prDate);
    citizenshipDate.setDate(citizenshipDate.getDate() + 1095);

    const today = new Date();
    const daysPassed = Math.ceil((today - prDate) / (1000 * 60 * 60 * 24));

    // Calculate total days left to become a citizen (without traveled days)
    let totalDaysLeft = 1095 - daysPassed;
    if (totalDaysLeft < 0) {
        totalDaysLeft = 0;
    }

    document.getElementById("end5Years").textContent = end5Years.toDateString();
    document.getElementById("citizenshipDate").textContent = citizenshipDate.toDateString();
    document.getElementById("daysPassed").textContent = daysPassed;
    document.getElementById("totalDaysLeft").textContent = totalDaysLeft;

    document.getElementById("initialResults").classList.remove("hidden");
}

function generateTravelInputs() {
    const travelCount = parseInt(document.getElementById("travelCount").value);
    const travelInputsDiv = document.getElementById("travelInputs");
    travelInputsDiv.innerHTML = "";

    travelPeriods = [];

    for (let i = 0; i < travelCount; i++) {
        const travelDiv = document.createElement("div");
        travelDiv.classList.add("travel-entry");

        travelDiv.innerHTML = `
            <p>Travel ${i + 1}</p>
            <label>Start Date:</label>
            <input type="date" id="travelStart${i}">
            <label>End Date:</label>
            <input type="date" id="travelEnd${i}">
        `;

        travelInputsDiv.appendChild(travelDiv);
    }

    if (travelCount > 0) {
        document.getElementById("calculateFinalBtn").classList.remove("hidden");
    } else {
        document.getElementById("calculateFinalBtn").classList.add("hidden");
    }
}

function calculateFinalDays() {
    const prDate = new Date(document.getElementById("prDate").value);
    const today = new Date();
    let daysPassed = Math.ceil((today - prDate) / (1000 * 60 * 60 * 24));

    let totalTravelDays = 0;

    document.querySelectorAll(".travel-entry").forEach((entry, index) => {
        const travelStart = new Date(document.getElementById(`travelStart${index}`).value);
        const travelEnd = new Date(document.getElementById(`travelEnd${index}`).value);

        if (travelStart && travelEnd && travelEnd >= travelStart) {
            const daysOutside = Math.ceil((travelEnd - travelStart) / (1000 * 60 * 60 * 24)) + 1;
            totalTravelDays += daysOutside;
        }
    });

    let finalDaysRemaining = 1095 - (daysPassed - totalTravelDays);

    document.getElementById("totalTravelDays").textContent = totalTravelDays;
    document.getElementById("daysRemaining").textContent = finalDaysRemaining > 0 ? finalDaysRemaining : 0;
    document.getElementById("finalResult").classList.remove("hidden");
}
