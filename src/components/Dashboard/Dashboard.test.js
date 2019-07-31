import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Dashboard from '../Dashboard/Dashboard';


describe(`Dashboard component`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Dashboard />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});