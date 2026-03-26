# Soraia Oliveira — Portfolio & E-Commerce

Portfolio profissional e loja online da artista visual **Soraia Oliveira**, baseada em Guimaraes, Portugal. Construido com Next.js 16, React 19 e uma arquitetura moderna de full-stack.

---

## Indice

- [Visao Geral](#visao-geral)
- [Arquitetura](#arquitetura)
- [Stack Tecnologica](#stack-tecnologica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalacao e Configuracao](#instalacao-e-configuracao)
- [Variaveis de Ambiente](#variaveis-de-ambiente)
- [Base de Dados](#base-de-dados)
- [Desenvolvimento Local](#desenvolvimento-local)
- [Painel de Administracao](#painel-de-administracao)
- [Fluxo de Compra](#fluxo-de-compra)
- [Design e UI](#design-e-ui)
- [SEO e Performance](#seo-e-performance)
- [Guia de Desenvolvimento](#guia-de-desenvolvimento)
- [Deploy](#deploy)

---

## Visao Geral

Site de portfolio e e-commerce para uma artista visual multidisciplinar. Inclui:

- **Portfolio publico** com 45 obras em 4 categorias: Fotografia, Provas de Artista, Desenhos, Joalharia
- **Painel de administracao** completo para gestao de conteudo (CRUD, upload de imagens, configuracoes)
- **Loja integrada** com Stripe Checkout para vendas de obras de arte
- **Formulario de contacto** com notificacoes por email via Resend
- **Newsletter** com gestao de subscritores e modais de sucesso animados
- **SEO otimizado** com sitemap dinamico, JSON-LD, Open Graph, llms.txt e favicon personalizado
- **UI galeria** com animacoes Framer Motion, assinatura da artista como branding, e design responsivo

---

## Arquitetura

### Fluxo de Dados

```mermaid
graph TD
    A[Visitante] -->|Request| B[Next.js App Router]
    B -->|Server Component| C[Query Functions<br/>src/lib/queries/]
    C -->|Drizzle ORM| D[(Neon PostgreSQL)]
    C -->|Fallback| E[Mock Data<br/>src/lib/mock-data.ts]
    D -->|Raw DB Rows| F[Mappers<br/>src/lib/mappers.ts]
    F -->|Public Types| G[Feature Components<br/>src/components/features/]
    E -->|Public Types| G
    G -->|Render| H[Pagina HTML]

    I[Admin] -->|Login| J[Auth.js v5]
    J -->|Session JWT| K[Painel Admin]
    K -->|Server Actions| L[Actions<br/>admin/actions.ts]
    L -->|Drizzle ORM| D

    M[Compra] -->|Checkout| N[Stripe API]
    N -->|Webhook| O[/api/webhooks/stripe]
    O -->|Insert Order| D
```

### Protecao de Rotas

```mermaid
graph LR
    A[Request /admin/*] --> B{proxy.ts}
    B -->|/admin/login| C[Pagina de Login]
    B -->|Outras rotas| D{Sessao valida?}
    D -->|Sim| E[Painel Admin]
    D -->|Nao| C
```

### Modelo de Dados

```mermaid
erDiagram
    artworks ||--o{ artwork_images : "tem"
    artworks ||--o{ orders : "gera"

    artworks {
        int id PK
        varchar title
        varchar slug UK
        varchar category
        decimal price
        boolean is_sold
        boolean is_visible
        int sort_order
    }

    artwork_images {
        int id PK
        int artwork_id FK
        text url
        varchar alt_text
        boolean is_primary
        int sort_order
    }

    orders {
        int id PK
        int artwork_id FK
        varchar customer_email
        decimal amount
        varchar status
        varchar stripe_session_id
        jsonb shipping_address
    }

    news {
        int id PK
        varchar title
        text excerpt
        text external_url
        boolean is_visible
    }

    exhibitions {
        int id PK
        varchar title
        varchar location
        varchar type
        boolean is_visible
    }

    site_settings {
        int id PK
        varchar key UK
        text value
    }

    contacts {
        int id PK
        varchar name
        varchar email
        text message
        boolean is_read
    }

    newsletter_subscribers {
        int id PK
        varchar email UK
        boolean is_active
    }
```

### Componentes UI

```mermaid
graph TD
    subgraph Layout
        Header[Header<br/>Assinatura + nav animada]
        Footer[Footer<br/>Assinatura bold + social + newsletter]
        Container[Container<br/>max-w-1440px]
        Section[Section<br/>spacing responsivo]
    end

    subgraph Features
        Hero[HeroSection<br/>Statement + imagem featured]
        CatGrid[CategoryGrid<br/>4 categorias com imagens reais]
        ArtGrid[ArtworkGrid<br/>Grid responsivo 2-3 colunas]
        ArtCard[ArtworkCard<br/>Imagem + preco + hover]
        ArtDetail[ArtworkDetail<br/>Galeria + lightbox + compra]
        Statement[ArtistStatement<br/>Citacao + imagem estudio]
        ExList[ExhibitionList<br/>Badges tipificados + links]
        Newsletter[NewsletterSection<br/>Form + modal sucesso]
        Contact[ContactForm<br/>react-hook-form + Zod + modal]
    end

    subgraph Shared
        FadeIn[FadeIn<br/>Scroll-triggered + reduced motion]
        SuccessModal[SuccessModal<br/>Checkmark animado]
    end

    Header --> Container
    Footer --> Container
    Hero --> FadeIn
    CatGrid --> FadeIn
    Statement --> FadeIn
    Newsletter --> SuccessModal
    Contact --> SuccessModal
```

---

## Stack Tecnologica

| Camada | Tecnologia | Versao |
|--------|-----------|--------|
| **Framework** | Next.js (App Router) | 16.2 |
| **UI** | React | 19 |
| **Linguagem** | TypeScript (strict) | 5.x |
| **Estilos** | Tailwind CSS | v4 |
| **Componentes** | shadcn (base-nova) | @base-ui/react |
| **Base de Dados** | PostgreSQL (Neon Serverless) | — |
| **ORM** | Drizzle ORM | 0.45 |
| **Autenticacao** | Auth.js (NextAuth v5 beta) | 5.0.0-beta |
| **Pagamentos** | Stripe Checkout | 20.x |
| **Upload de Imagens** | Uploadthing | 7.x |
| **Email** | Resend | 6.x |
| **Validacao** | Zod | v4 |
| **Animacoes** | Framer Motion | 12.x |

---

## Estrutura do Projeto

```
soraia-web/
├── public/
│   └── images/                       # Imagens locais (desenvolvimento)
│       ├── artworks/                 # 46 imagens de obras (da Squarespace)
│       ├── branding/                 # Assinaturas (light, bold, social)
│       ├── about/                    # Perfil, estudio, processo
│       ├── studio/                   # Imagem do estudio
│       └── contact/                  # Imagem da pagina de contacto
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Homepage
│   │   ├── about/                    # Pagina Sobre (bio + CV + identidade)
│   │   ├── artworks/                 # Catalogo + detalhe [slug]
│   │   ├── contact/                  # Formulario de contacto
│   │   ├── soraia-space/             # Estudio + marcacoes + noticias
│   │   ├── admin/                    # Painel de administracao
│   │   │   ├── login/                # Login (publica)
│   │   │   └── (dashboard)/          # Rotas protegidas
│   │   │       ├── artworks/         # CRUD de obras
│   │   │       ├── news/             # Gestao de noticias
│   │   │       ├── exhibitions/      # Gestao de exposicoes
│   │   │       ├── settings/         # Configuracoes do site
│   │   │       ├── contacts/         # Submissoes de contacto
│   │   │       ├── newsletter/       # Subscritores
│   │   │       └── orders/           # Encomendas
│   │   ├── api/                      # Rotas API
│   │   │   ├── auth/[...nextauth]/   # Autenticacao
│   │   │   ├── checkout/             # Sessao Stripe
│   │   │   ├── contact/              # Submissao de contacto
│   │   │   ├── newsletter/           # Subscricao newsletter
│   │   │   ├── revalidate/           # ISR on-demand
│   │   │   ├── uploadthing/          # Upload de imagens
│   │   │   └── webhooks/stripe/      # Webhook Stripe
│   │   ├── icon.tsx                  # Favicon dinamico (SO monograma)
│   │   ├── apple-icon.tsx            # Apple Touch Icon (180x180)
│   │   ├── opengraph-image.tsx       # OG image dinamica
│   │   ├── sitemap.ts               # Sitemap XML dinamico
│   │   ├── robots.ts                # robots.txt
│   │   └── llms.txt/                # Endpoint para LLM crawlers
│   ├── components/
│   │   ├── admin/                    # Componentes do painel admin
│   │   ├── features/                 # Componentes de negocio (15 componentes)
│   │   ├── layout/                   # Header, Footer, Container, Section
│   │   ├── shared/                   # FadeIn, SuccessModal
│   │   └── ui/                       # Primitivos shadcn base-nova (17 componentes)
│   ├── db/
│   │   ├── schema.ts                 # Esquema Drizzle (8 tabelas)
│   │   ├── index.ts                  # Cliente Drizzle + Neon
│   │   └── seed.ts                   # Script de populacao
│   ├── hooks/
│   │   ├── use-newsletter.ts         # Hook partilhado (Footer + Section)
│   │   └── use-scroll-position.ts    # Detecao de scroll para header
│   └── lib/
│       ├── auth.ts                   # Configuracao Auth.js
│       ├── config.ts                 # Constantes (BASE_URL)
│       ├── email.ts                  # Templates Resend
│       ├── mappers.ts                # DB rows -> tipos publicos
│       ├── mock-data.ts              # 45 obras reais + conteudo (fallback dev)
│       ├── queries/                  # Funcoes de consulta DB (com fallback)
│       ├── stripe.ts                 # Cliente Stripe
│       ├── structured-data.ts        # Geradores JSON-LD (WebSite, Person, Product)
│       ├── types.ts                  # Tipos TypeScript publicos
│       ├── uploadthing.ts            # Configuracao Uploadthing
│       ├── utils.ts                  # cn(), formatPrice(), slugify()
│       └── validations/              # Esquemas Zod
├── proxy.ts                          # Protecao de rotas (Next.js 16)
├── drizzle.config.ts                 # Configuracao Drizzle Kit
├── CLAUDE.md                         # Instrucoes para Claude Code
├── DESIGN.MD                         # Especificacao de design
└── SPRINT.MD                         # Plano de sprints (8 sprints)
```

---

## Instalacao e Configuracao

### Pre-requisitos

- Node.js 20+
- pnpm (gestor de pacotes)

### Passos

```bash
# 1. Clonar o repositorio
git clone https://github.com/elbarroca/soraia_web.git
cd soraia_web

# 2. Instalar dependencias
pnpm install

# 3. Configurar variaveis de ambiente
cp .env.example .env.local
# Preencher com as suas credenciais (ver seccao abaixo)

# 4. Iniciar servidor de desenvolvimento
pnpm dev
```

O site estara disponivel em `http://localhost:3000` — funciona sem base de dados (usa dados mock automaticamente).

### Com Base de Dados (opcional)

```bash
# Sincronizar esquema com Neon
npx drizzle-kit push

# Popular com dados de teste
npx tsx src/db/seed.ts
```

---

## Variaveis de Ambiente

Criar um ficheiro `.env.local` na raiz do projeto:

```env
# Base de Dados (Neon) — opcional para desenvolvimento
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/soraia?sslmode=require"

# Autenticacao
AUTH_SECRET="gerar-com-openssl-rand-base64-32"
ADMIN_EMAIL="soraia@soraia-oliveira.com"
ADMIN_PASSWORD_HASH="hash-bcrypt-da-password"

# Uploadthing
UPLOADTHING_TOKEN="token-aqui"

# Stripe
STRIPE_SECRET_KEY="sk_test_xxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"

# Email (Resend)
RESEND_API_KEY="re_xxx"
CONTACT_NOTIFICATION_EMAIL="info@soraia-oliveira.com"

# Aplicacao
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
REVALIDATION_SECRET="string-aleatoria"
```

---

## Base de Dados

### Esquema

A base de dados PostgreSQL (Neon Serverless) contem 8 tabelas:

| Tabela | Descricao |
|--------|-----------|
| `artworks` | Obras de arte com titulo, slug, categoria, preco, visibilidade |
| `artwork_images` | Imagens das obras (URL, alt text, ordenacao, primaria) |
| `news` | Noticias e imprensa |
| `exhibitions` | Exposicoes (solo, grupo, residencia, premio) |
| `site_settings` | Configuracoes chave-valor do site |
| `contacts` | Submissoes do formulario de contacto |
| `newsletter_subscribers` | Subscritores da newsletter |
| `orders` | Encomendas Stripe com detalhes de envio |

### Comandos Uteis

```bash
npx drizzle-kit push       # Sincronizar esquema com Neon
npx drizzle-kit generate   # Gerar migracoes
npx drizzle-kit studio     # Abrir Drizzle Studio (GUI)
npx tsx src/db/seed.ts      # Popular base de dados
```

---

## Desenvolvimento Local

### Sistema de Fallback

Todas as funcoes de consulta em `src/lib/queries/` possuem fallback automatico para dados mock quando a base de dados nao esta disponivel. Isto permite desenvolvimento focado na UI sem necessidade de credenciais reais.

```
Query DB → Sucesso → Dados reais
         → Falha   → Mock data (45 obras, conteudo real do site original)
```

### Imagens Locais

55 imagens foram descarregadas do site original (soraia-oliveira.com) para `/public/images/`:

| Pasta | Conteudo | Ficheiros |
|-------|---------|-----------|
| `artworks/` | Todas as obras de arte | 46 |
| `branding/` | Assinaturas (light, bold, social) | 3 |
| `about/` | Perfil, estudio, processo | 3 |
| `studio/` | Imagem do espaco | 1 |
| `contact/` | Imagem da pagina de contacto | 1 |
| Raiz | Imagem hero featured | 1 |

Em producao, as imagens serao servidas pelo Uploadthing CDN (`utfs.io`).

---

## Painel de Administracao

Acessivel em `/admin` (protegido por autenticacao).

### Funcionalidades

- **Dashboard** — Estatisticas em tempo real (obras, noticias, exposicoes, encomendas, contactos, subscritores)
- **Obras de Arte** — Criar, editar, eliminar, reordenar. Upload de imagens via drag-and-drop
- **Noticias** — CRUD com modal (sem paginas separadas)
- **Exposicoes** — CRUD com tipo (solo/grupo/residencia/premio)
- **Configuracoes** — Editor chave-valor para textos do site (hero, bio, links)
- **Contactos** — Lista de submissoes com marcacao de lido
- **Newsletter** — Lista de subscritores com exportacao CSV
- **Encomendas** — Historico de compras com formatacao de moeda e badges de estado

### Fluxo de Administracao

```mermaid
graph TD
    A[Login /admin/login] -->|Credenciais| B{Auth.js v5}
    B -->|Sucesso| C[Dashboard<br/>Estatisticas em tempo real]
    C --> D[Gerir Obras]
    C --> E[Gerir Noticias]
    C --> F[Gerir Exposicoes]
    C --> G[Configuracoes]
    C --> H[Ver Contactos]
    C --> I[Ver Subscritores]
    C --> J[Ver Encomendas]

    D -->|Criar/Editar| K[Formulario + Upload]
    K -->|Server Action| L[Base de Dados]
    L -->|revalidatePath| M[Cache Atualizada]
```

---

## Fluxo de Compra

```mermaid
sequenceDiagram
    participant V as Visitante
    participant S as Site
    participant St as Stripe
    participant DB as Base de Dados

    V->>S: Clica "COMPRAR" na obra
    S->>S: POST /api/checkout
    S->>St: Criar Checkout Session
    St-->>S: URL da sessao
    S-->>V: Redireciona para Stripe

    V->>St: Preenche dados e paga
    St->>S: Webhook (checkout.session.completed)
    S->>DB: Inserir encomenda (valor em EUR)
    S->>DB: Marcar obra como vendida
    St-->>V: Redireciona para pagina de sucesso
```

### Estados de Preco

| Estado | Exibicao |
|--------|---------|
| Disponivel com preco | "1.800,00 EUR" + botao COMPRAR |
| Preco sob consulta | "Preco sob consulta" + botao INQUIRIR |
| Em promocao (joalharia) | Preco original riscado + preco atual |
| Vendido | Badge "VENDIDO" (sem botao) |

---

## Design e UI

### Estetica

O design segue uma estetica de galeria minimalista ("Architectural Void"):

- **Monocromatico**: `#1a1a1a` (ink), `#555` (light), `#888` (muted), `#fafafa` (dim), `#fff` (surface)
- **Vermelho apenas** para badges SOLD/SALE: `#b91c1c`
- **Zero border-radius** em todo o site (estetica de galeria)
- **Font**: Geist (via `next/font/google`, variavel `--font-sans`)
- **Assinatura**: Imagem da assinatura da artista usada no header e footer como branding

### Animacoes

- **Header**: Slide-in ao carregar + nav links com stagger. Menu mobile com AnimatePresence
- **Hero**: Imagem com scale-in, texto com stagger vertical, label com slide horizontal
- **Seccoes**: FadeIn scroll-triggered com `whileInView` (Framer Motion)
- **Identidade**: Palavras rotativas com AnimatePresence (2s intervalo)
- **Modais de sucesso**: Checkmark com scale-in animado
- **Reducao de movimento**: Todas as animacoes respeitam `prefers-reduced-motion`

### Componentes Chave

| Componente | Descricao |
|-----------|-----------|
| `CategoryGrid` | 4 categorias com imagens reais, grid 3 colunas, hover zoom + reveal |
| `ArtistStatement` | Layout assimetrico com imagem do estudio, blockquote |
| `ExhibitionList` | Badges tipificados (Solo/Group/Residency/Award), links externos |
| `SuccessModal` | Modal reutilizavel com checkmark animado (newsletter + contacto) |
| `AppointmentSection` | Cards verticais com icone, descricao e CTA |

### Tokens de Design

Propriedades CSS customizadas em `src/app/globals.css`:

```css
--color-ink: #1a1a1a;          /* Texto principal */
--color-ink-light: #555555;     /* Texto secundario */
--color-ink-muted: #888888;     /* Labels, placeholders */
--color-surface: #ffffff;       /* Fundo principal */
--color-surface-dim: #fafafa;   /* Fundo alternativo */
--color-accent: #1a1a1a;        /* Botoes CTA */
--color-sold: #b91c1c;          /* Badge vendido */
--space-page-x: 1.5rem → 7.5rem; /* Margens responsivas */
--space-section-y: 4rem → 8rem;  /* Espacamento vertical */
```

---

## SEO e Performance

### Implementado

- **Metadados dinamicos** em todas as paginas (`generateMetadata`)
- **Sitemap XML** dinamico com todas as obras visiveis
- **robots.txt** — bloqueia `/admin/`
- **JSON-LD** — Schema.org (WebSite, Person, Product)
- **Open Graph** — Imagens dinamicas por pagina e por obra (1200x630)
- **Favicon** — Monograma "SO" dinamico (`icon.tsx` 32x32, `apple-icon.tsx` 180x180)
- **llms.txt** — Endpoint dinamico para crawlers de LLM com contagem de obras por categoria
- **Alternates** — Links hreflang (en/pt)
- **Redirects 301** — URLs antigas do Squarespace (`/artworks/p/:slug` -> `/artworks/:slug`)
- **ISR** — Revalidacao on-demand via `/api/revalidate` com allowlist de paths

### Acessibilidade

- Link "Skip to content" no layout raiz
- Atributos `aria-label` em todos os botoes de icone
- Estilos `focus-visible` em todos os elementos interativos
- Suporte a `prefers-reduced-motion` em todas as animacoes
- Navegacao por teclado no lightbox (setas + Escape)
- Labels semanticos em todos os campos de formulario

---

## Guia de Desenvolvimento

### Comandos

```bash
pnpm dev                  # Servidor de desenvolvimento
pnpm build                # Build de producao
pnpm lint                 # ESLint
npx tsc --noEmit          # Verificacao de tipos
```

### Convencoes

- **Named exports** em todos os modulos partilhados (sem `export default`)
- **Paginas admin** usam `export const dynamic = "force-dynamic"`
- **Validacao** com esquemas Zod em `src/lib/validations/`
- **Tipos publicos** em `src/lib/types.ts` (nunca expor tipos da DB diretamente)
- **Mappers** em `src/lib/mappers.ts` (converter DB rows -> tipos publicos)
- **Design tokens** via CSS custom properties em `globals.css`
- **Queries** com fallback para mock data (site funciona sem DB)
- **Imagens** locais em dev (`/public/images/`), Uploadthing CDN em producao

### Categorias de Obras

| Slug | Total | Descricao |
|------|-------|-----------|
| `photography` | 13 | Impressoes fine art, auto-retrato, edicoes limitadas |
| `artist-proofs` | 11 | Provas de artista raras e anotadas |
| `drawings` | 14 | Obras originais em grafite, carvao e tinta |
| `jewelry` | 8 | Esculturas vestiveis em ouro e prata (todas em promocao) |

---

## Deploy

### Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI
pnpm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Configurar variaveis de ambiente no dashboard Vercel
# Settings -> Environment Variables -> adicionar todas do .env.local

# 5. Configurar dominio customizado
# Settings -> Domains -> adicionar soraia-oliveira.com
```

### DNS

```
A      @    76.76.21.21
CNAME  www  cname.vercel-dns.com
```

### Pos-Deploy

- Atualizar `NEXT_PUBLIC_BASE_URL` para o dominio de producao
- Atualizar URL do webhook Stripe para producao
- Submeter sitemap no Google Search Console
- Testar pagamento com cartao real (reembolsar depois)
- Migrar imagens de `/public/images/` para Uploadthing CDN

---

## Licenca

Projeto privado. Todos os direitos reservados.

Desenvolvido para **Soraia Oliveira** — artista visual, Guimaraes, Portugal.
