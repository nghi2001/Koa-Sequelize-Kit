module.exports = (sequelize, Type) => {
    const Task = sequelize.define('Task', {
        name: {
            type: Type.STRING,
            allowNull: false
        },
        body: {
            type: Type.STRING,
            allowNull: false
        },
        outDate: {
            type: Type.DATE,
            allowNull: true
        }
        ,
        state: {
            type: Type.STRING,
            allowNull: false,
            defaultValue: "TODO"
        }
    })

    return Task
}