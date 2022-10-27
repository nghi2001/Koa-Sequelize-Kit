
export default (status, message) => {
    let error = new Error(message)
    error.status = status
    throw error
}