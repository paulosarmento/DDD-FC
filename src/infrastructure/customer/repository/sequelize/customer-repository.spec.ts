import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Paulo Sarmento");
    const address = new Address("Rua dois", 444, "123-456", "Sao paulo");
    customer.Address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("Should update a Customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Paulo Sarmento");
    const address = new Address("Rua dois", 444, "123-456", "Sao paulo");
    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Paulo Sarmento",
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });

    customer.changeName("Paulo César");
    customer.addRewardPoints(200);

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: "1" } });
    expect(customerModel2.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("Should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Paulo Sarmento");
    const address = new Address("Rua dois", 444, "123-456", "Zero");
    customer.Address = address;
    await customerRepository.create(customer);
    const foundCustomers = await customerRepository.find("1");
    expect(foundCustomers).toEqual(customer);
  });

  it("Should find all Customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Paulo Sarmento");
    const address = new Address("Rua dois", 444, "123-456", "Zero");
    customer.Address = address;
    await customerRepository.create(customer);

    const customer2 = new Customer("2", "Paulo Sarmento2");
    const address2 = new Address("Rua tres", 4444, "123-456", "Zero");
    customer2.Address = address2;
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();

    expect(foundCustomers).toHaveLength(2);
    expect(foundCustomers).toContainEqual(customer);
    expect(foundCustomers).toContainEqual(customer2);
  });
});
