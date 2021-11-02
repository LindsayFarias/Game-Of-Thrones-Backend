exports.up = function(knex) {
    return knex.schema.createTable('orders_table', table => {
        table.text('order');
        table.text('name');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders_table');
};

