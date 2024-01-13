import { Sequelize } from "sequelize-typescript";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test for listing product use case", () => {
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
  it("Should list all product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product", 5);
    const productA = ProductFactory.create("a", "Product A", 2);
    const productB = ProductFactory.create("b", "Product B", 4);
    await productRepository.create(product);
    await productRepository.create(productA);
    await productRepository.create(productB);

    const useCase = new ListProductUseCase(productRepository);
    const output = await useCase.execute({});

    expect(output.products.length).toBe(3);
    expect(output.products[0].id).toBe(product.id);
    expect(output.products[0].name).toBe(product.name);
    expect(output.products[0].price).toBe(product.price);
    expect(output.products[1].id).toBe(productA.id);
    expect(output.products[1].name).toBe(productA.name);
    expect(output.products[1].price).toBe(productA.price);
    expect(output.products[2].id).toBe(productB.id);
    expect(output.products[2].name).toBe(productB.name);
    expect(output.products[2].price).toBe(productB.price);
  });
});
