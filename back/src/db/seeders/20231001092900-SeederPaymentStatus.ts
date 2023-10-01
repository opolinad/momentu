import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'paymentStatus',
      [
        {
          name: 'Pending',
        },
        {
          name: 'Accepted',
        },
        {
          name: 'Rejected',
        },
      ],
      {},
    );
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('paymentStatus', null, {});
  },
};
