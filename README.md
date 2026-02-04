# PrimeWeb Studios

Site profissional da PrimeWeb Studios - Agência especializada em criação de sites modernos e responsivos.

## Estrutura do Projeto

```
/
├── index.html          # Arquivo principal HTML
├── style.css           # Estilos CSS
├── script.js           # JavaScript
├── img/                # Pasta com todas as imagens
│   ├── smartphone-hero.jpg
│   ├── smartphone-products.jpg
│   ├── smartphone-categories.jpg
│   ├── law-hero.jpg
│   ├── law-hero-alt.jpg
│   ├── law-services.jpg
│   ├── law-testimonials.jpg
│   ├── fitness-hero.jpg
│   ├── fitness-about.jpg
│   ├── fitness-classes.jpg
│   ├── fitness-pricing.jpg
│   ├── fitness-contact.jpg
│   ├── delivery-hero.png
│   ├── delivery-cart.png
│   ├── fashion-hero.png
│   ├── fashion-products.png
│   ├── fashion-contact.png
│   ├── car-hero.jpg
│   ├── car-catalog.jpg
│   └── car-contact.jpg
├── .gitignore          # Arquivos ignorados pelo Git
└── README.md           # Este arquivo

```

## Como usar localmente

1. Abra o arquivo `index.html` em seu navegador
2. O site será carregado completamente sem necessidade de servidor

## Deploy no GitHub Pages

### Opção 1: Site do Usuário/Organização (recomendado)

1. Crie um repositório no GitHub com o nome: `username.github.io`
   - Substitua `username` pelo seu nome de usuário do GitHub

2. Clone o repositório:
   ```bash
   git clone https://github.com/username/username.github.io.git
   cd username.github.io
   ```

3. Copie os arquivos do projeto para o repositório:
   - `index.html`
   - `style.css`
   - `script.js`
   - Pasta `img/` completa

4. Faça o primeiro commit:
   ```bash
   git add .
   git commit -m "Adiciona site PrimeWeb Studios"
   git push origin main
   ```

5. Seu site estará disponível em: `https://username.github.io`

### Opção 2: Projeto/Repositório Existente

1. Clone seu repositório:
   ```bash
   git clone https://github.com/username/seu-repositorio.git
   cd seu-repositorio
   ```

2. Crie uma pasta chamada `docs` ou use a raiz do repositório

3. Copie os arquivos:
   - `index.html`
   - `style.css`
   - `script.js`
   - Pasta `img/` completa

4. Faça o commit:
   ```bash
   git add .
   git commit -m "Adiciona site PrimeWeb Studios"
   git push origin main
   ```

5. Acesse as configurações do repositório no GitHub:
   - Vá para **Settings** > **Pages**
   - Em **Source**, selecione:
     - Branch: `main`
     - Pasta: `/root` (se na raiz) ou `/docs` (se em pasta)
   - Clique em **Save**

6. Seu site estará disponível na URL mostrada em **Pages**

## Recursos

- ✅ Design moderno com cores profissionais (azul #2196F3 e ciano #5CEAFF)
- ✅ Responsivo para todos os dispositivos
- ✅ Seções: Hero, Planos, Modelos, Localização, Contato
- ✅ Modal com galeria de imagens dos templates
- ✅ Formulário de contato integrado com WhatsApp
- ✅ Navegação mobile responsiva

## Navegação

- **Início**: Hero section com call-to-action
- **Planos**: Três planos de serviço
- **Modelos**: 6 templates de sites diferentes com previews
- **Localização**: Mapa e endereço
- **Contato**: Formulário integrado com WhatsApp

## Suporte

Para alterações ou customizações, edite os arquivos:
- `index.html` - Conteúdo e estrutura
- `style.css` - Estilos e cores
- `script.js` - Funcionalidades e interações
