import React, { useEffect } from 'react'
import Page from '../../components/Page';
import Container from "./Container";
import { useState } from 'react';
import { Axios } from '../../api';
import Loading from '../../components/Loading';
import RecordNotFound from '../../components/Reusable/RecordNotFound'

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data,setData] = useState("")
  const [refresh,setRefresh] = useState(false)
  const [medicationList,setMedicationList]=useState([])


  const getDahsboardDetails = async () => {
    setLoading(true)
    setError(false)
    try {
      const result = await Axios.get(`api/dashboard`, {requestId: "dahsboard-details",});
      setData(result.data.payload);
      let med=[]
      result.data.payload.medicine&&result.data.payload.medicine.map((item)=>(
        // item.medicine_dosage.map((item2)=>{
        //   let obj={
        //     id:item2.id,
        //     taken:item2.taken,
        //     time:item2.time,
        //     name: item.name
        //   }
        // })
        med.push(item)
      ))
      setMedicationList(med)
      setLoading(false);
    } catch (e) {
      if (e.response) {
        setError(JSON.stringify(e.response.data.description));
      } else {
        setError("Network Error");
      }
      setLoading(false);
    }
  };

  useEffect(()=>{
    getDahsboardDetails()
  },[refresh])


  const refreshListing=()=>{
    setRefresh(!refresh)
  }


  return (
    <Page title={""}>
       {
       loading && !error ? 
        <Loading />
       : !loading && error ? 
        <p className="text-red-500 text-center">{error}</p>
       :
       <Container data={data} medicationList={medicationList} refreshListing={refreshListing}/>
      
      }

    </Page>
  )
}

export default Dashboard