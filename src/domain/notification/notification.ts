export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }
  hasErrors(): boolean {
    return this.errors.length > 0;
  }
  getErros(): NotificationErrorProps[] {
    return this.errors;
  }
  messages(context?: string): string {
    let message = "";
    this.errors.forEach((error) => {
      if (context === error.context || context === undefined) {
        message += `${error.context}: ${error.message},`;
      }
    });
    return message;
  }
}
