exports.up = function(knex) {
    return knex.schema.createTable('house_character', table => {
        table.text('name');
        table.text('house');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('house_character');
};
