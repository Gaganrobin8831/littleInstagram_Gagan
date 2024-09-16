class ApiResponse{
    constructor(success,message='',data= null,statuCode =200){
        this.success = success;
        this.message = message,
        this.data = data;
        this.statuCode = statuCode;
    }
}

module.exports = { ApiResponse };