import * as React from 'react';
import * as IFaces from './interfaces';

export class Table extends React.Component<IFaces.IProps, any> {

    constructor(props: IFaces.IProps) {
        super(props);
    }

    renderCell (rowId: number, cellId: number) {
        let content = "data: " + rowId.toString() + ", " + cellId.toString();
        return (<td>data: {content}</td>);
    }

    renderRow (rowId: number) {
        var cells = [];
        for (let cellId = 0; cellId < this.props.dimensions.cols; cellId++) {
            cells.push(this.renderCell(rowId, cellId));
        }
        return (<tr>{cells}</tr>);
    }

    renderRows () {
        var rows = [];
        for (let rowId = 0; rowId < this.props.dimensions.rows; rowId++) {
            rows.push(this.renderRow(rowId));
        }
        return rows;
    }

    render () {
        return (
            <table>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }
}
