import React, { useContext, useEffect, useState } from "react";

import RecordNotFound from "../../components/Reusable/RecordNotFound";
// import Actions from "./Actions";

import Card from "./Card";

const SymptomListing = ({ refreshListing, data }) => {


  return (
    <>

      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3">
        {data.length > 0 ? data.map((item) => (
          <div className="my-4">
            <Card
              data={item}
              refreshListing={refreshListing}
            />
          </div>
        ))

          : (
            <div className=" col-span-3 ">
              <RecordNotFound />
            </div>
          )}
      </div>

    </>
  );
};

export default SymptomListing;
