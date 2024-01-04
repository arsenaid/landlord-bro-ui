import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/properties');
                setProperties(response.data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    return (<div className="container">
        <h1 className="mt-4">Property List</h1>
        <div className="list-group mt-4">
            {properties.map(property => (<div key={property.uid} className="list-group-item">
                <Link to={`/property/${property.uid}`}>
                    {property.address.street}, {property.address.city}, {property.address.state}
                </Link>
            </div>))}
        </div>
    </div>);
};

export default PropertyList;
