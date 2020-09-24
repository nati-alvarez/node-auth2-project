exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "bob", department: "sales"},
        {username: "sarah", department: "marketing"},
        {username: "joe", department: "marketing"},
        {username: "alexandria", department: "sales"},
        {username: "last_employee", department: "finance"}
      ]);
    });
};
