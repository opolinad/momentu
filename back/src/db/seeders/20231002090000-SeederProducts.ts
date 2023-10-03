import { QueryInterface } from 'sequelize';

interface productData {
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
}

module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const products: productData[] = await response.json();

      const productData = products.map((product) => ({
        title: product.title,
        description: product.description,
        category: product.category,
        imageUrl: product.image,
        price: product.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert('product', productData, {});
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error seeding product data:', error);
    }
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('product', null, {});
  },
};
