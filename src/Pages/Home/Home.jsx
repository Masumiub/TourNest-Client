import React from 'react';
import Header from '../../Components/Header';
import Overview from '../../Components/Overview';
import TourismAndTravelGuide from '../../Components/TourismAndTravelGuide';
import TouristStories from '../../Components/TouristStories';
import FAQs from '../../Components/FAQs';
import './Home.css'
import Testimonials from '../../Components/Testimonials';
import Offer from '../../Components/Offer';
import SecureAndNewsletter from '../../Components/SecureAndNewsletter';
import { Fade } from "react-awesome-reveal";


const Home = () => {
    return (
        <div>
            <Fade>
                <div className='headerSectionBG overflow-x-hidden'>
                    <Header></Header>
                </div>
            </Fade>
            <Fade>
                <Overview></Overview>
            </Fade>
            <Fade>
                <TourismAndTravelGuide></TourismAndTravelGuide>
            </Fade>
            <Fade>
                <TouristStories></TouristStories>
            </Fade>
            <Fade>
                <Offer></Offer>
            </Fade>
            <Fade>
                <Testimonials></Testimonials>
            </Fade>

            <FAQs></FAQs>
            <Fade>
                <SecureAndNewsletter></SecureAndNewsletter>
            </Fade>

        </div>
    );
};

export default Home;