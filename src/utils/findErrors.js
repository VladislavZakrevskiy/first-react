

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



// if(e.response.status == 400){
//     console.log(e.response.data.message)
//     e.response.data.errors.errors.map(el => {
//       console.log(el.msg)
//     })
//   }
//   if(e.response.status === 403 || e.response.status === 401){
//     console.log(e.response.data)
//   }


// event.preventDefault()
//         try{
//           var res = await PostService.registration(reg)
//           console.log(await res.config.data)  
//         }
//         catch(e){
//           console.log(e.response.status)
//           if(e.response.status == 400){
//             console.log(e.response.data.message)
//             e.response.data.errors.errors.map(el => {
//               console.log(el.msg)
//             })
//           }
//           if(e.response.status === 403 || e.response.status === 401){
//             console.log(e.response.data)
//           }
//         }


