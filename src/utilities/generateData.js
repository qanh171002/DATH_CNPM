import { faker } from '@faker-js/faker';

export function createRandomProduct() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    quantity: faker.number.int(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price()
  };
}

export const products = faker.helpers.multiple(createRandomProduct, {
  count: 8
});
