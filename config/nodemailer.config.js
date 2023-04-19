const nodemailer = require("nodemailer");

const user = process.env.USER_EMAIL;
const pass = process.env.USER_PASSWORD;

const transport = nodemailer.createTransport({
  service: "hotmail",
  name: "romantiko.ca",
  secure: true,
  auth: {
    user: user,
    pass: pass,
  },
});

// Email Veirfication
const sendConfirmationEmail = (name, email, id, confirmationCode) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/api/auth/verify/${id}/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

// Booking Verification
const sendBookingConfirmation = (
  customerName,
  customerEmail,
  startTime,
  endTime,
  service,
  barberName
) => {
  transport
    .sendMail({
      from: user,
      to: customerEmail,
      subject: "Romantiko Appointment Confirmation",
      html: `
          <h1>Dear ${customerName},</h1><br/>
          <h2>We are pleased to informed you that your booking is confirmed.</h2><br/>
          <div>
          <p>From: ${startTime}</p>
          <p>To: ${endTime}</p>
          <p>Type of Servce: ${service}</p>
          <p>Barber Name: ${barberName}</p>
          <p>Location: 513 Centre Ave E, Airdrie, AB T4B 1P9</p>
          </div><br/><br/>
          <p>Sincerely,</p>
          <p>romantiko.ca</p><br/>
        `,
    })
    .catch((err) => console.log(err));
};

module.exports = {
  sendConfirmationEmail,
  sendBookingConfirmation,
};
