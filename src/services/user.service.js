import fs from 'fs'
import db from '../models'
import bcrypt from 'bcrypt'
import ThrowError from '../utils/Error'
const UserModel = db.models.User

export const checkUser = async (username) => {
    let user = await findbyUserName(username)
    if (user) {
        ThrowError(409, "User Exist")
    }
    return true
}
export const createUser = async (username, password) => {
    let check = await checkUser(username)
    if (check) {
        let salt = await bcrypt.genSalt()
        let hashpass = await bcrypt.hash(password, salt)
        let user = await UserModel.create({ username, password: hashpass })

        return user
    }

}

export const findAll = async () => {
    let tasks = await UserModel.findAndCountAll({ include: ['tasks','comments'] })
    return tasks
}
export const checkId = (id) => {
    if (!Number(id) || id < 0) {
        ThrowError(400, "id invalid")
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
            ThrowError(404, "user not found")
        }
        return user
    }
}

export const getListTask = async (id) => {
    if( checkId(id) ) {
        let user = await UserModel.findOne({
            where: {
                id: id
            },
            include: "tasks"
        })
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
    let compare = await bcrypt.compare(pass, hash)
    if (compare) {
        return true
    }
    ThrowError(401, "wrong password")
}
export const updatePassWord = async (username, password, newPass) => {
    let user = await findbyUserName(username)
    if (user) {
        let compare = await comparePass(password, user.password)
        if (compare) {
            let salt = await bcrypt.genSalt()
            let hashpass = await bcrypt.hash(newPass, salt)
            let updateUser = await UserModel.update({ password: hashpass }, {
                where: {
                    username: username
                }
            })
            return updateUser
        }
    } else {
        ThrowError(404, "username not exist")
    }
}
export const updateRefreshToken = async (userId, refreshToken) => {
    let updateUser = await UserModel.update({ refreshToken }, {
        where: {
            id: userId
        }
    })
    return updateUser
}

export const updateAvatar = async (idUser, avatar) => {
    let result = await UserModel.update({avatar: avatar}, {
        where: {
            id: idUser
        }
    })
    return result
}

export const deleteAvatar = async (avatar) => {
    fs.unlink("./public/uploads/"+avatar, (err) => {
        if(err) ThrowError(409,"can not delete file")
    })
}