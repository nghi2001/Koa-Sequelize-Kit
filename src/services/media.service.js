import db from '../models'
import ThrowError from '../utils/Error'
const MediaModel = db.models.Media

export const create = async (media, CommentId = null, UserId = null) => {
    let newMedia = await MediaModel.create({
        originalname: media.originalname,
        mimetype: media.mimetype,
        filename: media.filename,
        destination: media.destination,
        size: media.size,
        CommentId: CommentId,
        UserId: UserId
    })
    return newMedia
}

export const createMany = async (media = [], CommentId = null, UserId = null) => {
    let listMedia = []
    media.forEach((file,index) => {
        listMedia.push({
            originalname: file.originalname,
            mimetype: file.mimetype,
            filename: file.filename,
            destination: file.destination,
            size: file.size,
            CommentId: CommentId,
            UserId: UserId
        })
    })
    let result = await MediaModel.bulkCreate(listMedia)
    return result
}
const checkId = (id) => {
    if(!Number(id) || id < 0) {
        ThrowError(400, 'id invalid')
    }
    return true
}
export const find = async (id) => {
    if( checkId(id) ) {
        let media = await MediaModel.findOne({
            where: {
                id: id
            }
        })
        return media
    }
}

export const detroy = async (id) => {
    if(checkId(id)) {
        let result = await MediaModel.destroy({
            where: {
                id: id
            }
        })
        return result
    }
}

export const findAll = async () => {
    let medias = await MediaModel.findAndCountAll();
    return medias
}