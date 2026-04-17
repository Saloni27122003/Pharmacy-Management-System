// ✅ Check if JS is loaded
console.log("✅ script.js loaded");

// Store skills (not needed here but kept for future upgrade)
let skills = [];

// ----------------------
// ✅ ADD MEDICINE
// ----------------------
async function addMedicine() {
    console.log("🟢 Add button clicked");

    // Get values from input fields
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;

    console.log("📤 Sending:", name, price, quantity);

    // Validation
    if (!name || !price || !quantity) {
        alert("❌ Please fill all fields");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                price: price,
                quantity: quantity
            })
        });

        const data = await res.json();

        console.log("📥 Response:", data);

        if (data.error) {
            alert("❌ " + data.error);
        } else {
            alert("✅ Medicine Added Successfully");

            // Clear inputs after success
            document.getElementById("name").value = "";
            document.getElementById("price").value = "";
            document.getElementById("quantity").value = "";

            loadData(); // refresh list
        }

    } catch (err) {
        console.error("❌ Fetch error:", err);
        alert("Server not responding");
    }
}

// ----------------------
// ✅ LOAD MEDICINES
// ----------------------
async function loadData() {
    console.log("📥 Loading medicines...");

    try {
        const res = await fetch("http://localhost:5000/medicines");
        const data = await res.json();

        console.log("📦 Data:", data);

        const list = document.getElementById("list");
        list.innerHTML = "";

        if (data.length === 0) {
            list.innerHTML = "<p>No medicines found</p>";
            return;
        }

        data.forEach(m => {
            const div = document.createElement("div");
            div.className = "card";

            div.innerHTML = `
    <h3>\u{1F48A} ${m.name}</h3>   <!-- 💊 -->
    <p>\u{1F4B0} Price: ₹${m.price}</p> <!-- 💰 -->
    <p>\u{1F4E6} Quantity: ${m.quantity}</p> <!-- 📦 -->
`;

            list.appendChild(div);
        });

    } catch (err) {
        console.error("❌ Load error:", err);
    }
}

// ----------------------
// ✅ AUTO LOAD ON START
// ----------------------
window.onload = loadData;