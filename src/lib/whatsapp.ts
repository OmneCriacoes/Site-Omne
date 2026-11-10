/** Dados que o visitante preenche no formulário de orçamento. */
export interface PedidoOrcamento {
  nome: string;
  servico: string;
  mensagem: string;
  empresa?: string;
  cidade?: string;
  data?: string;
}

/** Mantém só os dígitos do número, no formato que o wa.me espera (DDI + DDD + número). */
export function limparNumero(numero: string): string {
  return numero.replace(/\D/g, '');
}

/** Converte uma data ISO (aaaa-mm-dd) para dd/mm/aaaa; devolve o texto original se não for ISO. */
export function formatarData(valor: string): string {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valor);
  return iso ? `${iso[3]}/${iso[2]}/${iso[1]}` : valor;
}

/** Monta o texto da mensagem que chega no WhatsApp da Omne. Campos vazios ficam de fora. */
export function formatarMensagem(pedido: PedidoOrcamento): string {
  const linhas = [
    `Olá! Meu nome é ${pedido.nome.trim()} e gostaria de um orçamento.`,
    '',
    `*Serviço:* ${pedido.servico}`,
  ];
  if (pedido.empresa?.trim()) linhas.push(`*Empresa:* ${pedido.empresa.trim()}`);
  if (pedido.cidade?.trim()) linhas.push(`*Cidade do evento:* ${pedido.cidade.trim()}`);
  if (pedido.data?.trim()) linhas.push(`*Data prevista:* ${formatarData(pedido.data.trim())}`);
  linhas.push('', `*Detalhes:* ${pedido.mensagem.trim()}`);
  return linhas.join('\n');
}

/** Link que abre a conversa com a mensagem já escrita. */
export function montarLinkWhatsApp(numero: string, mensagem: string): string {
  const digitos = limparNumero(numero);
  if (digitos.length < 10) throw new Error(`Número de WhatsApp inválido: "${numero}"`);
  return `https://wa.me/${digitos}?text=${encodeURIComponent(mensagem)}`;
}
