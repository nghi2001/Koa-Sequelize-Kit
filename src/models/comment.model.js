export default (sequelize, Type) => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: Type.STRING,
            allowNull: false
        },
        UserId: {
            type: Type.INTEGER,
            allowNull: false
        },
        TaskId: {
            type: Type.INTEGER,
            allowNull: false
        }
    })

    return Comment
}