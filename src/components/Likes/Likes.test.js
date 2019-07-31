import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Likes from '../Likes/Likes';


describe(`Likes component`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Likes />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});