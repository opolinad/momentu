import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@mail.com',
          password: bcrypt.hashSync(
            'password',
            Number(process.env.BCRYPT_SALT_ROUNDS),
          ),
          roleId: 1,
          isActive: true,
        },
      ],
      {},
    );
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('user', null, {});
  },
};
