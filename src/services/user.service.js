import db from '../models';
import bcrypt from 'bcrypt';
const UserModel = db.models.User;

export const checkUser = async (username) => {
    let user = await findbyUserName(username)
    if (user) {
        let error = new Error("User Exist");
        error.status = 409;
        throw error
    }
    return true
}
export const createUser = async (username, password) => {
    let check = await checkUser(username);
    if (check) {
        let salt = await bcrypt.genSalt();
        let hashpass = await bcrypt.hash(password, salt);
        let user = await UserModel.create({ username, password: hashpass });

        return user;
    }

}

export const findAll = async () => {
    let tasks = await UserModel.findAndCountAll({ include: 'tasks' });
    return tasks
}
export const checkId = (id) => {
    if (!Number(id) || id < 0) {
        let error = new Error("id invalid");
        error.status = 400;
        throw error
    }
    return true
}
export const deleteUser = async (id) => {
    if (checkId(id)) {
        let result = await UserModel.destroy({
            where: {
                id: id
            }
        })
        return result
    }
}
export const findById = async (id) => {
    if (checkId(id)) {
        let user = await UserModel.findOne({
            where: {
                id: id
            }
        })
        if (!user) {
            let err = new Error("user not fount");
            err.status = 404; throw err;
        }
        return user
    }
}

export const findbyUserName = async (username) => {
    let user = await UserModel.findOne({
        where: {
            username: username
        }
    })
    return user
}
export const comparePass = async (pass, hash) => {
    let compare = await bcrypt.compare(pass, hash);
    if (compare) {
        return true;
    }
    let error = new Error("wrong password");
    error.status = 401;
    throw error
}
export const updatePassWord = async (username, password, newPass) => {
    let user = await findbyUserName(username);
    if (user) {
        let compare = await comparePass(password, user.password);
        if (compare) {
            let salt = await bcrypt.genSalt();
            let hashpass = await bcrypt.hash(newPass, salt);
            let updateUser = await UserModel.update({ password: hashpass }, {
                where: {
                    username: username
                }
            })
            return updateUser;
        }
    } else {
        let error = new Error("username not exist");
        error.status = 404;
        throw error
    }
}
export const updateRefreshToken = async (userId, refreshToken) => {
    let updateUser = await UserModel.update({ refreshToken }, {
        where: {
            id: userId
        }
    });
    return updateUser;
}