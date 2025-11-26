# 🌸 Buquê Maceió - Loja de Buquês de Flores

Uma aplicação e-commerce moderna e responsiva para venda de buquês de flores, desenvolvida com Next.js, React e TypeScript.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Páginas e Rotas](#páginas-e-rotas)
- [Funcionalidades Detalhadas](#funcionalidades-detalhadas)
- [Otimizações de Performance](#otimizações-de-performance)
- [Deploy](#deploy)

## 🎯 Sobre o Projeto

Buquê Maceió é uma plataforma de e-commerce especializada em buquês de flores artesanais. A aplicação oferece uma experiência de compra completa com funcionalidades como carrinho de compras, sistema de favoritos, busca de produtos, filtros avançados e muito mais.

## 🛠️ Tecnologias Utilizadas

### Core
- **Next.js 15.4.6** - Framework React com SSR/SSG
- **React 19.1.1** - Biblioteca JavaScript para interfaces
- **TypeScript 5.9.2** - Superset JavaScript com tipagem estática

### Estilização
- **Tailwind CSS 4.1.11** - Framework CSS utility-first
- **CSS Modules** - Estilos modulares por componente
- **Framer Motion 12.23.12** - Biblioteca de animações

### Ícones e UI
- **Lucide React 0.540.0** - Biblioteca de ícones
- **React Icons 5.5.0** - Conjunto adicional de ícones
- **Heroicons 2.2.0** - Ícones SVG otimizados

### Utilitários
- **Axios 1.11.0** - Cliente HTTP
- **UUID 11.1.0** - Geração de identificadores únicos
- **Zod 4.0.5** - Validação de esquemas TypeScript

### Gráficos e Visualizações
- **Chart.js 4.5.0** - Biblioteca de gráficos
- **React Chart.js 2 5.3.0** - Wrapper React para Chart.js
- **Recharts 3.1.0** - Biblioteca de gráficos para React

### Performance
- **React Intersection Observer 9.16.0** - Lazy loading de componentes

## ✨ Funcionalidades

### 🏠 Página Inicial
- **Carrossel de imagens** com transições suaves
- **Seção de categorias** de buquês
- **Buquês em destaque** com cards interativos
- **Seção de diferenciais** da loja
- **Promoções da semana** com produtos em oferta
- **Lazy loading** para otimização de performance

### 🛍️ Catálogo de Produtos
- **Grid de produtos** responsivo
- **Sistema de busca** em tempo real
- **Filtros avançados**:
  - Por categoria
  - Por sentimento/ocasião
  - Por faixa de preço
- **Ordenação** (preço, popularidade, etc.)
- **Paginação** de resultados
- **Sidebar de filtros** colapsável

### 📦 Página de Produto
- **Galeria de imagens** do produto
- **Informações detalhadas** (descrição, preço, avaliações)
- **Controle de quantidade**
- **Botões de ação**:
  - Adicionar ao carrinho
  - Adicionar aos favoritos
- **Breadcrumbs** para navegação
- **Produtos relacionados**

### 🛒 Carrinho de Compras (Página de Pedidos)
- **Listagem de itens** no carrinho
- **Seleção múltipla** de produtos
- **Controle de quantidade** por item
- **Remoção de itens**
- **Cálculo automático** de:
  - Preço total
  - Promoções (30% de desconto)
  - Subtotal final
- **Resumo do pedido** com preview dos produtos
- **Botão de fechar pedido**
- **Seção de favoritos** integrada

### ❤️ Sistema de Favoritos
- **Adicionar/remover** produtos dos favoritos
- **Armazenamento por usuário** (requer login)
- **Visualização** na página de perfil
- **Integração** com outras páginas

### 👤 Perfil do Usuário
- **Informações do usuário**
- **Lista de favoritos** completa
- **Histórico de pedidos** (se implementado)
- **Configurações de conta**

### 🔍 Busca e Navegação
- **Barra de busca** no header
- **Preview de resultados** durante a digitação
- **Navegação por categorias**
- **Links de navegação rápida** no footer

## 📁 Estrutura do Projeto

```
buque-maceio/
├── public/
│   └── images/          # Imagens estáticas (buquês, carrossel, ícones)
├── src/
│   └── app/
│       ├── components/  # Componentes reutilizáveis
│       │   ├── layout/  # Header, Footer
│       │   ├── products/ # Componentes de produtos
│       │   └── sections/ # Seções da landing page
│       ├── data/        # Dados estáticos (produtos)
│       ├── hooks/       # Custom hooks React
│       ├── pedidos/     # Página do carrinho
│       ├── perfil/      # Página de perfil
│       ├── produto/     # Páginas de detalhes do produto
│       ├── styles/      # Estilos globais e por componente
│       ├── types/       # Definições TypeScript
│       ├── utils/       # Funções utilitárias
│       ├── layout.tsx   # Layout raiz
│       └── page.tsx     # Página inicial
├── next.config.ts       # Configuração do Next.js
├── tailwind.config.js   # Configuração do Tailwind
├── tsconfig.json        # Configuração do TypeScript
└── package.json         # Dependências e scripts
```

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passos

1. **Clone o repositório** (ou navegue até a pasta do projeto)
   ```bash
   cd buque-maceio
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run start` | Inicia servidor de produção (após build) |
| `npm run lint` | Executa o linter ESLint |
| `npm run lint:fix` | Corrige automaticamente problemas do linter |
| `npm run export` | Gera build estático para deploy |
| `npm run deploy` | Build e deploy no Surge.sh |

## 🗺️ Páginas e Rotas

### Rotas Principais

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com carrossel, categorias e produtos em destaque |
| `/produto` | Catálogo completo de produtos com filtros |
| `/produto/[slug]/[id]` | Página de detalhes de um produto específico |
| `/pedidos` | Carrinho de compras e resumo do pedido |
| `/perfil` | Perfil do usuário e favoritos |

### Ancoras na Página Inicial

- `#inicio` - Carrossel principal
- `#tipos` - Seção de categorias
- `#buques` - Buquês em destaque
- `#diferenciais` - Nossos diferenciais
- `#promocoes` - Promoções da semana

## 🔧 Funcionalidades Detalhadas

### Sistema de Carrinho

O carrinho utiliza `localStorage` para persistência e suporta múltiplos usuários:

- **Carrinho por usuário**: Cada usuário logado tem seu próprio carrinho
- **Carrinho de visitante**: Usuários não logados usam um carrinho genérico
- **Eventos customizados**: Atualizações do carrinho disparam eventos para sincronizar componentes
- **Operações disponíveis**:
  - Adicionar produto
  - Remover produto
  - Atualizar quantidade
  - Limpar carrinho completo

**Arquivo**: `src/app/utils/cartUtils.ts`

### Sistema de Favoritos

Os favoritos são armazenados por usuário e requerem login:

- **Autenticação necessária**: Apenas usuários logados podem favoritar
- **Armazenamento por usuário**: Cada usuário tem sua própria lista
- **Sincronização**: Eventos customizados atualizam componentes em tempo real

**Arquivo**: `src/app/utils/favoritesUtils.ts`

### Sistema de Busca

- **Busca em tempo real** durante a digitação
- **Filtragem por nome** do produto
- **Preview de resultados** no header
- **Navegação direta** para produtos encontrados

### Filtros e Ordenação

- **Filtros por categoria**: Romântico, Alegre, Delicado, etc.
- **Filtros por sentimento**: Amor, Amizade, Gratidão, etc.
- **Filtro por preço**: Faixa de valores configurável
- **Ordenação**: Preço (crescente/decrescente), popularidade

**Hook**: `src/app/hooks/useProductFilters.ts`

### Geração de URLs

Sistema de slugs para URLs amigáveis:

- **Slugs automáticos**: Geração baseada no nome do produto
- **URLs estáticas**: Suporte a geração estática no build
- **Formato**: `/produto/buque-de-rosas/1`

**Arquivo**: `src/app/utils/slugUtils.ts`

## ⚡ Otimizações de Performance

### Lazy Loading
- **Componentes**: Seções da landing page carregam sob demanda
- **Imagens**: Lazy loading de imagens com `LazyImage`
- **Intersection Observer**: Detecta quando elementos entram na viewport

### Pré-carregamento
- **Imagens críticas**: Pré-carregamento de imagens importantes
- **Fontes**: Otimização de carregamento de fontes Google

### Code Splitting
- **Rotas**: Cada página é um bundle separado
- **Componentes**: Componentes grandes são carregados sob demanda

### Build Estático
- **Export estático**: Suporte a geração de site estático
- **SSG**: Static Site Generation para páginas de produtos
- **Otimização para Surge.sh**: Configuração específica para deploy estático

**Componentes de Performance**:
- `LazySection.tsx` - Wrapper para lazy loading
- `LazyImage.tsx` - Componente de imagem com lazy loading
- `PerformanceOptimizer.tsx` - Otimizador geral de performance

## 🚢 Deploy

### Deploy no Surge.sh

O projeto está configurado para deploy estático no Surge:

1. **Build do projeto**
   ```bash
   npm run build
   ```

2. **Deploy automático**
   ```bash
   npm run deploy
   ```

3. **Deploy manual**
   ```bash
   surge ./out
   ```

### Configuração de Deploy

O `next.config.ts` está configurado com:
- `output: 'export'` - Gera site estático
- `trailingSlash: true` - Compatibilidade com servidores estáticos
- `images: { unoptimized: true }` - Desabilita otimização de imagens para export estático

## 📝 Notas Adicionais

### Armazenamento Local
- O projeto utiliza `localStorage` para:
  - Carrinho de compras
  - Favoritos
  - Estado de login do usuário
  - Histórico de navegação

### Autenticação
- Sistema de autenticação básico via `localStorage`
- Chaves: `isLoggedIn`, `userName`
- Favoritos requerem usuário logado

### Dados de Produtos
- Produtos estão em `src/app/data/products.ts`
- Estrutura de dados definida em `src/app/types/product.ts`
- Suporte a produtos com preços originais e promocionais

## 🎨 Design e UX

- **Design moderno** e limpo
- **Cores**: Paleta consistente com tema floral
- **Tipografia**: Inter, Alegreya SC, Nunito Sans
- **Responsividade**: Layout adaptável para mobile e desktop
- **Animações**: Transições suaves com Framer Motion
- **Acessibilidade**: Componentes semânticos e navegação por teclado

## 📄 Licença

Este projeto é privado.

---

**Desenvolvido com ❤️ para Buquê Maceió**
