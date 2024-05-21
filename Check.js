
const twilio = require('twilio');

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = twilio(accountSid, authToken);





const sendVerificationCode = async (phoneNumber, verificationCode) => {
  try {
    const message = await client.messages.create({
      body: `Your verification code is: ${verificationCode}`,
      from: '+1 319 254 5370', 
      to: phoneNumber,
    });

    console.log('Verification code sent successfully. Message SID:', message.sid);
    return { success: true, message: 'Verification code sent successfully' };
  } catch (error) {
    console.error('Error sending verification code:', error);
    return { success: false, message: 'Error sending verification code' };
  }
};

// Example usage:
const phoneNumber = '+923361919913';
const verificationCode = () => Math.floor(Math.random() * 9000) + 1000;

sendVerificationCode(phoneNumber, verificationCode);

