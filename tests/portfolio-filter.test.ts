import { describe, expect, it } from 'vitest';
import { matches } from '../src/scripts/portfolio-filter';

describe('filtro do portfólio', () => {
  const card = { services: ['murais', 'projetos'], segment: 'residencial' };

  it('aceita "todos" como curinga', () => {
    expect(matches(card, { service: 'todos', segment: 'todos' })).toBe(true);
  });

  it('combina serviço e segmento', () => {
    expect(matches(card, { service: 'murais', segment: 'residencial' })).toBe(true);
    expect(matches(card, { service: 'murais', segment: 'eventos' })).toBe(false);
    expect(matches(card, { service: 'mesas', segment: 'todos' })).toBe(false);
  });
});
