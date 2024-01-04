import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PropertyDetails = () => {
    const {uid} = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/properties/${uid}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property:', error);
            }
        };

        fetchProperty();
    }, [uid]);

    if (!property) {
        return <div>Loading...</div>;
    }

    return (<div className="container">
            <div>
                <h5 className="mb-1">Property Details</h5>
                <p className="mb-1">
                    {property.address.city}, {property.address.state} {property.address.postalCode}
                </p>
                <p className="mb-1">
                    Rental Price: {property.rentalPrice.units} {property.rentalPrice.currencyCode}
                </p>
            </div>
        </div>
    );
};

export default PropertyDetails;
