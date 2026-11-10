import { describe, expect, it } from 'vitest';
import { ContactService } from '@application/ContactService';

const contact = new ContactService('+55 (14) 99184-7209', 'contato@exemplo.com');

describe('ContactService', () => {
  it('normaliza o número com DDI do Brasil', () => {
    expect(ContactService.normalizePhone('(14) 99184-7209')).toBe('5514991847209');
    expect(ContactService.normalizePhone('+55 14 99184-7209')).toBe('5514991847209');
    expect(() => ContactService.normalizePhone('123')).toThrow();
  });

  it('gera link do WhatsApp com mensagem codificada', () => {
    expect(contact.whatsappLink()).toBe('https://wa.me/5514991847209');
    expect(contact.whatsappLink('Olá, tudo bem?')).toBe('https://wa.me/5514991847209?text=Ol%C3%A1%2C%20tudo%20bem%3F');
  });

  it('formata o pedido de orçamento omitindo campos vazios', () => {
    const text = contact.formatQuote({ name: 'Ana', service: 'Murais', eventDate: '2026-12-20', location: ' ', message: '' });
    expect(text).toBe('Olá! Gostaria de solicitar um orçamento.\n\nNome: Ana\nServiço: Murais\nData do evento: 20/12/2026');
  });

  it('gera link de e-mail com assunto e corpo', () => {
    const link = contact.quoteEmailLink({ name: 'Ana', service: 'Mesas' });
    expect(link.startsWith('mailto:contato@exemplo.com?subject=Pedido%20de%20or%C3%A7amento%3A%20Mesas&body=')).toBe(true);
    expect(link).not.toContain('+');
  });
});
