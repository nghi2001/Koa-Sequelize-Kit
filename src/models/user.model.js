export default (sequelize, Type) => {
    const User = sequelize.define('User', {
        username: {
            type: Type.STRING,
            allowNull: false
        },
        password: {
            type: Type.STRING,
            allowNull: false
        },
        avatar: {
            type: Type.STRING,
            allowNull: true
        }
        ,
        refreshToken: {
            type: Type.STRING,
            allowNull: true
        }
    })

    return User
}