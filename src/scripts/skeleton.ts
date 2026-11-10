/**
 * Controla o esqueleto de carregamento.
 *
 * - A página nasce com `is-loading` no <html> (definido no layout).
 * - A classe sai quando fontes e imagens da primeira dobra estão prontas,
 *   com um tempo máximo para nunca prender o visitante.
 * - Cada imagem marcada com data-sk="media" mantém o próprio esqueleto até
 *   carregar, inclusive as que entram depois com rolagem (lazy loading).
 */

export interface SkeletonOptions {
  readonly root: HTMLElement;
  readonly maxWaitMs: number;
  readonly minVisibleMs: number;
}

export class SkeletonController {
  constructor(private readonly options: SkeletonOptions) {}

  start(): void {
    this.trackMedia();
    const started = performance.now();
    const ready = Promise.all([this.fontsReady(), this.aboveTheFoldImages()]);
    const timeout = new Promise((resolve) => setTimeout(resolve, this.options.maxWaitMs));

    void Promise.race([ready, timeout]).then(() => {
      const elapsed = performance.now() - started;
      const remaining = Math.max(0, this.options.minVisibleMs - elapsed);
      setTimeout(() => this.reveal(), remaining);
    });
  }

  private reveal(): void {
    const { root } = this.options;
    root.classList.remove('is-loading');
    root.classList.add('is-loaded');
  }

  private trackMedia(): void {
    const wrappers = this.options.root.querySelectorAll<HTMLElement>('[data-sk="media"]');
    wrappers.forEach((wrapper) => {
      const img = wrapper.querySelector('img');
      if (!img) {
        wrapper.classList.add('is-ready');
        return;
      }
      const markReady = () => wrapper.classList.add('is-ready');
      if (img.complete && img.naturalWidth > 0) {
        markReady();
      } else {
        img.addEventListener('load', markReady, { once: true });
        img.addEventListener('error', markReady, { once: true });
      }
    });
  }

  private fontsReady(): Promise<unknown> {
    return 'fonts' in document ? document.fonts.ready : Promise.resolve();
  }

  private aboveTheFoldImages(): Promise<unknown> {
    const fold = window.innerHeight;
    const images = [...this.options.root.querySelectorAll<HTMLImageElement>('[data-sk="media"] img')].filter(
      (img) => img.getBoundingClientRect().top < fold,
    );
    return Promise.all(
      images.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.addEventListener('load', () => resolve(), { once: true });
              img.addEventListener('error', () => resolve(), { once: true });
            }),
      ),
    );
  }
}
