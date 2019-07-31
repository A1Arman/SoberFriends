import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LandingCards from '../LandingCards/LandingCards';


describe(`LandingCards component`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<LandingCards />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});