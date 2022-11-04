export default (sequelize, Type) => {
    const User = sequelize.define('User', {
        username: {
            type: Type.STRING,
            allowNull: false
        },
        password: {
            type: Type.STRING,
            allowNull: false
        }
        ,
        email: {
            type: Type.STRING,
            allowNull: false
        },
        refreshToken: {
            type: Type.STRING,
            allowNull: true
        },
        code: {
            type: Type.STRING,
            allowNull: true
        },
        is_active: {
            type: Type.BOOLEAN,
            defaultValue: false
        }
    })

    return User
}