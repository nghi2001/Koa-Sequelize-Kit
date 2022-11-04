export default (sequelize, Type) => {
    const Task = sequelize.define('Task', {
        name: {
            type: Type.STRING,
            allowNull: false
        },
        body: {
            type: Type.STRING,
            allowNull: false
        }
        ,
        state: {
            type: Type.STRING,
            allowNull: false,
            defaultValue: "TODO"
        },
        expiration_date: {
            type: Type.DATE,
            allowNull: true
        },
        UserId: {
            type: Type.INTEGER,
            allowNull: false
        }
    })

    return Task
}