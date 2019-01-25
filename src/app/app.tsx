import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {ISize, Table} from './selec-table/main';


var size: ISize = {rows: 5, cols: 4};


ReactDOM.render(
  <Table dimensions={size} />,
  document.getElementById("root")
);