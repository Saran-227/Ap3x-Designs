const express = require("express");
const cors = require("cors"); // Import CORS middleware
const path = require("path"); // ✅ Added path module
const sendEmail = require("./sendEmail"); // Import the sendEmail function

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Updated /place-order endpoint to include user info
app.post("/place-order", async (req, res) => {
    const { name, email, phone, items, total } = req.body; // ✅ Added name

    console.log("Received Order:", { name, email, phone, items, total });

    try {
        // Construct message for the email
        const orderDetails = {
            name, // ✅ Added name
            email,
            phone,
            items,
            total,
        };

        await sendEmail(orderDetails);

        res.status(200).json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to place the order. Please try again." });
    }
});

app.get("/", (req, res) => {
    res.send("🚀 Your backend is live and working!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
