import React, { useState } from 'react'
import AreaChart from './Chart';
import Card from './Card';
import { MEDICAL_PROFILE } from '../../constants';
import ReactTooltip from 'react-tooltip';
import MonthlyDosageChart from './Chart/MonthlyDosageChart';
import { convertToAmPm, dateToAmPm, error_alert, isServerTimeGreaterThanOneHour, success_alert, warning_alert } from '../../utils';
import { Axios } from '../../api';
import { BiLoaderAlt } from 'react-icons/bi';
import axios from 'axios';
import RecordNotFound from '../../components/Reusable/RecordNotFound';
import Tag from '../../components/Reusable/Tag';
import { useNavigate } from 'react-router-dom';


const Dashboard = ({ data, medicationList, refreshListing }) => {
  const navigate = useNavigate()


  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        {/* first column */}
        <div className="col-span-12 xl:col-span-7">
          <div>
            <div className=' mb-5'>
              <h1 className="text-4xl font-bold">
                Seven Days Compliance
              </h1>
              <span className='text-xs font-normal'>The details of take medications in seven days.</span>
            </div>
            <AreaChart data={data} />
            <div className=' mb-5'>
              <h1 className="text-4xl font-bold">
                Monthly Compliance
              </h1>
              <span className='text-xs font-normal'>The details of take medications in each Month.</span>
            </div>
            <MonthlyDosageChart data={data} />

          </div>

        </div>

        {/* second column */}
        <div className="col-span-12 xl:col-span-5">
          <div className='space-y-4 pb-4'>
            <h2 className="text-4xl font-bold mb-5">
              Medical Details
            </h2>
            <div className='flex justify-end'>
              <button className='btn bg-primary/80 text-white w-full ' onClick={() => navigate(MEDICAL_PROFILE)}>
                View Medical ID
              </button>
            </div>

          </div>

          <div>
            <h2 className="text-4xl font-bold mb-5">
              Medication
            </h2>
            {/* <MedicationChart/> */}

            <div className="grid sm:grid-cols-2 space-y-6 sm:space-y-0 sm:gap-5 mb-4">
              <Card
                text={"Taken"} number={data ? data.taken < 0 ? 0 : data.taken : 0}
                content={""
                  // <sup className="text-xs text-red-500 bg-red-500/20 rounded-full py-1 px-2">5 Disabled</sup>
                } />
              <Card
                text={"Pending"} number={<span>{data ? data.pending < 0 ? 0 : data.pending : 0}</span>}
                content={""}
              />
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-5">
              Medication list
            </h2>
            {
              data.medicine.length == 0 ?
                <RecordNotFound />
                :
                <div className=''>
                  {
                    medicationList.map((item) => (
                        <div className=''>
                          <div className=''>{item.name}</div>
                          <div className='pt-2 grid grid-cols-3 gap-3 '>
                            {
                              item.medicine_dosage.map((item2) => (
                                <div>
                                  <div>{convertToAmPm(item2.time)}</div>
                                  <Toogle item={item2} refreshListing={refreshListing} />
                                </div>
                                  ))
                                }
                        </div>
                      </div>
                    ))
                  }
                </div>
            }
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-5">
              Appointment
            </h2>
            {
              data.appointment.length == 0 ?
                <RecordNotFound text={"No any Appointment today"} />
                :
                <div className='grid grid-cols-2 gap-2'>
                  {
                    data.appointment.map((item) => (
                      <div>
                          <div className=''>{item.title}</div>
                          <div className='pt-2 inline-flex items-center space-x-1'>
                            <div>{convertToAmPm(item.time)}</div>
                          </div>
                      </div>
                    ))
                  }
                </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard




const Toogle = ({ item, refreshListing }) => {

  const [loading, setLoading] = useState(false);

  const handleMedication = async (e) => {
    setLoading(true)
    let x=isServerTimeGreaterThanOneHour(item.time)
    if(!x){
      setLoading(false)
      return warning_alert("Your are not allowed to take this dosage at the momemnt")
    }
    try {
      const result = await Axios.get(`api/medicine/dose-intake/${item.id}`, { requestId: "medicine-intake", });
      success_alert("Medication Taken Successfully")
      setLoading(false)
      refreshListing();
    } catch (e) {
      if (e.response) {
          error_alert(JSON.stringify(e.response.data.description));
      } else if (axios.isCancel) { }
      else {
        error_alert("Network Error");
      }
    }
    setLoading(false)
  };

  return (
    <>
      {
        loading ?
          <BiLoaderAlt className='text-lg text-primary animate-spin ' />
          :
          <div className='inline-flex space-x-2'>
            <div>
              {item.taken ?
                <Tag
                  bg={"bg-status-active"}
                  text={"Taken"}
                  custom_size={"min-w-[30px] px-3 rounded-full"}
                />
                :
                <label data-tip={item.taken ? "Taken" : "Taken"} class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" checked={item.taken} class="sr-only peer"
                    onChange={(e) => handleMedication(e)}
                  />
                  <div class="w-11 h-6 bg-gray-200 border-[1px] rounded-full peer dark:bg-gray-50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  {/* <span class="ml-3 text-sm font-medium text-gray-400 dark:text-gray-500">Disabled toggle</span> */}
                  <ReactTooltip />
                </label>
              }
            </div>

          </div>
      }
    </>
  )
}