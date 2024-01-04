import React, {useState} from 'react';
import axios from "axios";

const PropertyForm = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'USA',
    });

    const [rentalPrice, setRentalPrice] = useState({
        units: '',
        currencyCode: 'USD',
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleRentalPriceChange = (event) => {
        const {name, value} = event.target;

        setRentalPrice((prevRentalPrice) => ({
            ...prevRentalPrice,
            [name]: value,
        }));
    };

    const handleAddProperty = (event) => {
        event.preventDefault();

        const payload = {
            address,
            rentalPrice,
        };

        // Send the POST request to the API
        axios.post('http://localhost:8080/v1/properties', payload)
            .then((response) => {
                // Handle successful response
                console.log('Property added successfully:', response.data);
                // Reset the form fields
                setAddress({
                    street: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    country: 'USA',
                });
                setRentalPrice({
                    units: '',
                    currencyCode: 'USD',
                });
            })
            .catch((error) => {
                // Handle error
                console.error('Error adding property:', error);
            });
    };

    return (
        <div className="container">
            <h1 className="mt-4">New Property</h1>
            <form onSubmit={handleAddProperty} className="container mt-4">
                <div className="mb-3">
                    <label htmlFor="street" className="form-label">Street</label>
                    <input
                        type="text"
                        className="form-control"
                        id="street"
                        name="street"
                        value={address.street}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={address.state}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="postalCode" className="form-label">Postal Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="postalCode"
                        name="postalCode"
                        value={address.postalCode}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="units" className="form-label">Rental Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="units"
                        name="units"
                        value={rentalPrice.units}
                        onChange={handleRentalPriceChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Property</button>
            </form>
        </div>
    );
};

export default PropertyForm;
