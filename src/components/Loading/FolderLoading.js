import React from 'react'
import {BiLoaderAlt} from "react-icons/bi"
const FolderLoading = () => {
  return (
    <>
    <div className="p-6 bg-white rounded-md shadow-lg">
        <div className="flex items-center space-x-3  animate-pulse">
            <div className="h-8 w-16 rounded-md bg-gray-100"></div>
            <div className="h-8 w-16 rounded-md bg-gray-100"></div>
            <div className="h-8 w-16 rounded-md bg-gray-100"></div>
        </div>
        <table className='directory table-fixed w-full animate-pulse mt-4'>
            <thead className='border-b-2 border-gray-100'>
                <tr className=''>
                    <th className='px-4 py-4 text-left font-medium'>
                        <div className="h-4 w-16 rounded-md bg-gray-100"></div>
                    </th>
                    <th className='px-4 py-4 text-left font-medium'>
                        <div className="h-4 w-16 rounded-md bg-gray-100"></div>
                    </th>
                    <th className='px-4 py-4 text-left font-medium'>
                        <div className="h-4 w-16 rounded-md bg-gray-100"></div>
                    </th>
                </tr>
            </thead>
        </table>
        <div className="flex justify-center mt-8">
            <BiLoaderAlt className='text-gray-200 text-5xl animate-spin'/>
        </div>
    </div>
    

    
    </>
  )
}

export default FolderLoading