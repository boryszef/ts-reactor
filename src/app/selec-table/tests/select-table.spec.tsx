import * as React from 'react';
import {shallow} from 'enzyme';
import {SelecTable} from '../components';


describe ('SelecTable tests', () => {

    let headers = ['id', 'head1'];
    let data = [
        {'id': 1, 'head1': 'a'},
        {'id': 2, 'head1': 'b'},
    ];
    const table = shallow(<SelecTable headers={headers} data={data} />);

    it('does not normalize correct frame', () => {
        let dimensions = {x1: 0, y1: 0, x2: 10, y2: 10};
        let st = table._dimensions;
        table._normalizeFrame();
        expect(st).toEqual(dimensions);
    });
});