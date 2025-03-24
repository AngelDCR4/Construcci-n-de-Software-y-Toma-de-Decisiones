const bcrypt = require('bcryptjs');

async function generateHash(password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hash generado para '1234':", hashedPassword);
}

generateHash("Holaxd");