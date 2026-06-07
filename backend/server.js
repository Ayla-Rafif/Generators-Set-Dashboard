const express = require("express");
const cors = require("cors");
const path = require("path");
const xlsx = require("xlsx");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Baca file Excel
const filePath = path.join(__dirname, "data", "genset_dummy_realistic.xlsx");
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { defval: "" });

// API semua data
app.get("/api/data", (req, res) => {
  res.json(data);
});

// API data terbaru
app.get("/api/latest", (req, res) => {
  res.json(data[data.length - 1]);
});

// Root -> dashboard
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});