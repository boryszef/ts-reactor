import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {SelecTable} from './selec-table/main';
import '../css/select-table.css';


var sampleHeaders: string[] = ['id', 'title', 'propA', 'propB'];
var sampleData: any[] = [
    {id: 1, title: 'title1', propA: 'propA1', propB: 'propB1'},
    {id: 2, title: 'title2', propA: 'propA2', propB: 'propB2'},
    {id: 3, title: 'title3', propA: 'propA3', propB: 'propB3'},
    {id: 4, title: 'title4', propA: 'propA4', propB: 'propB4'},
    {id: 5, title: 'title5', propA: 'propA5', propB: 'propB5'}
];


class Container extends React.Component<any, any> {

    constructor (props) {
        super(props);
        this.state = {selected: []};
    }

    render () {
        return (
            <div>
                <SelecTable headers={sampleHeaders} data={sampleData} getSelected={this.selectedCallback}/>
                <div>{this.renderSelected()}</div>
            </div>
        );
    }

    renderSelected () {
        return this.state.selected.map(this.renderObject);
    }

    renderObject (obj, id) {
        let text = '';
        for (let prop in obj) {
            text += prop + ': ' + obj[prop] + ', ';
        }
        return (<div key={id}>{text}</div>);
    }

    selectedCallback = (data) => {
        this.setState({selected: data});
    }
}


ReactDOM.render(
  <Container />,
  document.getElementById("root")
);