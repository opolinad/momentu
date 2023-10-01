import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'paymentMethod',
      [
        {
          name: 'Credit card',
        },
        {
          name: 'Paypal',
        },
        {
          name: 'Wire transfer',
        },
      ],
      {},
    );
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('paymentMethod', null, {});
  },
};
