const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
const passwordLength = 6;

module.exports = {
    generatePassword: () => {
        let password = '';

        for (let i=0; i<passwordLength; i++) {
            password += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return password;
    }
};
