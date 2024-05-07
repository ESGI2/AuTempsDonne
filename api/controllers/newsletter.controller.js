const UserRepository = require("../repositories/user.repository");
const nodemailer = require("nodemailer");

class NewsletterController {
    static async sendmail(req, res){
        const { title, message } = req.body;

        try {
            const subscribers = await UserRepository.getNewsletterSubscribers();


            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'atdpa2024@gmail.com',
                    pass: 'lgco smip aept juwu'
                }
            });

            const mailOptions = {
                from: 'atdpa2024@gmail.com',
                subject: title,
                text: message
            };

            for (const subscriber of subscribers) {
                mailOptions.to = subscriber.email;
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                    } else {
                        console.log("Email sent:", info.response);
                    }
                });
            }

            res.status(200).json({ message: "Email sent to newsletter subscribers" });
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ error: "Error sending email to newsletter subscribers" });
        }
    }
}

module.exports = NewsletterController;
