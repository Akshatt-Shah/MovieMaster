import nodemailer from 'nodemailer'
import randomstring from 'randomstring'
 
// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'mydummyemail145@gmail.com',
        pass: 'cgsxciyxccidjojl',
    },
})
// const transporter = nodemailer.createTransport({
//   host: 'Gmail',
//   port: 587,
//   auth: {
//       user: 'mydummyemail145@gmail.com',
//       pass: 'cgsxciyxccidjojl'
//   }
// });
 
// Function to send OTP to email
export async function sendOTP(email: string) {
    // Generate a random OTP
    const otp = randomstring.generate({
        length: 6,
        charset: 'numeric',
    })
 
    // Email body
    const mailOptions = {
        from: `Akshat Appa akshatappa5101@gmail.com`, // Sender address
        to: email, // Recipient address
        subject: 'Your OTP for Verification', // Subject line
        text: `Your OTP is: ${otp}`, // Plain text body
        html: `<p>Your OTP is: <b>${otp}</b></p>`, // HTML body (optional)
    }
 
    try {
        // Send the email
        const info = await transporter.sendMail(mailOptions)
        // console.log('Email sent:', info);
        return otp // Return the OTP for verification
    } catch (error) {
        console.error('Error sending email:', error)
        throw new Error('Failed to send OTP')
    }
}
 
// Example usage
// const email = 'anant.m@shaligraminfotech.com' // Replace with recipient's email address
// sendOTP(email)
//     .then((otp) => {
//         console.log('OTP sent successfully:')
//     })
//     .catch((err) => {
//         console.error('Failed to send OTP:', err.message)
//     })