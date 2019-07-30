import React from 'react';
import rating from '../../images/rating.svg';
import impact from '../../images/impact.svg';
import clock from '../../images/clock.svg';
import './LandingCards.css';

function LandingCards() {
    return (
        <section className='card-container'>
            <h3 id='card-container-title'>A Better Way To Quitting Your Addiction</h3>
            <section id='card1' className='card landing-card'>
                <img src={rating} alt='Pointer Finger Icon'/>
                <h4 className='card-title'>Easy to Use</h4>
                <p className='card-content'>Track your progress and journey with ease</p>
            </section>
            <section id='card2' className='card landing-card'>
                <img src={impact} alt='People Icon' />
                <h4 className='card-title'>Impact Others</h4>
                <p className='card-content'>Connect and meet people going through the same challenges. Keep each other motivated!</p>
            </section>
            <section id='card3' className='card landing-card'>
                <img src={clock} alt='Clock Icon'/>
                <h4 className='card-title'>Create a Lasting Change</h4>
                <p className='card-content'>Create a lasting change by taking daily action while being part of a motivated community.</p>
            </section>
        </section>
    )
}

export default LandingCards;