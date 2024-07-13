import User from '../models/user.model';
import bcrypt from 'bcryptjs';

const bcryptSalt = bcrypt.genSaltSync(10);

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
