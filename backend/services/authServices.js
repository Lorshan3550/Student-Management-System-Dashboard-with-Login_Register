const bcrypt = require('bcryptjs');


async function hashPassword(password) {
    return await bcrypt.hash(password, 10); // Use 10 rounds of salting
}

async function comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePasswords
};