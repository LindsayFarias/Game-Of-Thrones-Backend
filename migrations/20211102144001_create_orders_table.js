exports.up = function(knex) {
    return knex.schema.createTable('orders', table => {
        table.increments('id');
        table.text('name');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders');
};

