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

#### Considerações

**O sistema estaria pronto para ir para produção?**  
- Em termos de segurança, creio que não. Apenas com uma camada externa/gateway de autenticação, uma vez que a API está 'aberta'. Porém, pensando pelo lado de concorrência e performance, sim, estaria. As tabelas e operações envolvem apenas INSERT e SELECT, ou seja, não teríamos problema de locks no banco e as operações disponíveis não consomem uma grande quantidade de memória, mantendo a saúde de um server hospedando a aplicação. Temos também uma config de database pool definida de forma que rode de forma escalável em sistemas de banco de dados de qualquer dimensão, tendo 'poucas' conexões definidas no pool para garantir que haja mais de um container operando sem problemas quando a aplicação é escalada.





 
