import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'role',
      [
        {
          name: 'Admin',
        },
        {
          name: 'User',
        },
      ],
      {},
    );
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('role', null, {});
  },
};
