module.exports = (sequelize, Type) => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: Type.STRING
        }
    })

    return Comment
}