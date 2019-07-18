import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DeleteMyAccount from './DeleteMyAccount';


describe(`DeleteMyAccount component`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<DeleteMyAccount />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});