const { sendEmail } = require('../services/email-service');
const { logger } = require('../services/logger-service');
const { EMAIL_SUBJECT, EMAIL_TEXT_DEFAULT } = require('../resources/constants');

const EMAIL_FROM = process.env.EMAIL_FROM;

const mailOptions = {
    from: EMAIL_FROM,
    to: '',
    subject: EMAIL_SUBJECT,
    text: ''
};

// Send an email confirmation.
const sendConfirmation = (order, orderChannel) => {
    let orderContent = JSON.parse(order.content.toString());
    mailOptions.text = `${EMAIL_TEXT_DEFAULT} Your order ${orderContent._id} amounting to ${orderContent.total} is confirmed and will be delivered shortly.`
    mailOptions.to = orderContent.email;
    sendEmail(mailOptions, (error, info) => {
        if (error) {
            logger.log('crit', `email - failed to send confirmation to ${orderContent.email} for order ${orderContent._id}.`)
        } else {
            logger.info(`email - confirmation sent to ${orderContent.email} for order ${orderContent._id}.`);
            orderChannel.ack(order); // acknowledged to queue - so the task will be removed form queue
        }
    })
}

module.exports = { sendConfirmation }