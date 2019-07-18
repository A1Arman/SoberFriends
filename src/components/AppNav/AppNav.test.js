import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AppNav from './AppNav';


describe(`AppNav component`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<AppNav />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});