const express = require("express");
const cors = require("cors");
const path = require("path");
const sendEmail = require("./sendEmail");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve static files from /public folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Home route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ API route for placing order
app.post("/place-order", async (req, res) => {
  const { name, email, phone, items, total } = req.body;

  console.log("Received Order:", { name, email, phone, items, total });

  try {
    await sendEmail({ name, email, phone, items, total });
    res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to place the order. Please try again." });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
