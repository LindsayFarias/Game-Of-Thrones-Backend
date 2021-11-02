exports.up = function(knex) {
    return knex.schema.createTable('houses', table => {
        table.text('order');
        table.text('name');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('houses');
};
