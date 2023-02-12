import React from 'react'
import '../../../styles/App.css'
import { getPagesArray } from '../../../utils/pages'

const Pagination = ({totalPages, page, changePage}) => {

    let pagesArray = getPagesArray(totalPages)

  return (
    <div style={{visibility:'hidden'}} className='page_wrapper'>
      {pagesArray.map(p => 
              <span onClick={()=>changePage(p)} key={p} className = {page === p ? ' page page_current  ': 'page'}>
                {p}
              </span>
            )}
    </div>
  )
}

export default Pagination