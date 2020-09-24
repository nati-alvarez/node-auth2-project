exports.up = function(knex) {
    return knex.schema.createTable("users", table=>{
        table.increments();
        table.string("username").notNullable().unique();
        table.string("department").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users")
};
