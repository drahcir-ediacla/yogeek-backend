
const db = require('../config/dbConfig');
const userModel = require('../models/userModels')

// Fetch all users
const getUsers = (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Error fetching users' });
    } else {
      res.status(200).json(results);
    }
  });
};



const updateUser = async (req, res) => {
  if (req.isAuthenticated()) {
    // The user is authenticated, so you can access req.user to get the current user

    // Log user information for debugging
    console.log('Authenticated user:', req.user);
    console.log('User ID from session:', req.user.id);

    try {
      // You can access the updated user data from req.body
      const updatedUserData = req.body;

      // Find the user by their ID (assuming you have an 'id' field in your table)
      const user = await userModel.findByPk(req.user.id); // Use findById here

      if (!user) {
        // User not found
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Update the user's profile data
      await user.update({
        display_name: updatedUserData.display_name,
        email: updatedUserData.email,
        // Add more fields here as needed
      });

      // Send a success response with the updated user data
      res.status(200).json({ success: true, user: user.toJSON() });
    } catch (err) {
      // Handle any errors (e.g., validation errors)
      console.error(err);
      res.status(500).json({ success: false, message: 'Error updating profile' });
    }
  } else {
    // If not authenticated, send an error response
    console.log('User not authenticated');
    res.status(401).json({ success: false, message: 'User not authenticated' });
  }
}

module.exports = { getUsers, updateUser };