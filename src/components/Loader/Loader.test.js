import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loader from '../Loader/Loader';


describe(`Loader component`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Loader />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});