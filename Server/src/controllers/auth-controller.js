const userService = require('../services/user-service');
const jwtProvider = require('../config/jwt');
const bcrypt = require('bcrypt');
const cartService = require('../services/cart-service');
const register = async (req, res) => {
    try {
        const user= await userService.createUser(req.body);
        const jwtToken=jwtProvider.generateToken(user._id);
        await cartService.createCart(user);
        return res.status(201).json({user,jwtToken,MessageChannel:'User created successfully'})
    }
    catch(error){
        return res.status(400).json({error:error.message});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const jwtToken = jwtProvider.generateToken(user._id);
        return res.status(200).json({ user, jwtToken, message: 'User logged in successfully' });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
module.exports = { register, login };