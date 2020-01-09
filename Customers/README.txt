## - CUSTOMERS
EXEC: supervisor -e js,hbs index.js
Porta Fixada: 3001 (config)

Dependências utilizadas:
# mongoose: referênciamento ao MongoDB
# express: gerênciamento de requisições 
# bcrypt-nodejs: criptografia e validação da senha do usuário
# body-parser: interpretação do JSON 
# jsonwebtoken: validação/autênticação do usuário
# supervisor: script de "supervisão" para o servidor, que provém um reinicio em caso de queda

OBS: para as listagens de transações (com filtros) e de clientes, é necessário utilizar o header "admin: true" para que obtenha acesso