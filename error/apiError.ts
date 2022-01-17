

 class ApiError extends Error {
    status: number;
    message: string;

    constructor(status,message){
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message: string): ApiError {
        return new ApiError(404, message)
    }

    static forbidden(message: string): ApiError {
        return new ApiError(403, message)
    }


}
module.exports =  ApiError