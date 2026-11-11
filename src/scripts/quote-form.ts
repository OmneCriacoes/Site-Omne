import type { ContactService, QuoteRequest } from '@application/ContactService';

/**
 * Formulário de orçamento: ao enviar, escreve a mensagem no campo "text" que vai para o wa.me.
 * A conferência dos campos é do system.js do kit, que cancela o envio quando falta algo; aqui não se impede o
 * envio do navegador. Não envia dados para nenhum servidor.
 */
export class QuoteForm {
  constructor(
    private readonly form: HTMLFormElement,
    private readonly contact: ContactService,
  ) {}

  start(): void {
    const text = this.form.querySelector<HTMLInputElement>('input[name="text"]');
    this.form.addEventListener('submit', () => {
      if (text) text.value = this.contact.formatQuote(this.read());
    });
  }

  private read(): QuoteRequest {
    const field = (name: string) => this.form.querySelector<HTMLInputElement>(`[data-field="${name}"]`)?.value.trim() ?? '';
    return {
      name: field('name'),
      service: field('service'),
      eventDate: field('eventDate'),
      location: field('location'),
      message: field('message'),
    };
  }
}
