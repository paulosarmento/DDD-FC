import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Street", 123, "Zip", "City")
);

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Street Updated",
    number: 1234,
    zip: "Zip Updated",
    city: "City Updated",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  };
};

describe("Unit test for customer update use case", () => {
  it("Should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateRepository = new UpdateCustomerUseCase(
      customerRepository,
      MockRepository
    );

    const output = await customerUpdateRepository.execute(input);

    expect(output).toEqual(input);
  });
});
