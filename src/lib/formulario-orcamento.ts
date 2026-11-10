import { formatarMensagem, montarLinkWhatsApp, type PedidoOrcamento } from './whatsapp.ts';

/** Dependências injetadas, para que o formulário não dependa de window nem do número fixo. */
export interface DependenciasOrcamento {
  numeroWhatsApp: string;
  abrirLink: (url: string) => void;
}

const CAMPOS_OBRIGATORIOS = ['nome', 'servico', 'mensagem'] as const;

export function lerPedido(dados: FormData): PedidoOrcamento {
  const texto = (campo: string) => String(dados.get(campo) ?? '').trim();
  return {
    nome: texto('nome'),
    servico: texto('servico'),
    mensagem: texto('mensagem'),
    empresa: texto('empresa'),
    cidade: texto('cidade'),
    data: texto('data'),
  };
}

export function camposFaltando(pedido: PedidoOrcamento): string[] {
  return CAMPOS_OBRIGATORIOS.filter((campo) => !pedido[campo]);
}

/** Liga o formulário: ao enviar, valida e abre o WhatsApp com a mensagem pronta. */
export function conectarFormularioOrcamento(form: HTMLFormElement, deps: DependenciasOrcamento): () => void {
  const aviso = form.querySelector<HTMLElement>('[data-aviso]');

  const aoEnviar = (evento: SubmitEvent) => {
    evento.preventDefault();
    const pedido = lerPedido(new FormData(form));
    const faltando = camposFaltando(pedido);

    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    if (faltando.length) {
      const campos = faltando.map((nome) => form.elements.namedItem(nome)).filter((el) => el instanceof HTMLElement);
      campos.forEach((el) => el.setAttribute('aria-invalid', 'true'));
      campos[0]?.focus();
      if (aviso) aviso.textContent = 'Preencha nome, serviço e detalhes do projeto para continuar.';
      return;
    }

    if (aviso) aviso.textContent = 'Abrindo o WhatsApp com a sua mensagem…';
    deps.abrirLink(montarLinkWhatsApp(deps.numeroWhatsApp, formatarMensagem(pedido)));
  };

  form.addEventListener('submit', aoEnviar);
  return () => form.removeEventListener('submit', aoEnviar);
}
