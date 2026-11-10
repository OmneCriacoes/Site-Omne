# Site Omne Criações

Site institucional da Omne Criações (cenografia, esculturas, murais, mesas e espaços temáticos), publicado em [omnecriacoes.com](https://omnecriacoes.com).

Feito só com ferramentas gratuitas e de código aberto: [Astro](https://astro.build) para gerar o site, [Sveltia CMS](https://github.com/sveltia/sveltia-cms) como painel de conteúdo e GitHub Pages para hospedagem.

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:4321
npm run verify   # tipos, testes e build, o mesmo que roda no GitHub
```

## Arquitetura

O código segue camadas com dependência sempre para dentro, e a composição acontece em um único ponto.

```
src/
  domain/           Entidades e contratos. Não conhece Astro, CMS nem navegador.
  application/      Regras do site (portfólio, catálogo, contato). Recebem o repositório pelo construtor.
  infrastructure/   Implementações concretas. Hoje: leitura das coleções do Astro.
  core/container.ts Raiz de composição: cria os serviços e injeta o repositório.
  components/       ui/ (peças pequenas), layout/ (cabeçalho, rodapé), sections/ (blocos de página).
  layouts/          Estrutura HTML comum.
  pages/            Rotas. Só pedem dados ao container e montam seções.
  scripts/          Comportamento no navegador (esqueleto, filtro, formulário, temas).
  styles/           Tokens, temas, base e esqueleto.
  content/          Conteúdo editado pelo painel (Markdown e JSON).
tests/              Testes da camada de aplicação com repositório em memória.
public/admin/       Painel Sveltia CMS.
```

Para trocar a origem do conteúdo (por exemplo, uma API no futuro), basta criar outra classe que implemente `ContentRepository` e passá-la em `createContainer`. Páginas e componentes não mudam.

## Esqueleto de carregamento

Não existe um layout de esqueleto separado. Enquanto o `<html>` tem a classe `is-loading`, todo elemento marcado com `data-sk` vira um bloco com brilho animado da direita para a esquerda. Como é o próprio HTML da página, o esqueleto sempre espelha o layout real, mesmo depois de mudanças.

- `data-sk="text"`: textos, recortados em faixas na altura de cada linha.
- `data-sk="block"`: botões, campos e selos.
- `data-sk="media"`: imagens. Cada uma mantém o esqueleto até carregar, inclusive as que entram com a rolagem.

Ao criar um componente novo, marque os elementos com `data-sk` e ele já ganha o esqueleto. A lógica está em `src/styles/skeleton.css` e `src/scripts/skeleton.ts`. Sem JavaScript, a página aparece direto, sem esqueleto.

## Propostas visuais

Os temas `galeria`, `cinema` e `atelie` ficam em `src/styles/themes.css` e só redefinem tokens (cores, fontes, cantos). Durante a escolha, o seletor no canto da tela e o parâmetro `?tema=cinema` permitem comparar. Depois de decidir, escolha o visual em **Configurações do site** no painel e desligue o seletor.

## Painel de conteúdo

Acesse `omnecriacoes.com/admin` e entre com um token do GitHub (Settings > Developer settings > Personal access tokens > Fine-grained, com permissão de leitura e escrita em *Contents* deste repositório). Cada alteração salva vira um commit e o site é republicado sozinho em cerca de dois minutos.

## Publicação

O workflow `.github/workflows/deploy.yml` gera e publica o site a cada push em `main`. Em **Settings > Pages**, a origem precisa estar como **GitHub Actions**. O domínio vem de `public/CNAME`.
