/**
 * Alternador das propostas visuais, usado só durante a fase de escolha.
 * A preferência fica no navegador de quem está avaliando e também pode vir
 * pela URL (?tema=cinema), o que facilita mandar o link de cada proposta.
 * A leitura inicial acontece no layout, para evitar troca visível de tema.
 */

export interface KeyValueStore {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

export const browserStore: KeyValueStore = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* armazenamento indisponível: a escolha vale só para esta visita */
    }
  },
};

/** Também lido pelo script inicial do layout, antes da primeira pintura. */
export const THEME_STORAGE_KEY = 'omne:tema';

export class ThemePreview {
  constructor(
    private readonly root: HTMLElement,
    private readonly themes: readonly string[],
    private readonly store: KeyValueStore,
  ) {}

  apply(theme: string): void {
    if (!this.themes.includes(theme)) return;
    this.root.dataset.theme = theme;
    this.store.set(THEME_STORAGE_KEY, theme);
  }

  bind(controls: Iterable<HTMLButtonElement>): void {
    const buttons = [...controls];
    const sync = () =>
      buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.value === this.root.dataset.theme)));
    buttons.forEach((button) =>
      button.addEventListener('click', () => {
        this.apply(button.value);
        sync();
      }),
    );
    sync();
  }
}
