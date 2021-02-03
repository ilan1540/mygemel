import {stringToFormtMMYYYY} from '../redux/globalFunc'
export const shortHeader = [
  {
    accessor: "ID_KUPA",
    Header: "מספר קופה",
    style:{textAlign:'rigth'},
},
{
  accessor: "FUND_NAME",
  Header: "שם קופה",
  style:{textAlign:'rigth'},
},
{
  accessor: "TKF_DIVUACH",
  Header: "תקופת דיווח",
  style:{textAlign:'center'},
  Cell: props => stringToFormtMMYYYY(props.value)
},
{
  accessor: "TSUA_NOMINALI_BFOAL",
  Header: "% תשואה חודשית",
  style:{textAlign:'left'},
  Cell: props => new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, }).format(props.value)
},
{
  accessor: "SUM_TSUA",
  Header: "תשואה מצטברת",
  style:{textAlign:'center'},
  Cell: props => new Intl.NumberFormat('en-US', { style: 'percent', currency: 'USD',minimumFractionDigits: 2, }).format(props.value)
},
{
  accessor: "YIT_NCHASIM_BFOAL",
  Header: "יתרת נכסים במ-שח",
  style:{textAlign:'center'},
  Cell: props => new Intl.NumberFormat('en-US', {style: 'decimal'}).format(props.value)
},

]