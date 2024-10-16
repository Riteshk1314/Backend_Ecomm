const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;
}
const getUserProfileByToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.UserId;
    } catch (error) {
        throw new Error(error);
    }
}