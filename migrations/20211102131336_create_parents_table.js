
exports.up = function(knex) {
    return knex.schema.createTable('parents', table => {
        table.text('parent_1');
        table.text('parent_2');
        table.text('child');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('parents');
};
