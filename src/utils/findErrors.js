

const findErrors = async (event, callback, CbArgs, errorsArr) => {
        let error=''
        let token, username
        event.preventDefault()
        try{
        var res = await callback(CbArgs)
        if(res.status == 200){
            error = 200
            token = res.data.token
            username = res.data.username
            } 
        }
        catch(e){
        errorsArr.map((el)=>{
            if(e.response.status === el){
                error =  e.response.data
            }
        })
    }
    return [error,token, username]
}

export default findErrors




