import User from '../models/user.model.js'; // Adjust path as needed
import { sendEmail } from '../services/mailService.js'; // Adjust path as needed

// Function to fetch user by user_id
const getUserById = async (user_id) => {
  try {
    console.log(`Fetching user with ID: ${user_id}`); // Debugging statement
    const user = await User.findById(user_id); // Adjust as per your actual schema and database setup
    console.log(`User fetched: ${user}`); // Debugging statement
    return user;
  } catch (err) {
    console.error(`Error fetching user: ${err.message}`); // Debugging statement
    throw new Error(`Error fetching user: ${err.message}`);
  }
};

// Controller function to send a personalized email
export const sendPersonalizedEmail = async (req, res) => {
  const { user_id } = req.body; // Assuming you're passing user_id through request body
  console.log(`Received request to send personalized email to user_id: ${user_id}`); // Debugging statement

  try {
    // Fetch user details based on user_id
    const user = await getUserById(user_id);

    if (!user) {
      console.log(`User not found for ID: ${user_id}`); // Debugging statement
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Extract user details
    const { username, email } = user;
    console.log(`User details - Username: ${username}, Email: ${email}`); // Debugging statement

    // Construct personalized message
    const message = `Hey 👋 ${username}, thanks for testing out our app .
     Wora - write once , run anywhere-is an AI generated content adaptation app that modifies the given content according to the platform you require it for.
     We hope you had fun using our app!
     Developed by Ritika and Mrigank.
    `;
    console.log(`Personalized message constructed: ${message}`); // Debugging statement

    // Send personalized email
    const emailResult = await sendEmail(email, 'Welcome to Our App!', message);

    if (!emailResult.success) {
      console.error('Failed to send personalized email:', emailResult.message); // Debugging statement
      return res.status(500).json({ success: false, message: 'Failed to send personalized email' });
    }

    console.log('Personalized email sent successfully'); // Debugging statement

    // Respond with success message
    res.status(200).json({ success: true, message: 'Personalized email sent successfully' });
  } catch (err) {
    console.error('Error sending personalized email:', err.message); // Debugging statement
    res.status(500).json({ success: false, message: 'Error sending personalized email' });
  }
};
