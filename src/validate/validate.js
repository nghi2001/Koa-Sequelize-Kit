import Parameter from "parameter"

let parameter = new Parameter()
const validate = (data,rule) => {
    let error = parameter.validate(rule,data)
    if(error) {
        let err = new Error(`${error[0].field} ${error[0].message}`)
        if(error[0].code == 'missing_field') err.status = 422
        if(error[0].code == 'invalid') err.status = 400
        throw err
    }
    return true
}

export default validate