import Notification from "./notification";

describe("Unit tests for notification", () => {
  it("Should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "Error message",
      context: "customer",
    };
    notification.addError(error);
    expect(notification.messages("customer")).toBe("customer: Error message,");
    const error2 = {
      message: "Error message 2",
      context: "customer",
    };
    notification.addError(error2);
    expect(notification.messages("customer")).toBe(
      "customer: Error message,customer: Error message 2,"
    );

    const error3 = {
      message: "Error message 3",
      context: "order",
    };
    notification.addError(error3);
    expect(notification.messages("customer")).toBe(
      "customer: Error message,customer: Error message 2,"
    );
    expect(notification.messages()).toBe(
      "customer: Error message,customer: Error message 2,order: Error message 3,"
    );
    const error4 = {
      message: "Error message 4",
      context: "product",
    };
    notification.addError(error4);
    expect(notification.messages("product")).toBe("product: Error message 4,");
    const error5 = {
      message: "Error message 5",
      context: "product",
    };
    notification.addError(error5);
    expect(notification.messages("product")).toBe(
      "product: Error message 4,product: Error message 5,"
    );
  });

  it("Should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "Error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("Should get all errors props", () => {
    const notification = new Notification();
    const error = {
      message: "Error message",
      context: "product",
    };
    notification.addError(error);
    expect(notification.getErros()).toEqual([error]);
  });
});