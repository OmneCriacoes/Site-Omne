import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatarData, formatarMensagem, limparNumero, montarLinkWhatsApp } from './whatsapp.ts';

test('limparNumero remove tudo que não é dígito', () => {
  assert.equal(limparNumero('+55 (14) 99184-7209'), '5514991847209');
});

test('formatarData converte ISO e mantém outros formatos', () => {
  assert.equal(formatarData('2026-12-05'), '05/12/2026');
  assert.equal(formatarData('dezembro'), 'dezembro');
});

test('formatarMensagem inclui só os campos preenchidos', () => {
  const texto = formatarMensagem({ nome: ' Ana ', servico: 'Esculturas', mensagem: 'Vaca de 2 m', cidade: '', data: '2026-12-05' });
  assert.match(texto, /Meu nome é Ana e/);
  assert.match(texto, /\*Serviço:\* Esculturas/);
  assert.match(texto, /\*Data prevista:\* 05\/12\/2026/);
  assert.doesNotMatch(texto, /Cidade/);
  assert.doesNotMatch(texto, /Empresa/);
});

test('montarLinkWhatsApp codifica a mensagem', () => {
  const link = montarLinkWhatsApp('+55 14 99184-7209', 'Olá & até já');
  assert.equal(link, 'https://wa.me/5514991847209?text=Ol%C3%A1%20%26%20at%C3%A9%20j%C3%A1');
});

test('montarLinkWhatsApp recusa número curto', () => {
  assert.throws(() => montarLinkWhatsApp('123', 'oi'), /inválido/);
});
