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

// --- Rendering Card ---
function renderCards(issues) {
    const container = document.getElementById("issueContainer");
    container.innerHTML = "";

    issues.forEach(issue => {
        const border = issue.status === "open" 
            ? "border-t-4 border-green-500" 
            : "border-t-4 border-purple-500";
        const priorityColor = issue.priority === "high" 
            ? "bg-red-100 text-red-500" 
            : issue.priority === "medium" 
                ? "bg-orange-100 text-orange-500" 
                : "bg-gray-200 text-gray-500";
        const labels = issue.labels.map(label => {
            if (label === "bug") {
                return `<span class="px-3 py-1 border border-red-400 text-red-500 bg-red-50 rounded-full text-xs">BUG</span>`;
            }
            if (label === "help wanted") {
                return `<span class="px-3 py-1 border border-yellow-400 text-yellow-600 bg-yellow-50 rounded-full text-xs">HELP WANTED</span>`;
            }
            if (label === "enhancement") {
                return `<span class="px-3 py-1 border border-green-400 text-green-600 bg-green-50 rounded-full text-xs">ENHANCEMENT</span>`;
            }
            return "";
        }).join("");

        // Create Card Element
        const card = document.createElement("div");
        card.className = `bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition cursor-pointer ${border}`;

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-center mb-4">
                    <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <img src="${issue.status === "open" ? "assets/Open-Status.png" : "assets/Closed-Status.png"}" alt="status" class="w-6 h-6"/>
                    </div>
                    <span class="px-4 py-1 rounded-full text-sm font-semibold ${priorityColor}">
                        ${issue.priority.toUpperCase()}
                    </span>
                </div>

                <h2 class="text-lg font-bold text-gray-800 mb-3">
                    ${issue.title}
                </h2>

                <p class="text-gray-500 text-sm mb-4 line-clamp-3">
                    ${issue.description}
                </p>

                <div class="flex gap-2 flex-wrap mb-6">
                    ${labels}
                </div>
            </div>

            <div class="border-t pt-4 text-sm text-gray-500 flex justify-between">
                <span>#${issue.id} by ${issue.author}</span>
                <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
        `;

        card.onclick = function () {
            openModal(issue.id);
        };

        container.appendChild(card);
    });

    document.getElementById("issueCount").innerText = `${issues.length} Issues`;
}

// --- Filter Function ---
function filterIssues(type) {
    if (type === "all") {
        renderCards(allData);
        return;
    }

    const filtered = allData.filter(issue => issue.status === type);
    renderCards(filtered);
}


// Initialize Application
loadData();