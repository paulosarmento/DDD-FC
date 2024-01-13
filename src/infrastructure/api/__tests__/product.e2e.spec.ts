import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      name: "Product",
      price: 5,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product");
    expect(response.body.price).toBe(5);
  });
  it("Should not create a product", async () => {
    const response = await request(app).post("/product").send({
      type: "c",
      name: "Product",
      price: 5,
    });
    expect(response.status).toBe(500);
  });
  it("Should list all products", async () => {
    const response = await request(app).post("/product").send({
      type: "a",
      name: "Product",
      price: 5,
    });
    expect(response.status).toBe(200);
    const response2 = await request(app).post("/product").send({
      type: "b",
      name: "ProductB",
      price: 10,
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product");
    expect(product.price).toBe(5);
    const productB = listResponse.body.products[1];
    expect(productB.name).toBe("ProductB");
    expect(productB.price).toBe(10 * 2);
  });
});
