
exports.up = function(knex) {
    return knex.schema.createTable('kill_table', table => {
        table.text('killer');
        table.text('killed');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('kill_table');
};
