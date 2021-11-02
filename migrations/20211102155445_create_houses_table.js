exports.up = function(knex) {
    return knex.schema.createTable('houses', table => {
        table.increments('id');
        table.text('name');
        table.text('coat of arms');
        table.text('location');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('houses');
};
