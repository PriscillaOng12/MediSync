import {BiCalendarEvent} from "react-icons/bi";
import {MdOutlineDashboard} from "react-icons/md";
import {FiUser} from "react-icons/fi";
import {FaHandHoldingMedical} from "react-icons/fa";
import {AiFillCalendar,AiFillMedicineBox} from "react-icons/ai";
import {DiSenchatouch} from "react-icons/di";
import {DEFUALT_URL, PROFILE_URL,SYMPTOMS_URL, CALENDER_URL, MEDICATION_URL, MEDICAL_PROFILE } from "../../constants";

export const normalLinks = [
    {
        title: "Dashborad",
        icon: MdOutlineDashboard,
        to: DEFUALT_URL
    },
    {
        title: "Sympotms",
        icon: DiSenchatouch,
        to: SYMPTOMS_URL,
    },
    {
        title: "Medical id",
        icon: FaHandHoldingMedical,
        to: MEDICAL_PROFILE,
    },
    {
        title: "Medication",
        icon: AiFillMedicineBox,
        to: MEDICATION_URL,
    },
    {
        title: "Calendar",
        icon: AiFillCalendar,
        to: CALENDER_URL
    },
    {
        title: "Profile",
        icon: FiUser,
        to: PROFILE_URL
    },
]