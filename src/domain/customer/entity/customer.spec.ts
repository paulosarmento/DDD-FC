import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrow("customer: Id is required");
  });
  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrow("customer: Name is required");
  });
  it("should throw error when name is and id are empty", () => {
    expect(() => {
      let customer = new Customer("", "");
    }).toThrow("customer: Id is required,customer: Name is required");
  });
  it("should change name", () => {
    //Arrange
    const customer = new Customer("123", "John");

    //Act
    customer.changeName("Jane");
    // Assert
    expect(customer.name).toBe("Jane");
  });
  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "12332-222", "Sao Paulo");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });
  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "12332-222", "Sao Paulo");
    customer.Address = address;

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });
  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it("Should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
