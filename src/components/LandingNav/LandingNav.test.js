import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LandingNav from './LandingNav';


describe(`LandingNav component`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<LandingNav />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});