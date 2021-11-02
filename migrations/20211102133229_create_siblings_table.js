
exports.up = function(knex) {
    return knex.schema.createTable('siblings_table', table => {
        table.text('sibling_1');
        table.text('sibling_2');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('siblings_table');
};