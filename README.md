# payment-service-provider
Simple Payment Service Provider application

### Rodando a aplicação [Docker]

Clone este repositório na sua máquina executando o comando
```
git clone https://github.com/mukaportes/payment-service-provider
```

Entre no diretório da aplicação
```
cd path/to/payment-service-provider
```

Para criar o container no qual a aplicação irá rodar, execute o comando
```
docker-compose build
```

Após a criação do ambiente, execute o comando abaixo para rodar as migrations e iniciar a aplicação na porta 3000
```
docker-compose up
```

**Nota**: ao rodar o comando que inicia a aplicação, apenas as migrations que novas serão executadas no banco de dados. É utilizado o comando ***migrate:latest*** do pacote **Knex** para este efeito


### Rodando a aplicação [any]
1. Clone este repositório na sua máquina executando o comando
```
git clone https://github.com/mukaportes/payment-service-provider
```

2. Entre no diretório da aplicação
```
cd path/to/payment-service-provider
```

3. O setup inicial para rodar a aplicação é o Node.js >= 10 e PostgreSQL >= 10

4. Ao instalar as ferramentas necessárias, crie um novo banco de dados

5. Na raíz do diretório da aplicação, crie um arquivo com o nome **.env** contendo as variáveis abaixo:
```
DATABASE_NAME=nome_do_banco_criado
DATABASE_HOST=localhost
DATABASE_PASSWORD=senha_do_user_postgres
DATABASE_PORT=5432
DATABASE_USER=nome_do_user_postgres
```

6. Execute o comando a seguir para instalar as dependências da aplicação
```
npm install
```

7. Rode as migrations para criação das tabelas do banco de dados
```
npm run migrate
```

8. Para iniciar a aplicação na porta 3000, execute
```
npm start
```

### Alterando credenciais
Para alterar as variáveis de ambiente da aplicação, basta ir ao arquivo **docker-compse.yaml** e alterar as seguintes linhas:

```
environment:
  DATABASE_NAME: your_db_name
  DATABASE_HOST: postgres
  DATABASE_PASSWORD: your_db_password
  DATABASE_PORT: 5432 (or another port rather than the Postgres default one)
  DATABASE_USER: your_db_user
  NODE_ENV: your_node_environment
```

### Documentação da aplicação
Ao iniciar a aplicação, podemos visualizar a documentação da aplicação - utlizando **Swagger** - ao ir ao endereço `http://localhost:3000/docs`.

### Informações adicionais
Dentro da pasta **/_utils** pode-se encontrar uma collection do *Postman* para se efetuar testes da aplicação e também um guia para execução destes.

### Domínios da aplicação
**Payment Method**
```
debit_card
credit_card
```

**Payable Status**
```
paid
waiting_funds
```

 
