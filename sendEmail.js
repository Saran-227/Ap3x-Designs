const nodemailer = require("nodemailer");

// Configure Nodemailer with Gmail credentials
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ssaranjeet227@gmail.com", // Your Gmail
        pass: "hfom omva murq xmzy", // App Password (DO NOT use your actual password)
    },
});

// Function to send an email with order details
async function sendEmail(orderDetails) {
    const { name, email, phone, items, total } = orderDetails; // ✅ Added name

    // 🌟 Plain-text email
    const textBody = `
🛒 NEW ORDER RECEIVED! 🎉

👤 Customer Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}

=========================================
ORDER DETAILS:
-----------------------------------------
${items.map(item => `
🔹 Product: ${item.name}
💰 Price: ₹${item.price}
📏 Size: ${item.size ? item.size : "N/A"}
📦 Quantity: ${item.quantity}
-----------------------------------------
`).join("")}

💵 TOTAL AMOUNT: ₹${total}
📅 Order Date: ${new Date().toLocaleString()}

✅ Thank you for shopping with us! 🎉
`;

    // 🌟 HTML Email
    const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #007bff;">🛍️ New Order Confirmation</h2>
        <p><strong>👤 Customer Name:</strong> ${name}</p>
        <p><strong>📧 Email:</strong> ${email}</p>
        <p><strong>📞 Phone:</strong> ${phone}</p>

        <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; text-align: left;">
            <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px;">Product</th>
                <th style="padding: 10px;">Price</th>
                <th style="padding: 10px;">Size</th>
                <th style="padding: 10px;">Quantity</th>
            </tr>
            ${items.map(item => `
            <tr>
                <td style="padding: 8px;">${item.name}</td>
                <td style="padding: 8px;">₹${item.price}</td>
                <td style="padding: 8px;">${item.size ? item.size : "N/A"}</td>
                <td style="padding: 8px;">${item.quantity}</td>
            </tr>
            `).join("")}
        </table>

        <h3>💵 Total Amount: ₹${total}</h3>
        <p><strong>📅 Order Date:</strong> ${new Date().toLocaleString()}</p>

        <p style="color: green; font-weight: bold;">✅ Thank you for your order! We appreciate your business.</p>
    </div>
    `;

    // Email Options
    const mailOptions = {
        from: "ssaranjeet227@gmail.com",
        to: "ssaranjeet227@gmail.com",
        subject: "🛍️ Order Confirmation - Your Order Details",
        text: textBody, // Plain text version for compatibility
        html: htmlBody, // HTML version for styling
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error; // Re-throw the error
    }
}

// Export function
module.exports = sendEmail;
