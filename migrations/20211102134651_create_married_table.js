exports.up = function(knex) {
    return knex.schema.createTable('marriage_table', table => {
        table.text('spouse_1');
        table.text('spouse_2');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('marriage_table');
};
