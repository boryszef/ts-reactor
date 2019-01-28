import {SelecTable} from '../components';


describe ('SelecTable tests', () => {

    var props = {
        headers: ['id', 'header1', 'header2'],
        data: [
            {id: 1, header1: 'abc1', header2: 'xyz1'},
            {id: 2, header1: 'abc2', header2: 'xyz2'}
        ],
    };
    var selectTable = new SelecTable(props);

    it('does not normalize correct frame', () => {
        let dimensions = {x1: 0, y1: 0, x2: 10, y2: 10};
        let st = selectTable._dimensions;
        selectTable._normalizeFrame();
        expect(st).toEqual(dimensions);
    });
});