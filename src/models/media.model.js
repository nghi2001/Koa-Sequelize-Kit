export default (sequelize, Type) => {
    const Media = sequelize.define('Media', {
        originalname: {
            type: Type.STRING,
            allowNull: false
        },
        mimetype: {
            type: Type.STRING,
            allowNull: false
        },
        filename: {
            type: Type.STRING,
            allowNull: false
        },
        destination: {
            type: Type.STRING,
            allowNull: false
        },
        size: {
            type: Type.INTEGER,
            allowNull: true
        },
        UserId: {
            type: Type.INTEGER,
            allowNull: true
        },
        CommentId: {
            type: Type.INTEGER,
            allowNull: true
        }
    })

    return Media
}