import { store } from "react-notifications-component";
import * as yup from "yup";
import { ACCESS_TOKEN, initialPopupState } from "./constants";
import { DateTime } from "luxon";

export const getAuthUser = () => {
    let token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        return JSON.parse(token).user;
    } else {
        return false;
    }
}

export const getToken = () => {
    let token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        return JSON.parse(token).access_token;
    } else {
        return false;
    }
}

export const setToken = (access_token) => {
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(access_token));
}

export const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
}

export const success_alert = (message, title) => {
    let new_msg = "";
    if ((message[0] === '"' || message[0] === "'") && (message[message.length - 1] === '"' || message[message.length - 1] === "'")) {
        new_msg = message.substr(1, message.length - 2);
    } else {
        new_msg = message
    }
    store.addNotification({
        title: title ? title : "",
        message: new_msg,
        className: "noti",
        type: "success",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeInUp"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 7000,
            onScreen: true,
            showIcon: true
        }
    })
}

export const error_alert = (message, title) => {
    let new_msg = "";
    if ((message[0] === '"' || message[0] === "'") && (message[message.length - 1] === '"' || message[message.length - 1] === "'")) {
        new_msg = message.substr(1, message.length - 2);
    } else {
        new_msg = message
    }
    store.addNotification({
        title: title ? title : "",
        message: new_msg,
        className: "noti",
        type: "danger",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__slideInRight"],
        animationOut: ["animate__animated", "animate__slideOutBottom"],
        dismiss: {
            duration: 7000,
            onScreen: true,
            showIcon: true
        }
    })
}

export const warning_alert = (message, title) => {
    store.addNotification({
        title: title ? title : "",
        message: message,
        type: "warning",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 7000,
            onScreen: true,
            showIcon: true
        }
    })
}


export function stringNotEmpty() {
    return yup.mixed().test({
        name: 'stringNotEmpty',
        exclusive: false,
        message: "Required",
        test: function (value) {
            if (value !== undefined && value !== false) {
                return value.trim() !== "";
            } else if (value === undefined) {
                return false
            }
        },
    });
}

export const selectStyles = error => ({
    control: (provided, state) => ({
        ...provided,
        background: `linear-gradient(#20aee3, #20aee3), linear-gradient(#bfbfbf, #bfbfbf)`,
        border: 'none',
        borderRadius: '12px',
        boxShadow: 'none',
        cursor: state.isDisabled ? "not-allowed" : "",
        float: 'none',
        backgroundColor: 'transparent',
        backgroundPosition: 'center bottom, center calc(100% - 1px)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: state.isFocused ? '100% 2px, 100% 1px' : '0 2px, 100% 1px',
        transition: 'background 0.3s ease-out',
        color: state.isFocused ? '#525252' : '#020202',
        minHeight: '45px',
        width: '100%',
        outline: 'none',
        fontSize: '15px',
        '&:focus': {
            backgroundSize: '100% 2px, 100% 1px',
            outline: 'none',
            transitionDuration: '0.3s',
            color: '#525252',
        },
        '&::placeholder': {
            color: '#9CA3AF',  // Change this color to your desired placeholder color
        },
    }),
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? '#419DB7' : 'white',
        color: state.isSelected ? '#ffffff' : '#500',
        '&:hover': {
            background: '#419DB7',
            color: '#ffffff',
        },
        fontSize: '1rem',
        '@media (max-width:1024px)': {
            fontSize: '0.875rem',
        },
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    },
});

export const selectStylesFilter = error => (
    {

        control: (provided, state) => ({
            ...provided,
            height: "12px",
            fontSize: "12px",
            backgroundColor: state.isDisabled ? "#fff" : "#fff",
            borderRadius: "0.375rem",
            border: state.isDisabled ? "2px solid #e4e4e4" : state.isFocused ? "2px solid #4c0788" : state.isSelected ? "2px solid #ef4444" : state.hasValue ? "2px solid #4c0788" : error ? "2px solid #ef4444" : "2px solid #cbd5e1",
            boxShadow: state.isFocused ? "0px 0px 6px #4c0788" : "none",
            "&:hover": {
                border: "2px solid #4c0788",
                boxShadow: "0px 0px 6px #4c0788"
            },

        }),

        option: (provided, state) => {
            return ({
                ...provided,
                background: state.isSelected ? "#4c0788" : "white",
                color: state.isSelected ? "#000" : "#500",
                fontSize: "12px",
                "&:hover": {
                    "background": "#4c0788",
                    color: "#500"
                },
            })
        },

        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition, fontSize: "12px" };
        }
    }
)


export const hidePopup = (setState) => {
    setState(initialPopupState)
}

export const customStyles = {
    rows: {
        style: {
            minHeight: '60px', // override the row height
            borderBottom: "0.8px solid #ccc",
            paddingTop: '5px',
            paddingBottom: '5px'
        }
    },
    headCells: {
        style: {
            color: "#4c0788",
            // color:"#40e0d0",
            fontSize: "12px",
            // backgroundColor: "#40e0d0",
            fontWeight: "600",
        }
    },
    cells: {
        style: {
            color: "#000",
            fontWeight: "500",
            minWidth: '120px'
        },
    },
};


export const formatTime12Hour = (time24Hour) => {
    const [hour, minute] = time24Hour.split(':')
    const date = new Date(0, 0, 0, hour, minute)
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
};

export const convertToAmPm = (militaryTime) => {
    if(!militaryTime)
    {
        return
    }

    const parts = militaryTime.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parts[1];

    let period = 'AM';
    let formattedHours = hours;

    if (hours >= 12) {
        period = 'PM';
        if (hours > 12) {
            formattedHours = hours - 12;
        }
    }
    if(formattedHours=='0' || formattedHours=='00'){
        return `12:${minutes} ${period}`
    }

    return `${formattedHours}:${minutes} ${period}`;
}

export const dateToAmPm = (date) => {
    const inputDateTime = date;

    // Parse the input UTC datetime
    const parsedDateTime = DateTime.fromISO(inputDateTime, { zone: 'utc' });

    // Convert to local time (your desired format)
    const localTimeFormatted = parsedDateTime.toFormat('h:mm a');

    return localTimeFormatted?localTimeFormatted:false
}

const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return hours
}


export const isServerTimeGreaterThanOneHour= (serverTime)=> {
    let hour= getCurrentTime();
    if(serverTime){
        let splitHour= serverTime.split(':')
        let serverHour=splitHour[0]


        let diff = Math.abs(serverHour - hour)
        if(diff>=1){
            console.log("diff",diff)
            return false
        }else{
            return true
        }
    }else{
        return false
    }



}