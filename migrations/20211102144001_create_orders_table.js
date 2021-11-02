exports.up = function(knex) {
    return knex.schema.createTable('orders', table => {
        table.increments('id');
        table.text('name');
        table.text('image');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders');
};

