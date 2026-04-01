# Soraia Oliveira — Portfolio & E-Commerce

Portfolio profissional e loja online da artista visual **Soraia Oliveira**, baseada em Guimarães, Portugal. Construído com Next.js 16, React 19 e uma arquitetura moderna de full-stack.

---

## Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Stack Tecnológica](#stack-tecnológica)
- [Design System](#design-system)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Base de Dados](#base-de-dados)
- [Desenvolvimento Local](#desenvolvimento-local)
- [Painel de Administração](#painel-de-administração)
- [Fluxo de Compra](#fluxo-de-compra)
- [SEO e Performance](#seo-e-performance)
- [Guia de Desenvolvimento](#guia-de-desenvolvimento)
- [Deploy](#deploy)

---

## Visão Geral

Site de portfolio e e-commerce para uma artista visual multidisciplinar. Inclui:

- **Portfolio público** com 45 obras em 4 categorias: Fotografia, Provas de Artista, Desenhos, Joalharia
- **Painel de administração** completo para gestão de conteúdo (CRUD, upload de imagens, configurações)
- **Loja integrada** com Stripe Checkout para vendas de obras de arte
- **Formulário de contacto** com seletor de intenção integrado e notificações por email via Resend
- **Newsletter** com gestão de subscritores e modais de sucesso animados
- **SEO otimizado** com sitemap dinâmico, JSON-LD, Open Graph, llms.txt e favicon personalizado
- **UI galeria** editorial com animações Framer Motion, design tokens, tipografia dual-font, e design responsivo

---

## Arquitetura

### Fluxo de Dados

```mermaid
graph TD
    A[Visitante] -->|Request| B[Next.js App Router]
    B -->|Server Component| C[Query Functions<br/>src/lib/queries/]
    C -->|Drizzle ORM| D[(Supabase PostgreSQL)]
    C -->|Fallback| E[Mock Data<br/>src/lib/mock-data.ts]
    D -->|Raw DB Rows| F[Mappers<br/>src/lib/mappers.ts]
    F -->|Public Types| G[Feature Components<br/>src/components/features/]
    E -->|Public Types| G
    G -->|Render| H[Página HTML]

    I[Admin] -->|Login| J[Auth.js v5]
    J -->|Session JWT| K[Painel Admin]
    K -->|Server Actions| L[Actions<br/>admin/actions.ts]
    L -->|Drizzle ORM| D

    M[Compra] -->|Checkout| N[Stripe API]
    N -->|Webhook| O[/api/webhooks/stripe]
    O -->|Insert Order| D
```

### Protecção de Rotas

```mermaid
graph LR
    A[Request /admin/*] --> B{proxy.ts}
    B -->|/admin/login| C[Página de Login]
    B -->|Outras rotas| D{Sessão válida?}
    D -->|Sim| E[Painel Admin]
    D -->|Não| C
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

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| **Framework** | Next.js (App Router) | 16.2 |
| **UI** | React | 19 |
| **Linguagem** | TypeScript (strict) | 5.x |
| **Estilos** | Tailwind CSS (PostCSS) | v4 |
| **Componentes** | shadcn (base-nova) | @base-ui/react |
| **Base de Dados** | PostgreSQL (Supabase) | — |
| **ORM** | Drizzle ORM | 0.45 |
| **Autenticação** | Auth.js (NextAuth v5 beta) | 5.0.0-beta |
| **Pagamentos** | Stripe Checkout | 20.x |
| **Upload de Imagens** | Uploadthing | 7.x |
| **Email** | Resend | 6.x |
| **Validação** | Zod | v4 |
| **Animações** | Framer Motion | 12.x |

---

## Design System

### Filosofia

Estética editorial de galeria — "Gagosian meets Acne Studios meets Apartamento Magazine." Cada pixel deve sentir-se intencional, silencioso e poderoso.

### Tipografia Dual-Font

| Font | Variável | Uso |
|------|----------|-----|
| **Geist** (sans-serif) | `--font-sans` | Body text, labels, navigation |
| **Playfair Display** (serif) | `--font-display` / `--font-serif` | Editorial quotes, pull-quotes, blockquotes, signature moments |

### Escala Tipográfica

| Classe | Peso | Tamanho | Uso |
|--------|------|---------|-----|
| `.heading-display` | 600 (semibold) | 3.5rem → 5.5rem | Hero statements, About intro, Identity words |
| `.heading-editorial` | — | Serif italic | Pull-quotes, section accents, blockquotes |
| `.heading-1` | 700 | 2rem → 2.5rem | Page/section headings |
| `.heading-2` | 600 | 1.5rem | Subsection headings |
| Labels | 500 | 10px, tracking 0.2em | Section labels with `──` horizontal rule prefix |

### Paleta de Cores

```css
/* Ink (texto) */
--color-ink: #1a1a1a;           /* Texto principal */
--color-ink-light: #555555;      /* Texto secundário, bio paragraphs */
--color-ink-muted: #888888;      /* Labels, placeholders, metadata */

/* Surfaces (fundos) */
--color-surface: #ffffff;        /* Fundo principal */
--color-surface-dim: #f8f7f5;    /* Fundo alternativo (warm gray) */
--color-surface-warm: #f3f1ed;   /* Newsletter, practice sections */
--color-surface-hover: #f5f5f5;  /* Hover state on list rows */

/* Borders */
--color-border: #e5e5e5;        /* Separadores subtis */
--color-border-strong: #d4d4d4;  /* Inputs, active borders */

/* Status */
--color-sold: #b91c1c;          /* Sold badge, sale badge, errors */

/* Accent */
--color-accent: #1a1a1a;        /* CTAs (matches ink) */
```

### Espaçamento

```css
--header-h: 3.5rem;             /* Header height mobile */
--header-h-md: 4.5rem;          /* Header height desktop */
--space-page-x: 1.5rem → 7.5rem; /* Horizontal margins (responsive) */
--space-section-y: 5rem → 10rem;  /* Section vertical padding (responsive) */
--max-width: 1440px;             /* Container max width */
```

### Componentes UI

| Componente | Ficheiro | Descrição |
|-----------|----------|-----------|
| **HeroSection** | `features/hero-section.tsx` | Statement monumental + imagem featured com Framer Motion stagger |
| **SocialProofBar** | `features/social-proof-bar.tsx` | Strip de venues de exposição (Server Component) |
| **FeaturedArtworks** | `features/featured-artworks.tsx` | Grid editorial assimétrico (1 hero + 3 secondary) |
| **CategoryGrid** | `features/category-grid.tsx` | 4 categorias com contagens, hover reveal, image zoom |
| **ArtistStatement** | `features/artist-statement.tsx` | Blockquote editorial + imagem estúdio + credenciais |
| **CollectorBanner** | `features/collector-banner.tsx` | Dark section targeting collectors (Server Component) |
| **NewsletterSection** | `features/newsletter-section.tsx` | "First to See New Work" com urgency copy |
| **ArtworkCard** | `features/artwork-card.tsx` | Card com badges (Sold/Sale/Edition), hover zoom `scale-[1.03]` |
| **ArtworkGrid** | `features/artwork-grid.tsx` | Grid com category descriptions, sorting, editorial text-tab filter |
| **ArtworkDetail** | `features/artwork-detail.tsx` | Gallery + lightbox + sticky sidebar com detalhes estilo museum card |
| **RelatedArtworks** | `features/related-artworks.tsx` | "More from this collection" — elimina dead-end |
| **AboutBio** | `features/about-bio.tsx` | Full-width display heading → 2-col (portrait + bio + pull-quote) |
| **AboutIdentity** | `features/about-identity.tsx` | Cycling identity words em `heading-display` (dark section) |
| **EducationTimeline** | `features/education-timeline.tsx` | 3 countries timeline com hover rows |
| **ExhibitionList** | `features/exhibition-list.tsx` | Summary + year range, solo border-accent, outline badges |
| **CollaboratorsSection** | `features/collaborators-section.tsx` | Hardcoded collaborator list |
| **PressSection** | `features/press-section.tsx` | Press items com arrow-on-hover + press inquiry CTA |
| **AppointmentSection** | `features/appointment-section.tsx` | Editorial list rows (In Person / Remote) — não cards |
| **ContactForm** | `features/contact-form.tsx` | Subject pills integrados + 2-col name/email + editorial submit |
| **NewsList** | `features/news-list.tsx` | First-item emphasis, editorial date format, fade-in arrows |
| **Breadcrumbs** | `shared/breadcrumbs.tsx` | Home / Artworks / Category / Title |
| **EditorialDivider** | `shared/editorial-divider.tsx` | Semantic `<hr>` com variant accent |
| **PullQuote** | `shared/pull-quote.tsx` | Serif italic blockquote com oversized `"` |
| **FadeIn** | `shared/fade-in.tsx` | Scroll-triggered animation com `prefers-reduced-motion` |
| **SuccessModal** | `shared/success-modal.tsx` | Animated checkmark dialog |

### Animações

- **Header**: Slide-in com nav stagger. Dot indicator com `layoutId` (guarded by `prefersReducedMotion`)
- **Hero**: Image scale-in (1.4s), text stagger, label slide horizontal
- **Secções**: `FadeIn` scroll-triggered com `whileInView` (Framer Motion)
- **Identidade**: Palavras rotativas com `AnimatePresence` (2s intervalo)
- **Hover states**: `duration-300` consistently, image zoom `scale-[1.03]` at `duration-[900ms]`
- **Todas as animações** respeitam `prefers-reduced-motion`

### Acessibilidade

- Skip-to-content link no layout raiz
- `aria-label` em todos os botões de ícone e nav landmarks
- `aria-expanded` + `aria-controls` no mobile menu toggle
- Desktop nav: `aria-label="Main navigation"` / Mobile: `aria-label="Mobile navigation"`
- Estilos `focus-visible` em todos os elementos interativos
- Navegação por teclado no lightbox (setas + Escape)
- `group-focus-within` em category grid para keyboard accessibility
- Labels semânticos em todos os campos de formulário

---

## Estrutura do Projeto

```
soraia-web/
├── public/
│   └── images/                       # Imagens locais (desenvolvimento)
│       ├── artworks/                 # 46 imagens de obras
│       ├── branding/                 # Assinaturas (light, bold, social)
│       ├── about/                    # Perfil, estúdio, processo
│       ├── studio/                   # Imagem do estúdio
│       └── contact/                  # Imagem da página de contacto
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Homepage (7 sections)
│   │   ├── about/                    # Bio + Education + Identity + Exhibitions + Collaborators + Press + CTA
│   │   ├── artworks/                 # Gallery (filter + sort + category descriptions) + Detail [slug]
│   │   ├── contact/                  # Info panel + integrated subject-pill form + newsletter
│   │   ├── soraia-space/             # Studio hero + Practice + Appointments + Exhibitions + News + Newsletter
│   │   ├── admin/                    # Painel de administração
│   │   │   ├── login/                # Login (pública)
│   │   │   └── (dashboard)/          # Rotas protegidas (CRUD completo)
│   │   └── api/                      # Rotas API (auth, checkout, contact, newsletter, webhooks)
│   ├── components/
│   │   ├── features/                 # 22 componentes de negócio
│   │   ├── layout/                   # Header, Footer, Container, Section
│   │   ├── shared/                   # FadeIn, SuccessModal, Breadcrumbs, EditorialDivider, PullQuote
│   │   └── ui/                       # Primitivos shadcn base-nova
│   ├── db/
│   │   ├── schema.ts                 # Esquema Drizzle (8 tabelas)
│   │   ├── index.ts                  # Cliente Drizzle + Supabase (postgres-js)
│   │   └── seed.ts                   # Script de população
│   ├── hooks/
│   │   ├── use-newsletter.ts         # Hook partilhado (Footer + Section)
│   │   └── use-scroll-position.ts    # Detecção de scroll para header
│   └── lib/
│       ├── queries/                  # Funções de consulta DB (com fallback)
│       ├── mappers.ts                # DB rows → tipos públicos
│       ├── mock-data.ts              # 45 obras reais + conteúdo (fallback dev)
│       ├── types.ts                  # Tipos TypeScript públicos
│       ├── structured-data.ts        # Geradores JSON-LD
│       ├── utils.ts                  # cn(), formatPrice(), slugify()
│       └── validations/              # Esquemas Zod
├── .claude/specs/
│   ├── persona-brand.md              # Persona e brand context completo
│   └── design-direction.md           # Design direction e improvement roadmap
├── proxy.ts                          # Protecção de rotas (Next.js 16)
├── drizzle.config.ts                 # Configuração Drizzle Kit
└── CLAUDE.md                         # Instruções para Claude Code
```

---

## Instalação e Configuração

### Pré-requisitos

- Node.js 20+
- pnpm (gestor de pacotes)

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/elbarroca/soraia_web.git
cd soraia_web

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Preencher com as suas credenciais (ver secção abaixo)

# 4. Iniciar servidor de desenvolvimento
pnpm dev
```

O site estará disponível em `http://localhost:3000` — funciona sem base de dados (usa dados mock automaticamente).

### Com Base de Dados (opcional)

```bash
# Sincronizar esquema com Supabase
npx drizzle-kit push

# Popular com dados de teste
npx tsx src/db/seed.ts
```

---

## Variáveis de Ambiente

Criar um ficheiro `.env.local` na raiz do projeto:

```env
# Base de Dados (Supabase) — opcional para desenvolvimento
DATABASE_URL="postgresql://postgres.xxxxxxxxxxxx:YOUR-PASSWORD@aws-0-eu-west-1.pooler.supabase.com:6543/postgres"

# Autenticação
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

# Aplicação
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
REVALIDATION_SECRET="string-aleatória"
```

---

## Base de Dados

### Esquema

A base de dados PostgreSQL (Supabase) contém 8 tabelas:

| Tabela | Descrição |
|--------|-----------|
| `artworks` | Obras de arte com título, slug, categoria, preço, visibilidade |
| `artwork_images` | Imagens das obras (URL, alt text, ordenação, primária) |
| `news` | Notícias e imprensa |
| `exhibitions` | Exposições (solo, grupo, residência, prémio) |
| `site_settings` | Configurações chave-valor do site |
| `contacts` | Submissões do formulário de contacto |
| `newsletter_subscribers` | Subscritores da newsletter |
| `orders` | Encomendas Stripe com detalhes de envio |

### Comandos Úteis

```bash
npx drizzle-kit push       # Sincronizar esquema com Supabase
npx drizzle-kit generate   # Gerar migrações
npx drizzle-kit studio     # Abrir Drizzle Studio (GUI)
npx tsx src/db/seed.ts      # Popular base de dados
```

---

## Desenvolvimento Local

### Sistema de Fallback

Todas as funções de consulta em `src/lib/queries/` possuem fallback automático para dados mock quando a base de dados não está disponível.

```
Query DB → Sucesso → Dados reais
         → Falha   → Mock data (45 obras, conteúdo real do site original)
```

### Conversion Funnels

```
Homepage
├→ "Explore Work" → Artworks (category-filtered)
│   ├→ ArtworkCard → Artwork Detail
│   │   ├→ PURCHASE → Stripe Checkout
│   │   ├→ Inquire → Contact Form (pre-filled)
│   │   └→ Related Artworks → more detail pages
│   └→ Category filter + Sort (Curated/Price/Newest)
├→ SocialProofBar (exhibition venues)
├→ FeaturedArtworks (editorial picks)
├→ CategoryGrid (with counts)
├→ CollectorBanner → Studio Visit / Available Works
├→ Newsletter ("First to See New Work")
├→ About → Bio + Education + Exhibitions + Collaborators + Press
├→ Soraia Space → Studio Visit / Online Meeting booking
└→ Contact → Subject pills + form
```

---

## Painel de Administração

Acessível em `/admin` (protegido por autenticação).

### Funcionalidades

- **Dashboard** — Estatísticas em tempo real (obras, notícias, exposições, encomendas, contactos, subscritores)
- **Obras de Arte** — Criar, editar, eliminar, reordenar. Upload de imagens via drag-and-drop
- **Notícias** — CRUD com modal
- **Exposições** — CRUD com tipo (solo/grupo/residência/prémio)
- **Configurações** — Editor chave-valor para textos do site (hero, bio, links)
- **Contactos** — Lista de submissões com marcação de lido
- **Newsletter** — Lista de subscritores com exportação CSV
- **Encomendas** — Histórico de compras com formatação de moeda e badges de estado

---

## Fluxo de Compra

```mermaid
sequenceDiagram
    participant V as Visitante
    participant S as Site
    participant St as Stripe
    participant DB as Base de Dados

    V->>S: Clica "Inquire About This Work"
    S->>S: POST /api/checkout
    S->>St: Criar Checkout Session
    St-->>S: URL da sessão
    S-->>V: Redireciona para Stripe

    V->>St: Preenche dados e paga
    St->>S: Webhook (checkout.session.completed)
    S->>DB: Inserir encomenda (valor em EUR)
    S->>DB: Marcar obra como vendida
    St-->>V: Redireciona para página de sucesso
```

### Estados de Preço

| Estado | Exibição |
|--------|---------|
| Disponível com preço | "€1,800.00" + botão Purchase |
| Preço sob consulta | "Price on request" (italic) + botão Inquire |
| Em promoção (joalharia) | Preço original riscado + preço atual + badge "Sale" |
| Vendido | "This Work Has Found Its Home" (uppercase muted text) |

---

## SEO e Performance

- **Metadados dinâmicos** em todas as páginas (`generateMetadata`)
- **Sitemap XML** dinâmico com todas as obras visíveis
- **robots.txt** — bloqueia `/admin/`
- **JSON-LD** — Schema.org (WebSite, Person, Product)
- **Open Graph** — Imagens dinâmicas por página e por obra (1200x630)
- **Favicon** — Monograma "SO" dinâmico (`icon.tsx` 32x32, `apple-icon.tsx` 180x180)
- **llms.txt** — Endpoint dinâmico para crawlers de LLM
- **Alternates** — Links hreflang (en/pt)
- **ISR** — Revalidação on-demand via `/api/revalidate`
- **Breadcrumbs** — navigation + SEO on artwork detail pages

---

## Guia de Desenvolvimento

### Comandos

```bash
pnpm dev                  # Servidor de desenvolvimento
pnpm build                # Build de produção
pnpm lint                 # ESLint
npx tsc --noEmit          # Verificação de tipos
```

### Convenções

- **Named exports** em todos os módulos partilhados (sem `export default`)
- **Páginas admin** usam `export const dynamic = "force-dynamic"`
- **Validação** com esquemas Zod em `src/lib/validations/`
- **Tipos públicos** em `src/lib/types.ts` (nunca expor tipos da DB directamente)
- **Mappers** em `src/lib/mappers.ts` (converter DB rows → tipos públicos)
- **Design tokens** via CSS custom properties em `globals.css`
- **Labels** usam `text-[10px] font-medium tracking-[0.2em] uppercase` com `──` prefix
- **Hover transitions** usam `duration-300` consistently
- **Image hover zoom** usa `scale-[1.03]` at `duration-[900ms]`
- **Server Components** por defeito; `"use client"` apenas quando necessário (hooks, events)

### Categorias de Obras

| Slug | Total | Descrição |
|------|-------|-----------|
| `photography` | 13 | Self-portraiture & fine art prints |
| `artist-proofs` | 11 | Rare annotated editions |
| `drawings` | 14 | Charcoal, graphite & ink on paper |
| `jewelry` | 8 | Wearable sculpture — limited editions (all on sale) |

---

## Deploy

### Vercel (Recomendado)

```bash
pnpm install -g vercel
vercel login
vercel --prod
```

### DNS

```
A      @    76.76.21.21
CNAME  www  cname.vercel-dns.com
```

### Pós-Deploy

- Atualizar `NEXT_PUBLIC_BASE_URL` para o domínio de produção
- Atualizar URL do webhook Stripe para produção
- Submeter sitemap no Google Search Console
- Migrar imagens de `/public/images/` para Uploadthing CDN

---

## Licença

Projeto privado. Todos os direitos reservados.

Desenvolvido para **Soraia Oliveira** — artista visual, Guimarães, Portugal.  ![alt text](image.png)