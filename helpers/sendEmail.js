const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY_SECOND } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY_SECOND);

const sendEmail = async (data) => {
  const email = { from: "ruslantendora@meta.ua", ...data };

  await sgMail.send(email);

  return true;
};

module.exports = sendEmail;
