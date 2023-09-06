import React, {createContext, useContext, useEffect} from 'react'
import {AnimatePresence, motion} from "framer-motion";
import {GrClose} from "react-icons/gr";
import {AiOutlineClose} from "react-icons/ai";
import { POPUP_MEDIUM, POPUP_SMALL } from '../../constants';

//global context for popup
export const BasePopupContext = createContext(null);

// initial state for popup
const initialState = {
    component: "",
    visible: false,
    size: "small",
    heading: "",
    contained: false,
    hideDefaultClose: false
}

const BasePopup = () => {

    //extracting state from context
    const {popupState, setPopup} = useContext(BasePopupContext);
    const {component, heading, size, visible, contained, hideDefaultClose} = popupState;

    const hidePopup = () => {
        setPopup({visible: false, hideDefaultClose: false});
    }

    // this is a helper component which sets the base for a modal
    const variants = {
        initial: {
            opacity: 0,
            top: "-100%",
        },
        enter: {
            opacity: 1,
            top: "0"
        },
        exit: {
            opacity: 1,
            top:"-100%",
        }
    }

    const sizeClass = size === POPUP_SMALL ? "w-full md:w-96 lg:w-6/12 xl:w-5/12 2xl:w-3/12 max-w-[500px]" : size === POPUP_MEDIUM ? "w-full lg:w-7/12 xl:w-6/12 2xl:w-5/12 max-w-[700px]" : "w-10/12 max-w-container";
    return (
            <AnimatePresence>
                    {visible &&
                        <PopupContent 
                            hideDefaultClose={hideDefaultClose}
                            variants={variants}
                            heading={heading}
                            contained={contained}
                            hidePopup={hidePopup}
                            component={component}
                            sizeClass={sizeClass}
                            setPopup={setPopup}
                        />
                    }
            </AnimatePresence>
    )
}

const PopupContent = ({variants, heading, contained, hideDefaultClose, hidePopup, component, sizeClass, setPopup}) => {

    useEffect(() => {
        return () => {
            // reset popup to initial state on unmount
            setPopup(initialState)
        }
    })

    return(
        <div className="bg-black bg-opacity-30 left-0 top-0 fixed h-screen w-screen flex items-start pt-16 pb-8 justify-center z-[1000] overflow-y-auto">
            <motion.div
            transition={{type: "tween"}}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            className={`${sizeClass} bg-white shadow-lg rounded-lg border-1 border-gray-200 relative mx-auto`}>
                {/* header */}
                <div className="rounded-lg rounded-b-none p-4 flex items-center justify-between border-b-2 border-gray-100">
                    <p className="text-xl font-bold ">
                        {heading}
                    </p>
                    <div className={`text-white text-3xl cursor-pointer ${hideDefaultClose && "hidden"}`} onClick={hidePopup}>
                        <AiOutlineClose/>
                    </div>
                </div>
                {/* header */}
                
                <div className={contained ? "px-5 py-8" : ""}>
                    {component}
                </div>
            </motion.div>
        </div>
    )
}

export default BasePopup
