import * as UserService from './user.service';
import jwt from 'jsonwebtoken';

export const authenUser = async (username, password) => {
    let user = await UserService.findbyUserName(username);
    if (user) {
        let compare = await UserService.comparePass(password, user.password);
        return [compare, user]
    } else {
        let error = new Error("username not exist");
        error.status = 404;
        throw error
    }
}

export const generateAccessToken = async (payload) => {
    let secret = process.env.ACCESSTOKEN_SECRET;
    let accessToken = await jwt.sign(payload, secret, {
        expiresIn: '30m'
    })
    return accessToken
}

export const generateRefreshToken = async (payload) => {
    let secret = process.env.REFRESHTOKEN_SECRET;
    let accessToken = await jwt.sign(payload, secret, {
        expiresIn: '30d'
    })
    return accessToken
}

export const getNewToken = async (userId, refreshToken) => {
    console.log(userId, refreshToken);
    let user = await UserService.findById(userId);
    if (user.refreshToken != refreshToken) {
        let err = new Error("Forbiden"); err.status = 403; throw err;
    } else {
        let [newAccessToken, newRefreshToken] = await Promise.all([
            generateAccessToken({ id: userId, username: user.username }),
            generateRefreshToken({ id: userId, username: user.username })
        ]);
        await UserService.updateRefreshToken(userId, newRefreshToken)
        return { accessToken: newAccessToken, refreshToken: newRefreshToken }
    }
}