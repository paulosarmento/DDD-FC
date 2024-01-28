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
  it("Should accumulate errors for a product with blank name and price", () => {
    const notification = new Notification();

    // Adicionando um erro para um produto com nome em branco
    const error1 = {
      message: "Product name cannot be blank",
      context: "product",
    };
    notification.addError(error1);
    expect(notification.messages("product")).toBe(
      "product: Product name cannot be blank,"
    );

    // Adicionando outro erro para o mesmo produto com preço em branco
    const error2 = {
      message: "Product price cannot be blank",
      context: "product",
    };
    notification.addError(error2);
    expect(notification.messages("product")).toBe(
      "product: Product name cannot be blank,product: Product price cannot be blank,"
    );

    // Adicionando um erro para um contexto diferente
    const error3 = {
      message: "Error message for order",
      context: "order",
    };
    notification.addError(error3);
    expect(notification.messages("product")).toBe(
      "product: Product name cannot be blank,product: Product price cannot be blank,"
    );

    // Verificando os erros gerais acumulados
    expect(notification.messages()).toBe(
      "product: Product name cannot be blank,product: Product price cannot be blank,order: Error message for order,"
    );
  });
});
