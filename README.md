# Site Omne Criações

Site estático em [Astro](https://astro.build) publicado no GitHub Pages em https://omnecriacoes.com.

## Rodar localmente

```sh
npm install
npm run dev      # http://localhost:4321
npm test         # testes do formulário de WhatsApp
npm run build    # gera a pasta dist/
```

## Onde fica cada coisa

| Pasta | Conteúdo |
| --- | --- |
| `src/content/projetos/<projeto>/` | `index.md` com os dados do projeto e as fotos ao lado |
| `src/content/servicos/` | Um arquivo por serviço (esculturas, murais, mesas, espaços temáticos, projetos) |
| `src/content/site/geral.json` | WhatsApp, e-mail, cidade e textos da página inicial e da página Sobre |
| `src/content/site/clientes.json` | Logos de clientes (arquivos em `src/assets/clientes/`) |
| `src/content/site/processo.json` | Etapas de "Como trabalhamos" |
| `src/lib/` | Lógica sem dependência de tela: mensagem do WhatsApp, filtro, skeleton |
| `src/styles/global.css` | Cores, fontes e espaçamentos (direção visual "Galeria") |
| `public/admin/` | Painel de conteúdo Sveltia CMS |

## Painel de conteúdo (Sveltia CMS)

O painel fica em https://omnecriacoes.com/admin/. Cada alteração salva vira um commit na branch `main` e o site é publicado de novo em poucos minutos.

Para entrar, escolha **Entrar com token** e cole um token pessoal do GitHub (fine-grained) com permissão de leitura e escrita em **Contents** apenas neste repositório. Para entrar com o botão do GitHub sem token, é preciso publicar o autenticador gratuito [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) no Cloudflare Workers e adicionar `base_url` em `public/admin/config.yml`.

## Publicação

O workflow `.github/workflows/deploy.yml` roda testes, gera o site e publica no GitHub Pages a cada push na `main`. Em **Settings > Pages**, a origem deve estar como **GitHub Actions** e o domínio personalizado como `omnecriacoes.com` (o arquivo `public/CNAME` já está no projeto).
