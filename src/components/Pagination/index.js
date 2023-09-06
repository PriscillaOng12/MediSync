import React from 'react'
import {HiOutlineArrowNarrowLeft,HiOutlineArrowNarrowRight} from 'react-icons/hi'


const Pagination = ({setCurrentPage , currentPage , perPage,offset,total_pages }) => {


    const handleNext=()=>{
        setCurrentPage(currentPage+1)
    }

    const handlePrevious=()=>{
        setCurrentPage(currentPage-1)
    }


    

    return (
        <div className="flex flex-col justify-start items-start">
            <span className="text-sm text-gray-700 dark:text-gray-400 space-x-1">
                Showing <span className="font-semibold text-gray-900 ">{currentPage===1 ? 1: offset+perPage}</span> to <span className="font-semibold text-gray-900 ">{currentPage ===1? perPage: currentPage * perPage + offset }</span> of <span className="font-semibold text-gray-900 ">{total_pages}</span> Entries
            </span>
            <div className="inline-flex mt-4  ">
                <button className=" space-x-2 inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-l bg-primary disabled:bg-gray-300 "
                disabled={currentPage===1}
                onClick={()=>handlePrevious()}
                >
                    <HiOutlineArrowNarrowLeft className=' text-xl text-white' />
                    <span>Prev</span>
                </button>
                <button className=" space-x-2 inline-flex items-center px-4 py-2 text-sm font-medium text-white  border-0 border-l border-white rounded-r bg-primary disabled:bg-gray-300 "
                onClick={()=>handleNext()}
                disabled={
                    (currentPage===total_pages || total_pages===1 ||total_pages===0) ? true :false 
                }
                >
                    <span>Next</span>
                    <HiOutlineArrowNarrowRight className=' text-xl text-white' />
                </button>
            </div>
        </div>
    )
}

export default Pagination