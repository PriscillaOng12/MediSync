import React from "react";

const RecordNotFound = ({text}) => {
  return (
    <div className="px-3 mt-6 text-primary bg-gray-50 py-6 mb-5 rounded-md break-words">
      <p className="text-center">{text?text:"No Record Found!"}</p>
    </div>
  );
};

export default RecordNotFound;
