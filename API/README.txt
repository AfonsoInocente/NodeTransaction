## - API
EXEC: supervisor -e js,hbs index.js
Porta Fixada: 3000 (config)

Dependências utilizadas:
# express: gerênciamento de requisições 
# body-parser: interpretação do JSON 
# axios: API utilizada pra as comunicações entre servidores
# supervisor: script de "supervisão" para o servidor, que provém um reinicio em caso de queda

OBS: para as listagens de transações (com filtros) e de clientes, é necessário utilizar o header "admin: true" para que obtenha acesso

/*
MELHORIAS:
- start único para os servidores
- code coverage para garantir que todo o código esteja sendo realmente utilizado
*/