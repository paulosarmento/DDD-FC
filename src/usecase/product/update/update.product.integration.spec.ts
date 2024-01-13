import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Test form product update use case", () => {
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
  it("Should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = ProductFactory.create("a", "Product", 5);
    const productB = ProductFactory.create("b", "Product B", 10);
    await productRepository.create(product);
    await productRepository.create(productB);
    productB.changeName("ProductB");
    product.changePrice(10);
    const productUpdateRepository = new UpdateProductUseCase(productRepository);
    let output = await productUpdateRepository.execute(product);
    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    output = await productUpdateRepository.execute(productB);
    expect(output).toEqual({
      id: productB.id,
      name: productB.name,
      price: productB.price,
    });
  });
});
