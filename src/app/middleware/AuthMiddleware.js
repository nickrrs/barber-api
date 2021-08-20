import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import {promisify} from 'util';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({error: "Token não estabelecido."});
    }

    const [, token] = authHeader.split(' '); // ao utilizar "," na primeira posição do array, ele desconsidera o primeiro valor do array.

    try{
        const decoded = await promisify(jwt.verify)(token, authConfig.secret); // É meio complicado, mas basicamente, é realizada uma verificação do token e nos retorna os valores do
                                                                               // payload (id do usuario), data de expiração do token.
        req.userId = decoded.id; //Atráves dessa declaração, eu posso passar para o corpo da requisição o ID do usuário logado que está disponível no token gerado.
        return next();            // Esse ID então pode ser utilizado dentro do controller do usuário (update no usuario por exemplo).
    }catch(err){                  // Lembrando que: com o next(), a proxima chamada da rota, dentro de routes, é executada após a execução desse middleware.
        return res.status(401).json({error: "Token inválido."});
    }
};
