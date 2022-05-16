require('./config/db.connection.js');
const db = require('./models');

db.User.create(
      {
        name: "lamar",
        username: "scarknight13",
        password : 'password123',
        email: "lamar@yahoo.com",

      },
    (error, createdUsers) => {
      if (error) {
        console.log(error);
      }
      else{
        console.log("=== Seed Complete ===");
        console.log(createdUsers);
      }
    }
)