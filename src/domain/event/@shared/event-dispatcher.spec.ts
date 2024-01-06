import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import SendEmailWhenCustomerIsCreatedHandler from "../customer/handler/send-email-when-customer-is-created.handler";
import SendEmailWhenCustomerIsCreatedHandler2 from "../customer/handler/send-email-when-customer-is-created.handler2";
import SendEmailWhenAddressChangeHandler from "../address/handler/send-email-when-address-changed.handler";
import Customer from "../../entity/customer";
import Address from "../../entity/address";
import AddressUpdatedEvent from "../address/address-updated.event";

describe("Domain events tests", () => {
  it("Should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("Should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("Should unregister all event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventHandlerCustomer = new SendEmailWhenCustomerIsCreatedHandler();
    const eventHandlerCustomer2 = new SendEmailWhenCustomerIsCreatedHandler2();
    const addressChangeHandler = new SendEmailWhenAddressChangeHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandlerCustomer = jest.spyOn(eventHandlerCustomer, "handle");
    const spyEventHandlerCustomer2 = jest.spyOn(
      eventHandlerCustomer2,
      "handle"
    );
    const spyAddressChangeHandler = jest.spyOn(addressChangeHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomer);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomer2);
    eventDispatcher.register("AddressUpdatedEvent", addressChangeHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerCustomer);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandlerCustomer2);
    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"][0]
    ).toMatchObject(addressChangeHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
    });

    const customer = new Customer("1", "Customer123");
    const address = new Address("Street", 1234, "ZipCode", "City");
    customer.changeAddress(address);
    const addressUpdatedEvent = new AddressUpdatedEvent({
      id: customer.id,
      name: customer.name,
      address: address,
    });

    eventDispatcher.notify(productCreatedEvent);
    eventDispatcher.notify(customerCreatedEvent);
    eventDispatcher.notify(addressUpdatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandlerCustomer).toHaveBeenCalled();
    expect(spyEventHandlerCustomer2).toHaveBeenCalled();
    expect(spyAddressChangeHandler).toHaveBeenCalled();
  });
});
