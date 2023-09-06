import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import MedicationListing from "./MedicationListing";
import AddButton from "./Addbutton";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import DateFilter from "../../components/Filter/DateFilter";
import { Axios } from "../../api";
import axios from "axios";
import FilterSearch from "../../components/Filter/FilterSearch";
import FilterSelect from "../../components/Filter/FilterSelect";
import { ASSENDING_ORDER, DESENDING_ORDER, FREQUENCY_LIST } from "../../constants";
import { DateTime } from "luxon";

const Symptoms = () => {
  let offset = 0;
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [filterSearch, setFilterSearch] = useState("")
  const [filterFrequency, setFilterFrequency] = useState("")
  const [sort, setSort] = useState("")
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [perPage, setPerPage] = useState(25);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


 
  const resetFilters = () => {
    setFilterSearch("")
    setFilterFrequency("")
    setSort("")
    setStartDate("")
    setEndDate("")

  }

  const getMedications = async () => {
    setLoading(true);
    setError(false);
    if (count) {
      offset = currentPage * perPage - perPage;
    } else {
      offset = 0;
    }
    try {
      const result = await Axios.get(`api/medicine/?offset=${offset}&limit=${perPage}&column=${sort ? sort.title : "id"}&order_by=${sort ? sort.order : DESENDING_ORDER}&frequency=${filterFrequency ? filterFrequency.value : ""}&start-date=${startDate?startDate:""}&end-date=${endDate?endDate:""}&search=${filterSearch?filterSearch:""}`, { requestId: "listing-medication", });
      setData(result.data.payload);
      setCount(result.data.count)
      setLoading(false);
    } catch (e) {
      if (e.response) {
        setError(JSON.stringify(e.response.data.description));
      }
      if (axios.isCancel) {
      } else {
        setError("Network Error");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedications();
  }, [currentPage, perPage, refresh, filterFrequency, filterSearch, startDate,endDate]);

  useEffect(() => {
    setEndDate("")
  }, [startDate])


  const refreshListing = () => {
    setRefresh(!refresh)
  }



  const MEDICATION_SORTING_OPTIONs = [
    {
      label: "Amount",
      title: "amount",
      order: ASSENDING_ORDER,
      value: "amount",
    }
  ]

  return (
    <Page >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center ">
        <h1 className="heading-lg">Medication</h1>
        <div className=" hidden sm:block">
          <AddButton refreshListing={refreshListing} />
        </div>
      </div>
      <div className="flex justify-end pb-2  block sm:hidden "><AddButton refreshListing={refreshListing} /></div>
      <p className="text-sm mb-8">
        Efficiently manage your medications here
      </p>
      <div className='flex flex-col xl:flex-row sm:justify-between xl:items-center sm:space-y-4  md:space-y-2 xl:space-y-0  '>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-2 items-center gap-2">
          <div className='w-full sm:w-[250px]'>
            <FilterSearch
              label_text={"Search"}
              setState={setFilterSearch}
              state={filterSearch}
            />
          </div>
          <div className='w-full sm:w-[250px]'>
            <FilterSelect
              label_text={"Filter by Frequency"}
              setState={setFilterFrequency}
              state={filterFrequency}
              placeholder={"Select..."}
              options={FREQUENCY_LIST}
            />
          </div>
          {/* <div className='w-full sm:w-[250px]'>
            <FilterSelect
              label_text={"Apply Sorting"}
              setState={setSort}
              state={sort}
              placeholder={"Sort by..."}
              options={MEDICATION_SORTING_OPTIONs}
            />
          </div> */}
          <div className="w-full sm:w-[250px]">
            <DateFilter
              label_text={" Filter By Start Date"}
              setState={setStartDate}
              state={startDate}
            />
          </div>
          <div className="w-full sm:w-[250px]">
            <DateFilter
              label_text={" Filter By End Date"}
              setState={setEndDate}
              state={endDate}
              minDate={startDate ? DateTime.fromISO(startDate).toJSDate() : ""}
            />
          </div>
          <div className=''>
            <span className="text-xs  block invisible ">Reset All Filters</span>
            <button
              onClick={resetFilters}
              type="button"
              disabled={(filterSearch!="" || startDate!="" || endDate!="" || filterFrequency!="" )  ?false:true}
              className='btn-small bg-primary text-white disabled:!cursor-not-allowed !disabled:bg-gray-200'>
              Reset
            </button>
          </div>
        </div>



      </div>
      {loading && !error ?
        <Loading />
        : !error && loading ?
          <p className="text-center mt-5">{error}</p>
          : <>

            <MedicationListing refreshListing={refreshListing} data={data} />
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
      }
    </Page>
  );
};

export default Symptoms;
