# Testando a aplicação
Este é um guia *recomendado* para se seguir ao testar os endpoints da aplicação.

1) Execute o endpoint [POST] /customer para criar um novo usuário/consumidor.
2) Em caso de sucesso, o endpoint irá retornar uma mensagem dos sistema e o **customerUid** do consumidor criado.
3) Execute o endpoint [POST] /transaction, alterando o **customerUid** para o recebido como resposta do endpoint de criação de consumidor. Deve-se passar um customerUid que já esteja cadastrado no banco para funcionar corretamente, assim como um **paymentMethod** domínio da aplicação ['debit_card', 'credit_card'].
4) Execute o endpoint [GET] /transaction para recuperar **todas** as transações, e seus respectivos *payable* e *customer*, cadastradas no banco de dados da aplicação.
5) Execute o endpoint [GET] /customer/{customerUid}/balance, informando o ***customerUid*** desejado para obter seu saldo, para receber o saldo a receber (***waiting_funds***) e recebido (***paid***).