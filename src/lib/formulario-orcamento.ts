import { formatarMensagem, type PedidoOrcamento } from './whatsapp.ts';

/** Lê os campos visíveis do formulário (marcados com data-campo) como um pedido de orçamento. */
export function lerPedido(form: HTMLFormElement): PedidoOrcamento {
  const texto = (campo: string) => form.querySelector<HTMLInputElement>(`[data-campo="${campo}"]`)?.value.trim() ?? '';
  return {
    nome: texto('nome'),
    servico: texto('servico'),
    mensagem: texto('mensagem'),
    empresa: texto('empresa'),
    cidade: texto('cidade'),
  };
}

/**
 * Ao enviar, escreve a mensagem no campo "text" que vai para o wa.me. A conferência dos campos é do system.js do
 * kit, que cancela o envio quando falta algo; aqui só se monta o texto, sem impedir o envio do navegador.
 */
export function conectarFormularioOrcamento(form: HTMLFormElement): () => void {
  const campoTexto = form.querySelector<HTMLInputElement>('input[name="text"]');
  const aoEnviar = () => {
    if (campoTexto) campoTexto.value = formatarMensagem(lerPedido(form));
  };
  form.addEventListener('submit', aoEnviar);
  return () => form.removeEventListener('submit', aoEnviar);
}
