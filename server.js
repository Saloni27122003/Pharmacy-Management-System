const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());


// ✅ Add Medicine
app.post("/add", (req, res) => {
    console.log("Received:", req.body); // DEBUG
    console.log("BODY:", req.body);

    const { name, price, quantity } = req.body;

    // ✅ STEP 4: Convert string → number
    const p = parseFloat(price);   // for price
    const q = parseInt(quantity);  // for quantity

    // ✅ Validation (VERY IMPORTANT)
    if (!name || isNaN(p) || isNaN(q)) {
        return res.json({ error: "Invalid input" });
    }

    const sql = "INSERT INTO medicines (name, price, quantity) VALUES (?, ?, ?)";

    db.query(sql, [name, p, q], (err, result) => {
        if (err) return res.json(err);

        res.json({ message: "Medicine Added Successfully" });
    });
});
// ✅ Get Medicines
app.get("/medicines", (req, res) => {
    db.query("SELECT * FROM medicines", (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});