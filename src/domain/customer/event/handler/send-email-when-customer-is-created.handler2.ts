import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerIsCreatedHandler2
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    const { name } = event.eventData;
    console.log(`Esse é o segundo console.log do evento: ${name}`);
  }
}
