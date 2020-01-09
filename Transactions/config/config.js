const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env)
    {
        case 'dev':
        return {
            port: 3002,
            bd_string: 'mongodb+srv://root:root@clusterapi-dyoen.mongodb.net/test?retryWrites=true&w=majority',
            jwt_pass: 'senha-aleatória',
            jwt_expires: '7d'
        }

        case 'prod':
        return {
            port: 3002,
            bd_string: 'mongodb+srv://root:root@clusterapi-dyoen.mongodb.net/test?retryWrites=true&w=majority',
            jwt_pass: 'senha-aleatória',
            jwt_expires: '7d'
        }
    }
}

console.log(`# TRANSACTION: Iniciando a API em ambiente ${env.toUpperCase()} na porta ${config().port}`);
module.exports = config();