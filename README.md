# 🧪 Desafio Cypress Web — EBAC Shop

Projeto de automação de testes **E2E (End-to-End)** desenvolvido para validar o fluxo completo de **compra e checkout** na loja virtual EBAC Shop.

🔗 Sistema sob teste:  
`http://lojaebac.ebaconline.art.br/`

---

## 🎯 Objetivo do projeto

Demonstrar domínio em:

✔ Automação web com **Cypress**  
✔ Boas práticas de escrita e organização de testes  
✔ Uso de **Custom Cypress Commands**  
✔ Geração de dados dinâmicos com **Faker (PT-BR)**  
✔ Geração de reports com o **mochawesome**  
✔ Validação do fluxo de compra completo:

- Adicionar produto ao carrinho
- Alterar quantidade
- Remover item
- Checkout com criação de conta
- Finalização de pedido com sucesso

---

## 🛠 Tecnologias, Ferramentas e Bibliotecas

| Tecnologia / Biblioteca   | Descrição                                      |
|---------------------------|-----------------------------------------------|
| **Node.js**               | Ambiente de execução JavaScript              |
| **Cypress 13+**           | Framework de testes E2E                      |
| **@faker-js/faker (PT-BR)** | Geração de dados válidos e aleatórios do Brasil |
| **cypress-slow-down**     | Ajuste da velocidade de execução para depuração |
| **JavaScript ES6**        | Linguagem padrão do projeto                  |
| **mochawesome**           | Geração de relatórios de execução            |

---

## 📁 Estrutura do Projeto

```text
📦 desafio-cypress-QA
├── cypress/
│   ├── e2e/
│   │   └── checkout.cy.js        # Cenários de testes
│   ├── support/
│   │   └── commands.js           # Funções customizadas de automação
│   └── fixtures/                 # Massa de dados (se necessário)
├── cypress.config.js             # Configurações gerais do Cypress
├── package.json                  # Dependências e scripts de execução
└── README.md                     # Documentação do projeto
 
 
📌 Cenários de Teste Automatizados
ID
Cenário
CT01
Adicionar produto ao carrinho e validar subtotal
CT02
Alterar a quantidade do item no carrinho
CT03
Remover item do carrinho e validar carrinho vazio
CT04
Realizar checkout com dados válidos
CT05
Validar recebimento do pedido após finalização
Copiar tabela
 
🚀 Como instalar e executar o projeto
📌 Pré-requisitos
• 
Node.js 18+
• 
Git instalado
📦 Instalação
bash
Copiar
git clone https://github.com/X4Deve/desafio-cypress-QA.git
cd desafio-cypress-QA
npm install
📦 Instalar dependências de reports (Mochawesome)
bash
Copiar
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
 
▶ Executar testes no modo interativo (GUI)
bash
Copiar
npx cypress open
🧵 Executar testes no modo headless + gerar report
bash
Copiar
npx cypress run
npm run test:report
 
🤖 Dados dinâmicos com Faker PT-BR
Exemplo de geração de dados utilizados no checkout:
js
Copiar
const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const email = faker.internet.email({ firstName, lastName })
const phone = faker.phone.number('119########')
const postcode = faker.location.zipCode('########')
 
🧷 Seletores assertivos aplicados
Elemento
Seletor
Tamanho do produto
li.button-variable-item[data-value="M"]
Cor do produto
li.button-variable-item[data-value="White"]
Botão adicionar ao carrinho
button.single_add_to_cart_button
Campo de senha
input#account_password
Aceite dos termos
input#terms
Finalizar compra
input#place_order
Mensagem de pedido recebido
p.woocommerce-thankyou-order-received
Copiar tabela
 
👨‍💻 Autor
Fagner
Projeto criado para fins de avaliação técnica e demonstração de habilidades em automação de testes com Cypress.
 
📄 Licença
Uso livre para fins educacionais ou demonstrativos.