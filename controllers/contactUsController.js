const transPorter = require('../config/emailConfig');

const sendSupporRequest = async (req, res) => {
    const { help_with, message, customer_email, attachments } = req.body;

    // Debugging Step: Log request payload
    console.log('Incoming support request:', req.body);

    // Validate payload fields
    if (!help_with || !message || !customer_email) {
        return res.status(400).json({
            message: 'Missing required fields: help_with, message, or customer_email'
        });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `Support Request: Help with "${help_with}"`,
            text: `What do you need help with?: ${help_with}\n\nWhat’s your question, comment, or issue?: ${message}\n\nWhat is your email address?: ${customer_email}`,
            html: `
                <p><strong>What do you need help with?</strong><br/>${help_with}</p>
                <p><strong>What is your question, comment, or issue?</strong><br/>${message}</p>
                <p><strong>What is your email address?</strong><br/>${customer_email}</p>
            `,
            attachments: [
                ...(attachments || []).map((file, index) => ({
                    filename: file.filename || `attachment-${index + 1}`, // Default name if none provided
                    path: file.path, // Cloudinary or other URL path
                }))
            ]
        };

        // Debugging Step: Log email options
        console.log('Sending email with options:', mailOptions);

        // Send email
        await transPorter.sendMail(mailOptions);

        // Respond with success
        res.status(201).json({ message: 'Support request sent successfully' });

    } catch (error) {
        console.error('Error sending request:', error);

        // Handle common email errors
        let errorMessage = 'Error sending request';
        if (error.responseCode === 401) {
            errorMessage = 'Unauthorized: Check email service credentials';
        } else if (error.responseCode === 550) {
            errorMessage = 'Email rejected: Verify email addresses';
        }

        res.status(500).json({ message: errorMessage, error: error.message });
    }
};


const reportListing = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Authentication is required to report a listing.' })
    }

    const userId = req.user.id;

    const { situation, message, product_id, product_name, sender_display_name, sender_profile_link } = req.body;

    // Debugging Step: Log request payload
    console.log('Incoming report listing:', req.body);

    // Validate payload fields
    if (!situation || !message || !product_id || !product_name || !sender_display_name || !sender_profile_link) {
        return res.status(400).json({
            message: 'Missing required fields: situation, message, or product_id'
        });
    }

    try {

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `Report Listing: "${product_name}"`,
            text: `
            Describe the situation to us.: ${situation}\n\n
            Help us understand by providing clarity on the issue.: ${message}\n\n
            Product ID: ${product_id}\n\n
            Product Name: ${product_name}\n\n
            Sender ID: ${userId}\n\n
            Sender Profile Name: ${sender_display_name}\n\n
            Sender Profile Link: ${sender_profile_link}\n\n
            `,
            html: `
                <p><strong>Describe the situation to us.</strong><br/>${situation}</p>
                <p><strong>Help us understand by providing clarity on the issue.</strong><br/>${message}</p>
                <p><strong>Product ID</strong><br/>${product_id}</p>
                <p><strong>Product Name</strong><br/>${product_name}</p>
                <p><strong>Sender ID</strong><br/>${userId}</p>
                <p><strong>Sender Profile Name</strong><br/><a href=${`${sender_profile_link}`}>${sender_display_name}</a></p>
            `
        };

        // Debugging Step: Log email options
        console.log('Sending email with options:', mailOptions);

        // Send email
        await transPorter.sendMail(mailOptions);

        // Respond with success
        res.status(201).json({ message: 'Report listing sent successfully' });

    } catch (error) {
        console.error('Error sending request:', error);

        // Handle common email errors
        let errorMessage = 'Error sending request';
        if (error.responseCode === 401) {
            errorMessage = 'Unauthorized: Check email service credentials';
        } else if (error.responseCode === 550) {
            errorMessage = 'Email rejected: Verify email addresses';
        }

        res.status(500).json({ message: errorMessage, error: error.message });
    }
}

module.exports = { sendSupporRequest, reportListing };
