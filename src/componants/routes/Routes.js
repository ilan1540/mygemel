import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import { ApiNext } from '../apiData/ApiNext';
//import { GetData } from '../apiData/GetData';
//import { InputFile } from '../lyout/InputFile';
//import { ShowFile } from '../pages/ShowFile';
//import { Calc } from '../pages/calc/Calc';
//import { ShowTable } from '../showTable/ShowTable';
//import { ShowAfikimList } from '../afikim/ShowAfikimList';
//import { ShowResult } from '../afikim/ShowResult';
import { BestForMonth } from '../pages/bestForMonth/BestForMonth';
import { EnteryBtn } from '../entryBtn/EnteryBtn';
import { ShowFundId } from '../pages/showFundid/ShowFundId';
import { ShowForSog } from '../pages/showforsogkopa/ShowForSog';


const Routes = () => {
  return (
    <Switch>
    <Route exact path="/" component={EnteryBtn} />
      
      <Route exact path="/bestformonth" component={BestForMonth} />
      <Route exact path="/showfundid" component={ShowFundId} />
      <Route exact path="/showforsog" component={ShowForSog} />
      </Switch>
  );
};

export default Routes;


/*
<Route exact path="/" component={InputFile} />
<Route exact path="/showFile" component={ShowFile} />
      <Route exact path="/showTable" component={ShowTable} />
      <Route exact path="/apidata" component={GetData} />
      <Route exact path="/apinext" component={ApiNext} />
      <Route exact path="/showafikim" component={ShowAfikimList} />
      <Route exact path="/showResult/:afikim" component={ShowResult} />
 
*/