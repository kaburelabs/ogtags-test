import React from 'react';
import sponsorList from './supportersList.json'
import { Row, Col, Badge } from 'react-bootstrap';

const Home = ({handleClick, totalClicks, 
               slider, onChangeSlider, sliderTitle}) => {
    
    const htmlDiv = sponsorList.map(sponsor => <Col lg={4} key={sponsor.name}>
        <a href='https://google.com' target='blank'>
            <div key={sponsor.name}>
                <h3 className="bottom8">{sponsor.name}</h3>
                <div className='flexStart bottom4'>
                    <p className='p'>Pre Sales start</p>
                    <Badge className='badgeSoon'>SOON</Badge>
                </div>
                <img alt='sponsor' src={sponsor.images} key={sponsor.images}></img>
            </div>
        </a>
    </Col>
    )

    return ( 
        <div>
            <h1>NFT CARDANO TWITTER MONITOR PROJECT</h1>
            <p>This site web application is updated daily at 00:00:00(UTC)</p>
            <h4>This project is maintained by the Community, and the projects below have supported the project.</h4>
            <p>Please, Consider following the projects and also, knowning his amazing projects;</p>
            {/* <div>total of clicks on the button {totalClicks} - slider val {sliderTitle} </div>
            <Button className="btnBaseStyle" onClick={handleClick}>Click here</Button>
            <DiscreteSliderMarks value={slider} onChange={onChangeSlider} usedValue={sliderTitle}/> */}
            <Row>{htmlDiv}</Row>
        </div> 
    );
}
 

export default Home;