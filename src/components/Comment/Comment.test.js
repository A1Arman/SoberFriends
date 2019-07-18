import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Comment from '../Comment/Comment';


describe(`Comment component`, () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Comment />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});