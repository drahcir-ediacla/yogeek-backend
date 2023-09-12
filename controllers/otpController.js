const transporter = require('../config/email');
const db = require('../config/dbConfig');

// Helper function to generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP to the provided email
exports.sendOTP = (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  // Check if the email already exists in the database
  db.query('SELECT * FROM users WHERE email = ?', [email], (selectErr, selectResult) => {
    if (selectErr) {
      console.error(selectErr);
      return res.status(500).json({ message: 'Failed to send OTP' });
    }

    // If the email already exists, return an error response
    if (selectResult.length > 0) {
      return res.status(400).json({ message: 'Email already exists in the database' });
    }

    // If the email does not exist, store OTP in the database
    db.query('INSERT INTO users (email, otp) VALUES (?, ?)', [email, otp], (insertErr, insertResult) => {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).json({ message: 'Failed to send OTP' });
      }

      // Configure the email content
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for verification is: ${otp}`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to send OTP' });
        } else {
          console.log(`Email sent: ${info.response}`);
          res.status(200).json({ message: 'OTP sent successfully' });
        }
      });
    });
  });
};



// Verify OTP
exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  // Retrieve OTP from the database (You should implement proper retrieval)
  db.query('SELECT otp FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error verifying OTP' });
    }

    if (result.length === 0 || result[0].otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, delete it from the database (You should implement proper deletion)
    db.query('UPDATE users SET otp = NULL WHERE email = ?', [email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error verifying OTP' });
      }
      res.status(200).json({ message: 'OTP verified successfully' });
    });
  });
};
