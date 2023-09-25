import { FETCH_EMPLOYEES,UPDATE_EMPLOYEE } from "../components/constants/constants";
const initialState = {
  employees: [],
};

const employeeReducers = (state = initialState, action) => {
  switch (action.type) {
    //case ADD_REUNION:
     // return {
     //   ...state,
       // reunions: [...state.reunions, action.payload],
    //  };
    case FETCH_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
      case UPDATE_EMPLOYEE:
       return {
         ...state,
         employees: [...state.employees, action.payload],
      };
    default:
      return state;
  }
};

export default employeeReducers;
