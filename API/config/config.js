const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env)
    {
        case 'dev':
        return {
            port: 3000
        }

        case 'prod':
        return {
            port: 3000
        }
    }
}

console.log(`# API: Iniciando em ambiente ${env.toUpperCase()} na porta ${config().port}`);
module.exports = config();