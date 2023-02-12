 const getPageCount =(totalCount, limit) => {
    return Math.ceil(totalCount/limit)
   
}

 const getPagesArray=(totalPages)=>{
    let pagesArray = []
      for( let i = 0;i< totalPages;i++){
        pagesArray.push(i+1)
      }
      return pagesArray
}

export  {getPageCount, getPagesArray}