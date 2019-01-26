import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Table} from './selec-table/main';
import '../css/select-table.css';


var myHeaders: string[] = ['id', 'title', 'propA', 'propB'];
var myData: any[] = [
    {id: 1, title: 'title1', propA: 'propA1', propB: 'propB1'},
    {id: 2, title: 'title2', propA: 'propA2', propB: 'propB2'},
    {id: 3, title: 'title3', propA: 'propA3', propB: 'propB3'},
    {id: 4, title: 'title4', propA: 'propA4', propB: 'propB4'},
    {id: 5, title: 'title5', propA: 'propA5', propB: 'propB5'}
];


ReactDOM.render(
  <Table headers={myHeaders} data={myData} />,
  document.getElementById("root")
);