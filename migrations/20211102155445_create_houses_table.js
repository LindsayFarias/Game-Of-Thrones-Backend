exports.up = function(knex) {
    return knex.schema.createTable('houses', table => {
        table.increments('id');
        table.text('name');
        table.text('image');
        table.text('location');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('houses');
};
