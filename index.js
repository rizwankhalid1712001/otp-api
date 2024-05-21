const express = require("express");
const cors = require("cors");
require("dotenv").config();
const twilio = require('twilio');

const app = express();

app.use(express.json());
app.use(cors());

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = twilio(accountSid, authToken);

const sendVerificationCode = async (phoneNumber, verificationCode) => {
  try {
    const message = await client.messages.create({
      body: `Your verification code is: ${verificationCode}`,
      from: "+1 319 254 5370",
      to: phoneNumber,
    });

    console.log(
      "Verification code sent successfully. Message SID:",
      message.sid
    );
    return true;
  } catch (error) {
    console.error("Error sending verification code:", error);
    return false;
  }
};

app.post("/send-verification", (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const verificationCode = Math.floor(Math.random() * 9000) + 1000;
  if(sendVerificationCode(phoneNumber, verificationCode)) return res.status(200).json({ success: true, otp: verificationCode,  message: 'Verification code sent successfully' })
  else res.status(400).json({ success: true, message: 'Error sending Verification code' })

});

app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
