export const BASE_URL = "http://127.0.0.1:8000/" //dev

export const IMAGE_URl = (val) => BASE_URL.substr(0, BASE_URL.length -1) + val;
export const DATE_FORMAT_SERVER = "yyyy-MM-dd";
export const DATE_FORMAT_DISPLAY = "dd/MM/yyyy";
export const ACCESS_TOKEN = "HealthCatalyst_visitor_access";

export const POPUP_SMALL = "small";
export const POPUP_MEDIUM = "medium";
export const POPUP_LARGE = "large";

export const PRIMARY_COLOR = "#4c0788";

export const LISTING_LIMIT = 10;

export const initialPopupState = {
    component: null,
    visible: false,
    size: "small",
    heading: "",
    contained: false,
    hideDefaultClose: false,
    second_component: false
}


export const BOOLEAN_OPTIONS =[
    {
        label:"Yes",
        value:true
    },
    {
        label:"No",
        value:false
    },
    
]
export const ACTIVE_DISABLED_OPTIONS =[
    {
        label:"Active",
        value:true
    },
    {
        label:"Disabled",
        value:false
    },
    
]

export const LOGIN_URL="/login"
export const FORGOT_PASSOWORD_URL="/forgot-password"
export const RESET_PASSOWORD_URL="/reset-password"
export const REGISTER_URL= "/register"
export const PROFILE_URL="/profile"
export const SYMPTOMS_URL = '/symptoms'
export const CALENDER_URL="/calender"
export const MEDICATION_URL="/medication"
export const MEDICAL_PROFILE ="/medical-profile"


export const DEFUALT_URL="/"


export const ACTIVE="active"
export const DISABLED="disabled"
export const NOT_APPROVED = "not-approved" 

export const CONFIRMED="confirmed"
export const SHIPPED='shipped'
export const CLOSED='closed'
export const PENDING="pending"
export const CANCELLED='cancelled'


export const CUSTOMER_ROLE = 'customer'
export const OPERATOR_ROLE = 'operator'
export const MEMBER_ROLE = 'member'
export const SUPER_ADMIN_ROLE = 'super-admin';
export const GOOGLE_LOGIN_CONST="google"

export const OTHER = "Other"
// export const GOOGLE_CLIENT_ID="156494860401-ppkcfsp86stsh6g1st0ht6lqaka6a0p5.apps.googleusercontent.com"
export const GOOGLE_CLIENT_ID="156494860401-ppkcfsp86stsh6g1st0ht6lqaka6a0p5.apps.googleusercontent.com"
export const SUPPORTED_IMAGES = ["image/png","image/jpeg","image/webp" ]
export const SYMPTOM ="symptom"
export const MEDICATION ="medication"
export const APPOINTMENT ="appointment"

export const SYMPTOM_COLOR = "rgb(239 68 68)"
export const APPOINTMENT_COLOR = "#419DB7"
export const MEDICATION_COLOR = "#fcba03"


export const MILD_SEVERITY="mild"
export const MODERATE_SEVERITY="moderate"
export const SEVERE_SEVERITY="severe"

export const SEVERRITY_OPTIONS = [
    {
        label: "Mild",
        value: MILD_SEVERITY
    },
    {
        label: "Moderate",
        value: MODERATE_SEVERITY
    },
    {
        label: "Severe",
        value: SEVERE_SEVERITY
    }

]
export const FACTORS_OPTIONS = [
    {
        label: "Stress",
        value: "Stress"
    },
    {
        label: "Exercise",
        value: "Exercise"
    },
    {
        label: "Diet",
        value: "Diet"
    },
    {
        label: "Reaction to medication",
        value: "Reaction to medication"
    },
    {
        label: "Current medication effects",
        value: "Current medication effects"
    },
    {value:OTHER, label:"Other"},
    {value:"Not Known", label:"Not Known"},

]

export const TEST_TRIGER_OPTIONS =[
    {value:"test-triger", label:"Test triger"},
    {value:"Not Known", label:"Not Known"},
    {value:OTHER, label:"Other"},
]

export const ASSENDING_ORDER="asc"
export const DESENDING_ORDER="desc"

export const OTHERS_FREQUENCY="others"

export const FREQUENCY_LIST = [
    {
        label: "daily",
        value: "daily"
    },
    {
        label: "weekly",
        value: "weekly"
    },
    {
        label: "monthly",
        value: "monthly"
    },
    {
        label:"Other",
        value:OTHERS_FREQUENCY
    }

]
export const MEDICATION_TYPE = [
    {
        label: "pill",
        value: "pill"
    },
    {
        label: "liquid",
        value: "liquid"
    },
    {
        label: "injection",
        value: "injection"
    },
    {
        label: "tablet",
        value: "tablet"
    },
    {
        label: "capsule",
        value: "capsule"
    },
    {
        label: "topical",
        value: "topical"
    },
    {
        label: "inhaler",
        value: "inhaler"
    },
    {
        label: "drops",
        value: "drops"
    },
    {
        label: "patches",
        value: "patches"
    },
    {
        label: "Other",
        value: "Other"
    },

]
export const DOSAGE_UNIT = [
    // e.g., mg, ml, tablets, capsules, tablespoons, etc).
    {
        label: "mg",
        value: "mg"
    },
    {
        label: "ml",
        value: "ml"
    },
    {
        label: "tablets",
        value: "tablets"
    },
    {
        label: "capsules",
        value: "capsules"
    },
    {
        label: "tablespoons",
        value: "tablespoons"
    },




]
export const MEAL_OPTION = [
    {
        label: "Before Meal",
        value: "Before Meal",
    },
    {
        label: "After Meal",
        value: "After Meal"
    },

]
export const NOTIFCATION_TYPE = [
    {
        label: "email",
        value: "email"
    },
    {
        label: "Push Notification",
        value: "popup"
    },

]

export const WEEK_DAYS=[
    {
        label:"Every Monday",
        value:"monday"
    },
    {
        label:"Every Tuesday",
        value:"tuesday"
    },
    {
        label:"Every Wednesday",
        value:"wednesday"
    },
    {
        label:"Every Thursday",
        value:"thursday"
    },
    {
        label:"Every Friday",
        value:"friday"
    },
    {
        label:"Every Saturday",
        value:"saturday"
    },
    {
        label:"Every Sunday",
        value:"sunday"
    },
]

export const BLOOD_TYPES = [
    {
        label:"A+",
        value:"A+"
    },
    {
        label:"B+",
        value:"B+"
    },
    {
        label:"A-",
        value:"A-"
    },
    {
        label:"B-",
        value:"B-"
    },
    {
        label:"AB-",
        value:"AB-"
    },
    {
        label:"AB+",
        value:"AB+"
    },
    {
        label:"O+",
        value:"O+"
    },
    {
        label:"O-",
        value:"O-"
    },

]
