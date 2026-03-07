let allData = [];

// --- Load Data ---
async function loadData() {
    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const json = await res.json();
        allData = json.data;
        renderCards(allData);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

