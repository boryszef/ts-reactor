import * as React from 'react';
import * as IFaces from './interfaces';

export class Table extends React.Component<IFaces.IProps, any> {

    _frame = null;
    _dimentions = {x1: 0, y1: 0, x2: 0, y2: 0};

    constructor(props: IFaces.IProps) {
        super(props);
    }

    renderHeaders () {
        return (<tr>{this.renderHeaderCells()}</tr>);
    }

    renderHeaderCells = () => {
        return this.props.headers.map((name: string, id: number) => {
            let key = 'head' + id.toString();
            return (<th key={key}>{name}</th>);
        });
    };

    renderRows () {
        return this.props.data.map(this.renderRow);
    }

    renderRow = (row: any, rowId: number) => {
        let cells = this.props.headers.map((name: string, cellId: number) => {
            return this.renderCell(row[name], cellId);
        });
        let showId = 'row-' + rowId.toString();
        return (<tr key={showId}>{cells}</tr>);
    };

    renderCell = (content: any, cellId: number) => {
        let showId = 'cell-' + cellId.toString();
        return (<td key={showId}>{content}</td>);
    };

    normalizeFrame = () => {
        let {x1, y1, x2, y2} = this._dimentions;
        if (x1 > x2) {
            this._dimentions.x1 = x2;
            this._dimentions.x2 = x1;
        }
        if (y1 > y2) {
            this._dimentions.y1 = y2;
            this._dimentions.y2 = y1;
        }
    };

    setFrameDimensions = () => {
        let {x1, y1, x2, y2} = this._dimentions;
        this._frame.style.left = x1.toString() + 'px';
        this._frame.style.top = y1.toString() + 'px';
        this._frame.style.width = (x2 - x1).toString() + 'px';
        this._frame.style.height = (y2 - y1).toString() + 'px';
    };

    handleMouseDown = (ev) => {
        this._frame.hidden = 0;
        this._dimentions.x1 = ev.clientX;
        this._dimentions.y1 = ev.clientY;
        console.log("Mouse down", this._dimentions, this._frame.hidden);
    };

    handleMouseUp = (ev) => {
        this._frame.hidden = 1;
        console.log("Mouse up", this._dimentions, this._frame.hidden);
    };

    handleMouseMove = (ev) => {
        this._dimentions.x2 = ev.clientX;
        this._dimentions.y2 = ev.clientY;
        this.normalizeFrame();
        this.setFrameDimensions();
    };

    render () {
        return (
            <div onMouseDown={this.handleMouseDown}
                 onMouseUp={this.handleMouseUp}
                 onMouseMove={this.handleMouseMove}>
                <div className="selec-table-frame-div"
                     ref={c => (this._frame = c)}
                     hidden></div>
                <table>
                    <thead>{this.renderHeaders()}</thead>
                    <tbody>{this.renderRows()}</tbody>
                </table>
            </div>
        );
    }
}
