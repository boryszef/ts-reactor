import * as React from 'react';
import * as IFaces from './interfaces';

export class SelecTable extends React.Component<IFaces.IProps, any> {

    _frame = null;
    _dimensions = {x1: 0, y1: 0, x2: 0, y2: 0};
    _normalizedDimensions = {x1: 0, y1: 0, x2: 0, y2: 0};
    _allCells = {};
    _selected = [];

    constructor(props: IFaces.IProps) {
        super(props);
    }

    render () {
        return (
            <div onMouseDown={this._handleMouseDown}
                 onMouseUp={this._handleMouseUp}
                 onMouseMove={this._handleMouseMove}>
                <div className="selec-table-frame-div"
                     ref={c => (this._frame = c)}
                     hidden></div>
                {this._renderTable()}
            </div>
        );
    }

    passToCallback = () => {
        if (!this.props.getSelected) {
            return;
        }
        let data = this._selected.map((obj) => {
            return {
                value: obj.elem.innerHTML,
                rowId: obj.rowId,
                column: this.props.headers[obj.cellId]
            };
        });
        this.props.getSelected(data);
    };

    _renderTable () {
        return (<table>
                    <thead>{this._renderHeaders()}</thead>
                    <tbody>{this._renderRows()}</tbody>
                </table>);
    }

    _renderHeaders () {
        return (<tr>{this._renderHeaderCells()}</tr>);
    }

    _renderHeaderCells = () => {
        return this.props.headers.map((name: string, id: number) => {
            let key = 'head' + id.toString();
            return (<th key={key}>{name}</th>);
        });
    };

    _renderRows () {
        this._allCells = {};
        return this.props.data.map(this._renderRow);
    }

    _renderRow = (row: any, rowId: number) => {
        let cells = this.props.headers.map((name: string, cellId: number) => {
            return this._renderCell(row[name], rowId, cellId);
        });
        let showId = 'row-' + rowId.toString();
        return (<tr key={showId}>{cells}</tr>);
    };

    _renderCell = (content: any, rowId: number, cellId: number) => {
        let showId = 'cell-' + rowId.toString() + '-' + cellId.toString();
        return (
            <td key={showId}
                ref={c => (this._allCells[showId] = {elem: c, rowId: rowId, cellId: cellId})}>{content}</td>
        );
    };

    _normalizeFrame = () => {
        let {x1, y1, x2, y2} = this._dimensions;
        this._normalizedDimensions = {x1, y1, x2, y2};
        if (x1 > x2) {
            this._normalizedDimensions.x1 = x2;
            this._normalizedDimensions.x2 = x1;
        }
        if (y1 > y2) {
            this._normalizedDimensions.y1 = y2;
            this._normalizedDimensions.y2 = y1;
        }
    };

    _setFrameDimensions = () => {
        let {x1, y1, x2, y2} = this._normalizedDimensions;
        this._frame.style.left = x1.toString() + 'px';
        this._frame.style.top = y1.toString() + 'px';
        this._frame.style.width = (x2 - x1).toString() + 'px';
        this._frame.style.height = (y2 - y1).toString() + 'px';
    };

    _findSelected = () => {
        this._selected = [];
        for (let key in this._allCells) {
            let cell = this._allCells[key];
            if (this._isContained(cell)) {
                this._selected.push(cell);
            }
        };
    };

    _isContained = (obj) => {
        let rect = obj.elem.getBoundingClientRect();
        if (rect.top > this._normalizedDimensions.y1 &&
            rect.bottom < this._normalizedDimensions.y2 &&
            rect.left > this._normalizedDimensions.x1 &&
            rect.right < this._normalizedDimensions.x2) {
            return true;
        }
        return false;
    };

    _deselect = () => {
        this._selected.forEach(obj => (obj.elem.style.border = '1px solid black'));
        this._selected = [];
    };

    _highlightSelected = () => {
        this._selected.forEach(obj => (obj.elem.style.border = '2px solid red'));
    };

    _handleMouseDown = (ev) => {
        this._deselect();
        this._frame.hidden = 0;
        this._dimensions.x1 = ev.clientX;
        this._dimensions.y1 = ev.clientY;
    };

    _handleMouseUp = (ev) => {
        this._frame.hidden = 1;
        this._findSelected();
        this._highlightSelected();
        this.passToCallback();
    };

    _handleMouseMove = (ev) => {
        this._dimensions.x2 = ev.clientX;
        this._dimensions.y2 = ev.clientY;
        this._normalizeFrame();
        this._setFrameDimensions();
    };
}
