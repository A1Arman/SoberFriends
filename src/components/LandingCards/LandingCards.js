import React from 'react';
import rating from '../../images/rating.svg';
import impact from '../../images/impact.svg';
import clock from '../../images/clock.svg';
import './LandingCards.css';

function LandingCards() {
    return (
        <section className='card-container'>
            <h3>A Better Way To Quitting Your Addiction</h3>
            <section className='card'>
                <img src={rating} />
                <h4>Easy to Use</h4>
                <p>Track your progress and journey with ease</p>
            </section>
            <section className='card'>
                <img src={impact} />
                <h4>Impact Others</h4>
                <p>Connect and meet people going through the same challenges. Keep each other motivated!</p>
            </section>
            <section className='card'>
                <img src={clock} />
                <h4>Create a Lasting Change</h4>
                <p>Create a lasting change by taking daily action while being part of a motivated community.</p>
            </section>
        </section>
    )
}

export default LandingCards;