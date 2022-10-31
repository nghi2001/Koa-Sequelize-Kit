export default (sequelize, Type) => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: Type.STRING
        },
        file_attach: {
            type: Type.ARRAY(Type.STRING)
        }
    })

    return Comment
}