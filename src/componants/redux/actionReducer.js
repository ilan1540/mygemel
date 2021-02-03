import {
    SET_EXCEL_JSON,
    GET_AFIKIM_FULL,
    GET_AFIKIM_SHORT,
    GET_FULL_HEADER,
    GET_SHORT_HEADER,
    DATA_WITH_TSUA,
    GET_FROM_API,
    GET_GEMEL_URL,
    IS_LOGIN
  } from './types';
  

  // set excel wb to redux format json
export const setExcelJson = (wb) => {
  return {
    type: SET_EXCEL_JSON,
    payload: wb,
  };
};
// set afikio to redux short version
export const getAfikimShort = (wb) => {
  return {
    type: GET_AFIKIM_SHORT,
    payload: wb,
  };
};
// set afikim to redux full version
export const getAfikimFull = (wb) => {
  return {
    type: GET_AFIKIM_FULL,
    payload: wb,
  };
};
// set header name to redux
export const getFullHeader = (wb) => {
  return {
    type: GET_FULL_HEADER,
    payload: wb,
  };
};
// set short header name to redux
export const getShortHeader = (wb) => {
  return {
    type: GET_SHORT_HEADER,
    payload: wb,
  };
};
// set json data with tsua and afick name
export const setCalcData = (wb) => {
  return {
    type: DATA_WITH_TSUA,
    payload: wb,
  };
};

// set json data with tsua and afick name
export const getDataFromApi = (data) => {
  return {
    type: GET_FROM_API,
    payload: data,
  };
};
// set url for data gov to redux
export const getGemelUrl = (url) => {
  return {
    type: GET_GEMEL_URL,
    payload: url,
  };
};
// if the user get in the program
export const isLogin = () => {
  return {
    type: IS_LOGIN,
    payload: true,
  };
};
