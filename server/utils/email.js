const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const CONFIG = require('../config');

module.exports = {
    sendNewPassword: (email, newPassword) => {
        return new Promise(async (resolve, reject) => {
            try {
                const transporter = new nodemailer.createTransport(CONFIG.email);
                resolve(await transporter.sendMail({
                    to: email,
                    subject: "[조이37] 고객님에게 임시 비밀번호가 발급되었습니다.",
                    html: await getEjs('new-password', {
                        newPassword
                    })
                }));
            } catch (e) {
                reject(e);
            }
        });
    }
};

const getEjs = (key, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            ejs.renderFile(path.join(__dirname, `../views/email/${key}.ejs`), data, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};
