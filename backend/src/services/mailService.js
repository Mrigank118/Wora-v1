import nodemailer from 'nodemailer';

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'companywora@gmail.com', // Your Gmail address
    pass: 'tkte zqvz caky pzbp', // Your Gmail app password or regular password
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Function to send email
export const sendEmail = async (recipient, subject, text) => {
  const mailOptions = {
    from: 'worapad.co', // Replace with your sending email address or name
    to: recipient, // Receiver's email address
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent at:', new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    console.log('Email sent: ' + info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: error.message };
  }
};
