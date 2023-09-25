import { FETCH_EMPLOYEES,DELETE_EMPLOYEES,UPDATE_EMPLOYEE } from '../constants/constants';
import axios from 'axios';

export const fetchEmployees = () => {
    return async (dispatch) => {
      try {
        // Effectuez votre appel à l'API ici
        const response = await axios.get('https://localhost:7013/api/Employee/getEmployee');
        
        // Dispatchez l'action FETCH_REUNIONS avec les données récupérées
        dispatch({
          type: FETCH_EMPLOYEES,
          payload: response.data,
        });
        console.log('data',response.data)
      } catch (error) {
        console.error('Error fetching reunions:', error);
      }
    };
    
  };

  export const deleteEmployees = (employee) => {
    return {
      type: DELETE_EMPLOYEES,
      payload: employee,
    };
  };

  export const updateEmployee = (id) => {
    return {
      type: UPDATE_EMPLOYEE,
      payload: id,
    };
  };


// Action creator pour ajouter une réunion
{/*export const addReunion = (reunion) => {
  return {
    type: ADD_REUNION,
    payload: reunion,
  };
};

// Action creator pour récupérer les réunions depuis l'API
export const fetchReunions = () => {
  return async (dispatch) => {
    try {
      // Effectuez votre appel à l'API ici
      const response = await axios.get('https://localhost:7013/api/Reunion/getListeReunion11');
      
      // Dispatchez l'action FETCH_REUNIONS avec les données récupérées
      dispatch({
        type: FETCH_REUNIONS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching reunions:', error);
    }
  };
};

export const deleteReunion = (reunion) => {
    return {
      type: DELETE_REUNIONS,
      payload: reunion,
    };
  };
  export const updateReunion = (reunion) => {
    return {
      type: UPDATE_REUNIONS,
      payload: reunion,
    };
  };
*/}
