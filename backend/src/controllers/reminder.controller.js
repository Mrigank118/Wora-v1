import User from '../models/user.model.js'; // Adjust path as needed
import { sendEmail } from '../services/mailService.js'; // Adjust path as needed

// Function to fetch user by user_id
const getUserById = async (user_id) => {
  try {
    return await User.findById(user_id); // Adjust as per your actual schema and database setup
  } catch (err) {
    throw new Error(`Error fetching user: ${err.message}`);
  }
};

// Controller function to send a personalized email
export const sendPersonalizedEmail = async (req, res) => {
  const { user_id } = req.body; // Assuming you're passing user_id through request body

  try {
    // Fetch user details based on user_id
    const user = await getUserById(user_id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Extract user details
    const { username, email } = user;

    // Construct personalized message
    const message = `Hey 👋 ${username}, thanks for testing out our app. The developers are Ritika and Mrigank.`;

    // Send personalized email
    const emailResult = await sendEmail(email, 'Welcome to Our App!', message);

    if (!emailResult.success) {
      console.error('Failed to send personalized email:', emailResult.message);
      return res.status(500).json({ success: false, message: 'Failed to send personalized email' });
    }

    // Respond with success message
    res.status(200).json({ success: true, message: 'Personalized email sent successfully' });
  } catch (err) {
    console.error('Error sending personalized email:', err.message);
    res.status(500).json({ success: false, message: 'Error sending personalized email' });
  }
};
