import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import FilterSearch from "../../components/Filter/FilterSearch";
import FilterSelect from "../../components/Filter/FilterSelect";
import DateFilter from "../../components/Filter/DateFilter";
import SymptomListing from "./SymptomListing";
import AddButton from "./Addbutton";
import { Axios } from "../../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { ASSENDING_ORDER, DESENDING_ORDER, SEVERRITY_OPTIONS } from "../../constants";
import { DateTime } from "luxon";


const Symptoms = () => {
  let offset = 0;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(25);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filterSearch, setFilterSearch] = useState("")
  const [filterSeverity, setFilterSeverity] = useState("")
  const [sort, setSort] = useState("")

  const refreshListing = () => {
    setRefresh(!refresh)
  }
  const resetFilters = () => {
    setFilterSearch("")
    setFilterSeverity("")
    setSort("")
    setStartDate("")
    setEndDate("")

  }

  const getSymptoms = async () => {
    setLoading(true);
    setError(false);
    if (count) {
      offset = currentPage * perPage - perPage;
    } else {
      offset = 0;
    }
    try {
      const result = await Axios.get(`api/symptoms/?offset=${offset}&limit=${perPage}&sort=${sort?sort.type=="severity"? sort.value:"":""}&column=${sort?sort.type=="date"?sort.title:"":"id" }&order-by=${sort?sort.value:DESENDING_ORDER}&severity=${filterSeverity?filterSeverity.value:""}&search=${filterSearch?filterSearch:""}&start_date=${startDate?startDate:""}&end_date=${endDate?endDate:""}`, { requestId: "listing-symptoms", });
      setData(result.data.payload);
      setCount(result.data.count)
      setLoading(false);
    } catch (e) {
      if (e.response) {
        setError(JSON.stringify(e.response.data.description));
      }
      if (axios.isCancel(e)) {
      } 
      else {
        setError("Network Error");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getSymptoms();
  }, [filterSearch, refresh, currentPage, perPage,sort,filterSeverity,startDate,endDate]);

  useEffect(() => {
    setEndDate("")
  }, [startDate])


  const SORTING_OPTION = [
    {
      label: "Date",
      options: [
         { label: "Most recent to least recent" , value:ASSENDING_ORDER,  title:"created_on", type:"date"}, 
         { label: "least recent to most recent", value:DESENDING_ORDER, title:"created_on", type:"date" },
      ]
    },
    {
      label: "severity",
      options: [
       { label: "Severe to mild", value: "severe", type:"severity" }, 
       { label: "Mild to severe" , value:"mild" , type:"severity"}
      ]
    },
  ]

  return (
    <Page >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center ">
        <h1 className="heading-lg">Symptoms</h1>
        <div className=" hidden sm:block">
          <AddButton refreshListing={refreshListing} />
        </div>
      </div>
      <div className="flex justify-end pb-2  block sm:hidden "><AddButton refreshListing={refreshListing} /></div>
      <p className="text-sm mb-8">
        Efficiently manage your symptoms and provide them with a seamless browsing
        experience through streamlined symptoms listing interface.
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
              label_text={"Filter by severity"}
              setState={setFilterSeverity}
              state={filterSeverity}
              options={SEVERRITY_OPTIONS}
            />
          </div>
          <div className='w-full sm:w-[250px]'>
            <DateFilter
              label_text={"Start Date"}
              setState={setStartDate}
              state={startDate}
            />
          </div>
          <div className='w-full sm:w-[250px]'>
            <DateFilter
              label_text={"End Date "}
              setState={setEndDate}
              state={endDate}
              minDate={startDate ? DateTime.fromISO(startDate).toJSDate() : ""}
            />
          </div>
          <div className='w-full sm:w-[250px]'>
            <FilterSelect
              label_text={"Apply Sorting"}
              setState={setSort}
              state={sort}
              placeholder={"Sort by..."}
              options={SORTING_OPTION}
            />
          </div>
          <div className=''>
            <span className="text-xs  block invisible ">Reset All Filters</span>
            <button
              onClick={resetFilters}
              type="button"
              disabled={(filterSearch != "" || filterSeverity !="" || sort !="" || startDate!=""  ) ? false : true}
              className='btn-small bg-primary text-white'>
              Reset
            </button>
          </div>
         
        </div>
      </div>
      {loading && !error ?
        <Loading />
        : !error && loading ?
          <p className="text-center mt-5">{error}</p>
          :
          <div className="pt-4">
            <SymptomListing refreshListing={refreshListing} refresh={refresh} data={data} perPage={perPage} setCurrentPage={setCurrentPage} count={count} currentPage={currentPage} offset={offset} />
          </div>
      }
    </Page>
  );
};

export default Symptoms;
