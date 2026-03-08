let allData = [];
// Login Verification Function
function handleLogin() {
            const u = document.getElementById('username').value;
            const p = document.getElementById('password').value;

            if(u === 'admin' && p === 'admin123') {
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'main.html';
            } else {
                alert("Wrong username or password");
                document.getElementById('error').classList.remove('hidden');
            }
        }
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
        // Dynamic Border Class
        const border = issue.status === "open" 
            ? "border-t-4 border-green-500" 
            : "border-t-4 border-purple-500";

        // Dynamic Priority Styles
        const priorityColor = issue.priority === "high" 
            ? "bg-red-100 text-red-500" 
            : issue.priority === "medium" 
                ? "bg-orange-100 text-orange-500" 
                : "bg-gray-200 text-gray-500";

        // Labels Generation
        const labels = issue.labels.map(label => {
            if (label === "bug") {
                return `<span class="px-3 py-1 border border-red-400 text-red-500 bg-red-50 rounded-full text-xs"><i class="fa-solid fa-bug"></i> BUG</span>`;
            }
            if (label === "help wanted") {
                return `<span class="px-3 py-1 border border-yellow-400 text-yellow-600 bg-yellow-50 rounded-full text-xs"><i class="fa-solid fa-life-ring"></i> HELP WANTED</span>`;
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



//FilterIssues Function
function filterIssues(type, btn) {

    const buttons = document.querySelectorAll(".tab-btn");

    buttons.forEach(b => {
        b.classList.remove("bg-[#5D00FF]", "text-white", "shadow-md");
        b.classList.add("border", "border-gray-300", "text-gray-500");
    });

    btn.classList.add("bg-[#5D00FF]", "text-white", "shadow-md");
    btn.classList.remove("border", "border-gray-300", "text-gray-500");

    if (type === "all") {
        renderCards(allData);
        return;
    }

    const filtered = allData.filter(issue => issue.status === type);
    renderCards(filtered);
}
// --- Search Function ---
async function handleSearch() {
    const text = document.getElementById("searchInput").value;

    if (!text) {
        renderCards(allData);
        return;
    }

    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
        const json = await res.json();
        renderCards(json.data);
    } catch (error) {
        console.error("Error searching issues:", error);
    }
}

// --- Modal Function ---
async function openModal(id) {
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const json = await res.json();
        const issue = json.data;

        const modalContent = document.getElementById("modalContent");

        modalContent.innerHTML = `
            <h2 class="text-2xl font-bold mb-2">
                ${issue.title}
            </h2>

            <div class="text-sm text-gray-500 mb-4">
                Opened by ${issue.author} • ${new Date(issue.createdAt).toLocaleDateString()}
            </div>

            <p class="text-gray-600 mb-6">
                ${issue.description}
            </p>

            <div class="bg-gray-100 p-4 rounded-lg flex justify-between">
                <div>
                    <p class="text-sm text-gray-500">Assignee</p>
                    <p class="font-semibold">${issue.assignee || "Unassigned"}</p>
                </div>

                <div>
                    <p class="text-sm text-gray-500">Priority</p>
                    <span class="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                        ${issue.priority}
                    </span>
                </div>
            </div>
        `;

        const modal = document.getElementById("issueModal");
        modal.showModal();
    } catch (error) {
        console.error("Error opening modal:", error);
    }
}
// Loader spinner 
async function loadData() {

    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");

    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const json = await res.json();
        allData = json.data;
        renderCards(allData);
    } catch (error) {
        console.error("Error loading data:", error);
    }

    loader.classList.add("hidden");
}
//Search loader function
async function handleSearch() {

    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");

    const text = document.getElementById("searchInput").value;

    if (!text) {
        renderCards(allData);
        loader.classList.add("hidden");
        return;
    }

    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
        const json = await res.json();
        renderCards(json.data);
    } catch (error) {
        console.error("Error searching issues:", error);
    }

    loader.classList.add("hidden");
}
// Initialize Application
loadData();