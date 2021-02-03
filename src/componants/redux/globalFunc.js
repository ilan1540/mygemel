import XLSX from 'xlsx';
export function numberWithCommas(x) {
  x= Number(x)
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function formtDate(d) {
  const sdate = new Date(d);
  const year = sdate.getFullYear();
  var month = sdate.getMonth() + 1;
  const day = sdate.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  const tarik = `${day}/${month}/${year}`;
  // console.log(tarik);
  return tarik;
}

export const stringToFormtMMYYYY = (str)=>{
  const month = str.toString().substr(4,2)
  const year = str.toString().substr(0,4)
  return (`${month}-${year}`)
}

export function textToDateFormat(d) {
  var time = '02:00:00';
  var date = d.split(/\//);
  var newDate = date[1] + '/' + date[0] + '/' + date[2] + ' ' + time;
  return newDate;
}

export const isNotNull = (x)=>{
  if(x === null){
    return ''
  }else{
    return (x)
  }
}


export const excelToJson =(file, callback) =>{
  let wb = [];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: 'binary' });
      workbook.SheetNames.forEach((sheet, i) => {
        let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        wb.push({
          sheetName: workbook.SheetNames[i],
          sheetData: rowObject,
        });
      })

           
      return callback(null, wb);
    }
}

export const groupJsonData =(json,afickName, callback) =>{
let tsua = 0
json.map((rec ,i)=>{
  let newRec = {}
  if(i===0){
    tsua=rec.TSUA_NOMINALI_BFOAL/100
    newRec= {...rec, SUM_TSUA:tsua}
    newRec= {...newRec, FUND_NAME:afickName}
    return callback(null,newRec)
  }else{
   tsua=(tsua+1)*(rec.TSUA_NOMINALI_BFOAL/100+1)-1
   newRec= {...rec, SUM_TSUA:tsua}
   newRec= {...newRec, FUND_NAME:afickName}
return callback(null,newRec)
  }
})
}


export const calcTsua = (rec,i)=>{
  let tsua = 0
  console.log(rec.TSUA_NOMINALI_BFOAL,i)
  if(i===0){
    tsua=rec.TSUA_NOMINALI_BFOAL/100
    console.log(tsua)
   return tsua
  }else{
   tsua=(tsua+1)*(rec.TSUA_NOMINALI_BFOAL/100+1)-1
   return tsua
   console.log(tsua)

}
}


// מיום מערך של אובייקטים בסדר יורד
export function compareDesc(obj,field1,filed2 ) {
const a = obj.field1
const b = obj.field2
  if ( a.MONTHLY_YIELD < b.MONTHLY_YIELD ){
    return 1;
  }
  if ( a.MONTHLY_YIELD > b.MONTHLY_YIELD ){
    return -1;
  }
  return 0;
}

// מיון מערך אובגקטים בסדר עולה 
 export function compareAsce( a, b ) {
  if ( a.MONTHLY_YIELD < b.MONTHLY_YIELD ){
    return -1;
  }
  if ( a.MONTHLY_YIELD > b.MONTHLY_YIELD ){
    return 1;
  }
  return 0;
}