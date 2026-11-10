/**
 * Filtro do portfólio no navegador. Os cartões já vêm renderizados com
 * data-services e data-segment; aqui apenas mostramos ou ocultamos.
 */

export interface FilterState {
  service: string;
  segment: string;
}

export function matches(card: { services: readonly string[]; segment: string }, state: FilterState): boolean {
  const byService = state.service === 'todos' || card.services.includes(state.service);
  const bySegment = state.segment === 'todos' || card.segment === state.segment;
  return byService && bySegment;
}

export class PortfolioFilter {
  private readonly state: FilterState = { service: 'todos', segment: 'todos' };

  constructor(
    private readonly form: HTMLFormElement,
    private readonly cards: readonly HTMLElement[],
    private readonly emptyMessage: HTMLElement,
  ) {}

  start(initial: Partial<FilterState> = {}): void {
    Object.assign(this.state, initial);
    for (const [name, value] of Object.entries(this.state)) {
      const input = this.form.querySelector<HTMLInputElement>(`input[name="${name}"][value="${value}"]`);
      if (input) input.checked = true;
    }
    this.form.addEventListener('change', (event) => {
      const input = event.target as HTMLInputElement;
      if (input.name in this.state) {
        this.state[input.name as keyof FilterState] = input.value;
        this.render();
      }
    });
    this.render();
  }

  private render(): void {
    let visible = 0;
    for (const card of this.cards) {
      const show = matches(
        { services: (card.dataset.services ?? '').split(' '), segment: card.dataset.segment ?? '' },
        this.state,
      );
      card.hidden = !show;
      if (show) visible += 1;
    }
    this.emptyMessage.hidden = visible > 0;
  }
}
