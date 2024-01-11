import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Product", 5);
const input = {
  id: product.id,
};
const output = {
  id: product.id,
  name: "Product",
  price: 5,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};
describe("Unit Test find product use case", () => {
  it("Should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const result = await useCase.execute(input);
    expect(result).toEqual(output);
  });

  it("Should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const useCase = new FindProductUseCase(productRepository);
    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
