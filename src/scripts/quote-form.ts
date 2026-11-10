import { ContactService, type QuoteRequest } from '@application/ContactService';

/**
 * Formulário de orçamento: monta a mensagem e abre o WhatsApp ou o e-mail.
 * Não envia dados para nenhum servidor.
 */
export class QuoteForm {
  constructor(
    private readonly form: HTMLFormElement,
    private readonly contact: ContactService,
    private readonly open: (url: string) => void,
  ) {}

  start(): void {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!this.form.reportValidity()) return;
      const submitter = (event as SubmitEvent).submitter as HTMLButtonElement | null;
      const request = this.read();
      const url =
        submitter?.value === 'email' ? this.contact.quoteEmailLink(request) : this.contact.quoteWhatsappLink(request);
      this.open(url);
    });
  }

  private read(): QuoteRequest {
    const data = new FormData(this.form);
    const field = (name: string) => String(data.get(name) ?? '');
    return {
      name: field('name'),
      service: field('service'),
      eventDate: field('eventDate'),
      location: field('location'),
      budget: field('budget'),
      message: field('message'),
    };
  }
}
