import User from '../models/User';

class UserController {
    async store(req, res){
        const userExists = await User.findOne({
            where: {email: req.body.email}
        });

        if (userExists){
            return res.status(400).json({error: 'Usuario já existe'});
        }else{
            const {id, name, email, provider } = await User.create(req.body);
            return res.json(
                {
                    id,
                    name,
                    email,
                    provider,
                }
            );
        }
    }

    async update(req, res){
        const {email, oldPassword} = req.body;
        const user = await User.findByPk(req.userId);

        if (email !== user.email){ // se o email informado no request difere do email atual
            const userExists = await User.findOne({where: {email: req.body.email}}); // entao ele pesquisa na base, se há algum email igual já cadastrado
            if(userExists){ // caso exista, retorna um error, caso não.. ok
                return res.status(400).json({ error: "Esse usuário já existe."});
            }
        }

        if(oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({error: "Senha não corresponde."})
        }

        const {id, name, provider } = await user.update(req.body);

        return res.json(
            {
                id,
                name,
                email,
                provider,
            }
        );
    }
}

export default new UserController();
