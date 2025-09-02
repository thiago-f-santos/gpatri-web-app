# 📦 gPatri — Front-end para Gerenciamento de Patrimônios

gPatri-web-app é o front-end de um sistema de gerenciamento de patrimônios escolares, desenvolvido para atender às demandas do núcleo **NumbERS**.  
Este projeto foi criado utilizando o framework **Angular** e integra-se com uma API back-end REST, também disponível no GitHub.

⚠️ **Atenção:** Este software ainda **não está em estágio final de produção**. Está em desenvolvimento ativo e sujeito a mudanças. No entanto, se desejar utilizá-lo em produção por conta própria, veja instruções mais abaixo.

---

## 🔗 Projeto relacionado

Este projeto depende do back-end para funcionar corretamente. Você pode acessá-lo aqui:  
👉 [gPatri (API)](https://github.com/thiago-f-santos/gPatri.git)  

---

## 🚀 Como iniciar o projeto

Para iniciar o projeto em modo de desenvolvimento, siga os passos abaixo:

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- [Angular CLI](https://angular.io/cli) instalado globalmente  
  ```bash
  npm install -g @angular/cli
  ```

### 2. Clone o repositório

```bash
git clone https://github.com/thiago-f-santos/gpatri-web-app.git
cd gpatri-web-app
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o ambiente

Edite o arquivo `src/environments/environment.ts` e defina a URL da API utilizada no desenvolvimento:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000' // Altere para a URL da sua API, se necessário
};
```

### 5. Rode o servidor de desenvolvimento

```bash
ng serve
```

Depois disso, acesse http://localhost:4200 no seu navegador.
A aplicação será recarregada automaticamente sempre que você salvar alterações nos arquivos-fonte.

## 🏁 Utilização em Produção

Embora o projeto **ainda não esteja em estágio final de produção**, você pode utilizá-lo por sua conta e risco.  
Para isso, siga os passos abaixo:

### 1. Configure o ambiente de produção

Edite o arquivo `src/environments/environment.prod.ts` e insira a URL da sua API no campo `apiUrl`:

```ts
export const environment = {
  production: true,
  apiUrl: 'https://sua-api-em-producao.com'
};
```

### 2. Gere o build de produção

```bash
ng build --configuration=production
```

Os arquivos finais serão gerados na pasta `dist/`, prontos para serem hospedados.

---

## 📌 Observações

- Este projeto está em **desenvolvimento ativo** e ainda **não está em estágio final de produção**.
- Funcionalidades estão sujeitas a mudanças.
- Contribuições são bem-vindas! Sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.
- Caso encontre problemas ou deseje sugerir melhorias, nos avise por aqui no repositório.

---

**Desenvolvido por [Thiago Ferreira](https://github.com/thiago-f-santos)**