import Sequelize, {Model} from 'sequelize'; // Using sucrase to implements this syntax..
import bcrypt from 'bcryptjs';

class User extends Model {
    static init (sequelize){
        super.init(
            {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async (user) =>{
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        }); // beforeSave - método do Sequelize.

        return this
    }
    // Compara a senha fornecida pelo usuário à senha armazenada no banco.
    checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
