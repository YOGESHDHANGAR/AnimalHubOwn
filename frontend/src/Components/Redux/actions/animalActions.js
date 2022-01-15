import axios from "axios";

import {
  ALL_ANIMAL_FAIL,
  ALL_ANIMAL_REQUEST,
  ALL_ANIMAL_SUCCESS,
  ADMIN_ANIMAL_REQUEST,
  ADMIN_ANIMAL_SUCCESS,
  ADMIN_ANIMAL_FAIL,
  NEW_ANIMAL_REQUEST,
  NEW_ANIMAL_SUCCESS,
  NEW_ANIMAL_FAIL,
  UPDATE_ANIMAL_REQUEST,
  UPDATE_ANIMAL_SUCCESS,
  UPDATE_ANIMAL_FAIL,
  DELETE_ANIMAL_REQUEST,
  DELETE_ANIMAL_SUCCESS,
  DELETE_ANIMAL_FAIL,
  ANIMAL_DETAILS_REQUEST,
  ANIMAL_DETAILS_FAIL,
  ANIMAL_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/animalConstants";

// Get All animals
export const getAnimals =
  (milk, category, radius, rate, breedArr) => async (dispatch) => {
    try {
      dispatch({ type: ALL_ANIMAL_REQUEST });
      // let link = `http://localhost:4000/api/v1/animals?`;
      let link = `/api/v1/animals?`;

      if (milk) {
        link = link + `milk=${milk}&`;
      }
      if (category) {
        link = link + `category=${category}&`;
      }
      if (radius) {
        link = link + `radius=${radius}&`;
      }
      if (rate) {
        link = link + `rate=${rate}&`;
      }
      if (breedArr) {
        let str = "";
        breedArr.map((item) => {
          if (item.check) {
            str = str + "1";
          } else {
            str = str + "0";
          }
        });
        if (breedArr[0].id === 0) {
          str = str + "00000000000000000000000";
        } else {
          str = "00000000000000000" + str;
        }
        console.log(str);
        console.log(str.length);
        link = link + `breed=${str}&`;
      }

      link = link.slice(0, -1);
      console.log(link);

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_ANIMAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ANIMAL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Animals For Admin
export const getAdminAnimals = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ANIMAL_REQUEST });

    const { data } = await axios.get("/api/v1/admin/animals");

    dispatch({
      type: ADMIN_ANIMAL_SUCCESS,
      payload: data.animals,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ANIMAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Animal
export const createAnimal = (animalData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ANIMAL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    console.log(animalData);

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/animal/new`,
      animalData,
      config
    );

    dispatch({
      type: NEW_ANIMAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ANIMAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Animal
export const updateAnimal = (id, animalData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ANIMAL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/animal/${id}`,
      animalData,
      config
    );

    dispatch({
      type: UPDATE_ANIMAL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ANIMAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Animal
export const deleteAnimal = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ANIMAL_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/animal/${id}`);

    dispatch({
      type: DELETE_ANIMAL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ANIMAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Animal Details
export const getAnimalDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ANIMAL_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/animal/${id}`);

    dispatch({
      type: ANIMAL_DETAILS_SUCCESS,
      payload: data.animal,
    });
  } catch (error) {
    dispatch({
      type: ANIMAL_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
