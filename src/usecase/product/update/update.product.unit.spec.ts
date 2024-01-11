import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product", 5);
const productB = ProductFactory.create("b", "Product", 10);
const input = {
  id: product.id,
  name: product.name,
  price: product.price,
};
const inputB = {
  id: productB.id,
  name: productB.name,
  price: productB.price,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    update: jest.fn(),
  };
};
const MockRepositoryB = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(productB)),
    findAll: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test form product update use case", () => {
  it("Should update a product a", async () => {
    const productRepository = MockRepository();
    const productUpdateRepository = new UpdateProductUseCase(productRepository);
    const output = await productUpdateRepository.execute(input);
    expect(output).toEqual(input);
  });
  it("Should update a product b", async () => {
    const productRepository = MockRepositoryB();
    const productUpdateRepository = new UpdateProductUseCase(productRepository);
    const output = await productUpdateRepository.execute(inputB);
    expect(output).toEqual({
      id: inputB.id,
      name: inputB.name,
      price: inputB.price * 2,
    });
  });
});
