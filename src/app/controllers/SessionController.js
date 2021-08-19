// Controller de Autenticação (JWT)
import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController{
    async store(req, res) {
        const {email, password} = req.body;

        // Verificar se o email fornecido pelo usuário existe.
        const user = await User.findOne({where: {email} });
        if(!user){
            return res.status(401).json({error: "Usuário não encontrado."});
        }
        // Verifica se a senha corresponde
        if(!await user.checkPassword){
            return res.status(401).json({error: "Senha não corresponde."});
        }

        const {id, name} = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            // No segundo parametro é nececssário informar uma string unica e segura,
            // sendo assim, inseri uma string criptografada usando o site MD5 Online
            token: jwt.sign({ id }, '0f117ac47b9cff98a99e2438efadb3a3', {
                expiresIn: '7d', // O terceiro parametro do método Sign, seria o de um objeto onde voce pode definir algumas configurações adicionais à autenticação..
            }),                  // esse "expiresIn" por exemplo, define que o token gerado automaticamente terá 7 dias até expirar.
        });
    }
}

export default new SessionController();
