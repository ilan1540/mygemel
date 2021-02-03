import {
    SET_EXCEL_JSON,
    GET_AFIKIM_SHORT,
    GET_AFIKIM_FULL,
    GET_FULL_HEADER,
    GET_SHORT_HEADER,
    DATA_WITH_TSUA,
    GET_FROM_API,
    GET_GEMEL_URL,
    IS_LOGIN
  } from './types';
  
  const initialState = {
  data:[],
  calcData:[],
  short:[],
  full:[],
  Header:[],
  shortHeader:[],
  apidata:[],
  gemelUrl:[],
  isLogin: false,
  };
  
  export default (state = initialState, action) =>{
    switch (action.type) {
        case SET_EXCEL_JSON:
        return {
          ...state,
          data: action.payload,
        };
        case GET_AFIKIM_SHORT:
          return {
            ...state,
            short: action.payload
          };
          case GET_AFIKIM_FULL:
          return {
            ...state,
            full:  action.payload
          };
          case GET_FULL_HEADER:
          return {
            ...state,
            Header:  action.payload
          };
          case GET_SHORT_HEADER:
          return {
            ...state,
            shortHeader:  action.payload
          };
          case DATA_WITH_TSUA:
          return {
            ...state,
            calcData:  action.payload
          };
          case GET_FROM_API:
          return {
            ...state,
            apidata:   [...state.apidata  ,...action.payload]
          };
          case GET_GEMEL_URL:
          return {
            ...state,
            gemelUrl: action.payload
          };
          case IS_LOGIN:
          return {
            ...state,
            isLogin: action.payload
          }
      default:
        return state
    }
 
  };
  
  
  