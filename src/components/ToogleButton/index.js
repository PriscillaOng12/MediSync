import React from "react";
import ReactTooltip from 'react-tooltip';

const ToogleButton = ({tooltip,state,setState,callback,disabled}) => {

  const handleChange=(e)=>{
    setState(!state)
    if(callback){
      callback();
    }
  }

  return (
      <label data-tip={tooltip} class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" checked={state} class="sr-only peer" onChange={(e)=>handleChange(e)} disabled={disabled} />
        <div class="w-11 h-6 bg-gray-200 border-[1px] rounded-full peer dark:bg-gray-50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
        {/* <span class="ml-3 text-sm font-medium text-gray-400 dark:text-gray-500">Disabled toggle</span> */}
        <ReactTooltip />
      </label>
  );
};

export default ToogleButton;
