exports.up = function(knex) {
    return knex.schema.createTable('house_character', table => {
        table.increments('id');
        table.text('house');
        table.text('coat of arms');
        table.location('location');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('house_character');
};
