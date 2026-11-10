/**
 * Regras do contato por WhatsApp e e-mail.
 *
 * Sem dependências de Astro ou do DOM: é usado tanto na geração das páginas
 * quanto no navegador, pelo formulário de orçamento.
 */

export interface QuoteRequest {
  readonly name: string;
  readonly service?: string;
  readonly eventDate?: string;
  readonly location?: string;
  readonly budget?: string;
  readonly message?: string;
}

export class ContactService {
  readonly #phone: string;

  constructor(
    whatsapp: string,
    private readonly email: string,
  ) {
    this.#phone = ContactService.normalizePhone(whatsapp);
  }

  static normalizePhone(raw: string): string {
    const digits = raw.replace(/\D/g, '');
    if (digits.length < 10) {
      throw new Error(`Número de WhatsApp inválido: "${raw}"`);
    }
    return digits.startsWith('55') ? digits : `55${digits}`;
  }

  /** Link de conversa com mensagem inicial opcional. */
  whatsappLink(message?: string): string {
    const base = `https://wa.me/${this.#phone}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  /** Mensagem padrão quando o visitante parte da página de um serviço. */
  serviceGreeting(serviceTitle: string): string {
    return `Olá! Vi o site da Omne e gostaria de um orçamento de ${serviceTitle.toLowerCase()}.`;
  }

  /** Texto organizado do pedido de orçamento. Campos vazios são omitidos. */
  formatQuote(request: QuoteRequest): string {
    const lines: [string, string | undefined][] = [
      ['Nome', request.name],
      ['Serviço', request.service],
      ['Data do evento', request.eventDate && ContactService.formatDate(request.eventDate)],
      ['Local', request.location],
      ['Orçamento estimado', request.budget],
      ['Detalhes', request.message],
    ];
    const body = lines
      .filter(([, value]) => value && value.trim() !== '')
      .map(([label, value]) => `${label}: ${value!.trim()}`)
      .join('\n');
    return `Olá! Gostaria de solicitar um orçamento.\n\n${body}`;
  }

  quoteWhatsappLink(request: QuoteRequest): string {
    return this.whatsappLink(this.formatQuote(request));
  }

  quoteEmailLink(request: QuoteRequest): string {
    const subject = `Pedido de orçamento${request.service ? `: ${request.service}` : ''}`;
    const params = new URLSearchParams({ subject, body: this.formatQuote(request) });
    return `mailto:${this.email}?${params.toString().replace(/\+/g, '%20')}`;
  }

  /** Converte "2026-12-20" em "20/12/2026"; outros formatos passam intactos. */
  static formatDate(value: string): string {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    return match ? `${match[3]}/${match[2]}/${match[1]}` : value;
  }
}
