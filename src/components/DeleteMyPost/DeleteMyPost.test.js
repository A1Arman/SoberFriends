import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DeleteMyPost from './DeleteMyPost';


describe(`DeleteMyPost component`, () => {
    const post = [
        {
            post_title: 'I might relapse!',
            post_content: 'I am having a terrible day! Nothing is going right and I feel like I am going to relapse.',
            owner: 1
        },
        {
            post_title: 'Tips!',
            post_content: 'I have been sober for 3 years. What has helped me and my journey is support and keeping busy!',
            owner: 1
        },
        {
            post_title: 'Feeling Good!',
            post_content: 'I am loving quitting my addiction. I feel so much better!',
            owner: 1
        },
    ]
    it('renders without crashing', () => {
        const wrapper = shallow(<DeleteMyPost posts={post} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});