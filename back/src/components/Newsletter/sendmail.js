const ky = require("ky");
const nodemailer = require('nodemailer');

const getAllSubscribers = () => {
    return ky.get("http://localhost:3000/user/newsletter-subscribers", {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            console.error("Erreur lors de la récupération des abonnés à la newsletter.");
            return [];
        } else {
            return response.json();
        }
    }).then(data => data.emails || []);
};

async function sendMail(title, message, recipient) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: "atdpa2024@gmail.com",
            pass: "lgco smip aept juwu"
        }
    });

    const mailOptions = {
        from: 'votre_adresse_email@gmail.com',
        to: recipient,
        subject: title,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(`Erreur lors de l'envoi de l'e-mail à ${recipient}:`, error);
    }
}

getAllSubscribers()
    .then(emails => {
        emails.forEach(email => {
            sendMail("Votre newsletter hebdomadaire", "Voici votre newsletter hebdomadaire!", email);
        });
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des abonnés à la newsletter:", error);
    });
