const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "bob", department: "sales", password: bcrypt.hashSync("password", 14)},
        {username: "sarah", department: "marketing", password: bcrypt.hashSync("password", 14)},
        {username: "joe", department: "marketing", password: bcrypt.hashSync("password", 14)},
        {username: "alexandria", department: "sales", password: bcrypt.hashSync("password", 14)},
        {username: "last_employee", department: "finance", password: bcrypt.hashSync("password", 14)}
      ]);
    });
};
