import React from 'react';
import {Button} from 'react-bootstrap';

const Home = () => {
    return (
        <div>
            <h1>Your Property, Our Management - LandlordBro!</h1>
            <p>
                We provide the best platform for managing your rental properties. Easy to use,
                efficient, and effective.
            </p>
            <p>
                <Button variant="primary" href="/signup">Get Started</Button>
            </p>
        </div>
    );
}

export default Home;
