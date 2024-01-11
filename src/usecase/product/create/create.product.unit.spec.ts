import CreateProductUseCase from "./create.product.usecase";

const inputA = {
  type: "a",
  name: "Product",
  price: 10,
};
const inputB = {
  type: "b",
  name: "ProductB",
  price: 20,
};
const inputC = {
  type: "c",
  name: "ProductB",
  price: 30,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};
describe("Unit test create product use case", () => {
  it("Should create a product a", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const { name, price } = await productCreateUseCase.execute(inputA);
    const output = {
      name,
      price,
    };

    expect(output).toEqual({
      name: inputA.name,
      price: inputA.price,
    });
  });
  it("Should create a product b", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const { name, price } = await productCreateUseCase.execute(inputB);
    const output = {
      name,
      price,
    };

    expect(output).toEqual({
      name: inputB.name,
      price: inputB.price * 2,
    });
  });
  it("Should create a product c", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(productCreateUseCase.execute(inputC)).rejects.toThrow(
      "Product type not supported"
    );
  });
});
