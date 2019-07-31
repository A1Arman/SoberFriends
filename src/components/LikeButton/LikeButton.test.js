import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LikeButton from '../LikeButton/LikeButton';


describe(`LikeButton component`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<LikeButton />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});