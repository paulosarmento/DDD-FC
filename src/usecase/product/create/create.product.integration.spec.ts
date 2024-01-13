import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("Should create a product a", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const { name, price } = await productCreateUseCase.execute({
      type: "a",
      name: "ProductA",
      price: 10,
    });
    const output = {
      name,
      price,
    };

    expect(output).toEqual({ name: "ProductA", price: 10 });
  });
  it("Should create a product b", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const input = {
      type: "b",
      name: "ProductB",
      price: 10,
    };

    const { name, price } = await productCreateUseCase.execute(input);
    const output = {
      name,
      price,
    };

    expect(output).toEqual({ name: input.name, price: input.price * 2 });
  });
  it("Should create a product c", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const input = {
      type: "c",
      name: "ProductC",
      price: 10,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Product type not supported"
    );
  });
});
