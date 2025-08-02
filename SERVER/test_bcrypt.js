const bcrypt = require('bcryptjs');

const enteredPassword = '123456'; // what you type in login form
const storedHash = '$2a$10$a63cGJowUeGZZ9vg4bsMQOx.q3iZC9lOQ4KwGCeTVpuSeN0nFyEe6'; // from DB

const isMatch = bcrypt.compareSync(enteredPassword, storedHash);

console.log('✅ Match?', isMatch);
