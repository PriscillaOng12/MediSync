import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import RecordNotFound from "../../components/Reusable/RecordNotFound";
import { POPUP_LARGE } from "../../constants";
import FormContainer from "./FormContainer";
import { BasePopupContext } from "../../components/BasePopup";
import Card from "./Card";

const SymptomListing = ({ refreshListing, data, currentPage, perPage, offset, count, setCurrentPage }) => {

  return (
    <>

      <div className="my-4 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-5">
        {data && data.length > 0 ? data.map((item) => (
          <Card
            data={item}
            refreshListing={refreshListing}
          />
        ))
          :
          <div className="col-span-3">
          <RecordNotFound />
          </div>
        }
      </div>
      <div className="mt-10 flex justify-end text-center ">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
          offset={offset}
          total_pages={Math.ceil(count / perPage)}
        />
      </div>

    </>
  );
};

export default SymptomListing;
