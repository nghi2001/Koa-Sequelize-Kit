import db from '../models';
import bcrypt from 'bcrypt';
const UserModel = db.models.User;

export const check = async (username) => {
    let user = UserModel.findOne({where: {
        username: username
    }})
    if(!user) {
        let error = new Error("User Not Found");
        error.status = 404;
        throw error
    }
    return true
}
export const createUser = async (username, password) => {
    if(check(username)) {
        let salt = await bcrypt.genSalt();
        let hashpass= await bcrypt.hash(password, salt);
        let user = await UserModel.create({username, hashpass});
        
        return user;
    }
    
}