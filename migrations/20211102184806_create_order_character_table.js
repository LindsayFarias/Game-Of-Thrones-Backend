exports.up = function(knex) {
    return knex.schema.createTable('order_character', table => {
        table.text('character');
        table.text('order');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('order_character');
};
