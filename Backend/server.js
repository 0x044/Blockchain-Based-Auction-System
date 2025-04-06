const express = require("express");
const cors = require("cors");
const { addMedicine, startAuction, placeBid, endAuction } = require("./blockchainService");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/addMedicine", async (req, res) => {
    const { name, description, quantity, basePrice } = req.body;
    try {
        await addMedicine(name, description, quantity, basePrice);
        res.json({ success: true, message: "Medicine added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/startAuction", async (req, res) => {
    const { medicineId } = req.body;
    try {
        await startAuction(medicineId);
        res.json({ success: true, message: "Auction started successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/placeBid", async (req, res) => {
    const { medicineId, amount } = req.body;
    try {
        await placeBid(medicineId, amount);
        res.json({ success: true, message: "Bid placed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/endAuction", async (req, res) => {
    const { medicineId } = req.body;
    try {
        await endAuction(medicineId);
        res.json({ success: true, message: "Auction ended successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
