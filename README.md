# Portifolio.dev

Portfolio pessoal de Kaua Molina com foco em backend, sistemas web e exibicao automatica de projetos publicados no GitHub.

## Demo

- Site publicado: [molinexxx.github.io/Portifolio.dev](https://molinexxx.github.io/Portifolio.dev/)

## Visao Geral

Este portfolio foi construido como um site estatico e apresenta:

- hero com apresentacao profissional
- secao de projetos sincronizada com repositórios publicos do GitHub
- projetos principais em destaque com estudos de caso
- ordenacao por relevancia para os projetos secundarios
- cache local para reduzir chamadas excessivas a GitHub API
- imagens UML personalizadas para projetos selecionados
- visualizacao ampliada das imagens ao clicar na capa do projeto

## Destaques Atuais

- `Projeto SaaS Barbearia`
- `Assistencia Gtech`
- `Jogo da Memoria`

## Recursos Implementados

- Integracao com a GitHub API para buscar repositórios publicos
- Curadoria de destaques com prioridade manual
- Fallback com cache local quando a API falha ou atinge limite
- Exibicao de:
  - estrelas
  - forks
  - linguagem principal
  - data de atualizacao
- Selos visuais de relevancia e categoria nos cards
- Lightbox para ampliar imagens dos projetos

## Estrutura Do Projeto

```text
Portifolio.dev/
|- index.html
|- styles.css
|- script.js
|- README.md
|- assets/
   |- kaua-molina.jpeg
   |- projects/
      |- README.md
      |- project-barbearia.svg
      |- Assistencia-Gtech.svg
      |- Jogo_da_memoria-uml.svg
      |- Jogo_da_memoria.svg
      |- imagem_jogo-da_memoria.png
```

## Como Rodar Localmente

Como o projeto atual e estatico, nao precisa de `npm` nem `package.json`.

Voce pode abrir direto o `index.html` no navegador ou usar um servidor local:

```powershell
cd "c:\Users\Administrator\Desktop\Portifolio.dev"
py -m http.server 5500
```

Depois abra:

- [http://localhost:5500](http://localhost:5500)

## Como Atualizar Os Projetos

- publique ou atualize um repositorio no GitHub
- abra o portfolio
- clique no botao `Atualizar projetos`

O portfolio:

- busca os repositorios publicos
- reorganiza os destaques
- aplica ordenacao por relevancia
- atualiza a grade secundaria automaticamente

## Imagens Dos Projetos

As imagens locais dos projetos ficam em `assets/projects/`.

O portfolio tenta usar primeiro imagens locais com o nome do repositorio. Se nao encontrar, usa a capa gerada pelo GitHub.

Exemplos:

- `project-barbearia.svg`
- `Assistencia-Gtech.svg`
- `Jogo_da_memoria-uml.svg`

## UMLs Criadas

Foram adicionadas imagens UML conceituais para:

- `Projeto SaaS Barbearia`
- `Assistencia Gtech`
- `Jogo da Memoria`

## Tecnologias Utilizadas

- `HTML`
- `CSS`
- `JavaScript`
- `GitHub API`
- `LocalStorage`
- `GitHub Pages`

## Objetivo

Apresentar projetos reais, evolucao tecnica e capacidade de construir sistemas web com foco em:

- Java
- PHP
- MySQL
- CRUD
- organizacao de codigo
- backend e desenvolvimento web
