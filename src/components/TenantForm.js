import React, {useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import axios from "axios";
import {AsYouType, parsePhoneNumber} from 'libphonenumber-js';

const AddTenantForm = () => {
    const [tenant, setTenant] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'phone' || name === 'emergencyContactPhone') {
            const formattedValue = new AsYouType('US').input(value);
            setTenant(prevState => ({
                ...prevState,
                [name]: formattedValue
            }));
        } else {

            setTenant(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    function parsePhone(phoneNumber) {
        const parsedNumber = parsePhoneNumber(phoneNumber, 'US');
        let phoneNumberParsed = {
            countryCode: '1',
            areaCode: '',
            number: '',
        }

        if (parsedNumber) {
            const formattedNumber = parsedNumber.formatNational();
            const regex = /\((\d{3})\)\s(\d{3})-(\d{4})/;
            const match = formattedNumber.match(regex);

            phoneNumberParsed.areaCode = match[1];
            phoneNumberParsed.number = match[2] + match[3];

            console.log(`Country Code: ${phoneNumberParsed.countryCode}`);
            console.log(`Area Code: ${phoneNumberParsed.areaCode}`);
            console.log(`Number: ${phoneNumberParsed.number}`);
        } else {
            console.log('Invalid phone number');
        }


        return phoneNumberParsed
    }

    const handleAddTenant = (e) => {
        e.preventDefault();

        const payload = {
            givenName: tenant.firstName,
            familyName: tenant.lastName,
            email: tenant.email,
            phone: parsePhone(tenant.phone),
            emergencyContactName: tenant.emergencyContactName,
            emergencyContactPhone: parsePhone(tenant.emergencyContactPhone),
        };

        // Send the POST request to the API
        axios.post('http://localhost:8080/v1/tenants', payload)
            .then((response) => {
                // Handle successful response
                console.log('Tenant added successfully:', response.data);
                // Reset the form fields
                setTenant({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    emergencyContactName: '',
                    emergencyContactPhone: '',
                });
            })
            .catch((error) => {
                // Handle error
                console.error('Error adding tenant:', error);
            });
    };

    return (
        <Container>
            <h1>Add Tenant</h1>
            <Form onSubmit={handleAddTenant}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Enter first name"
                                  value={tenant.firstName} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Enter last name"
                                  value={tenant.lastName} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"
                                  value={tenant.email} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="phone"
                                  value={tenant.phone} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Emergency Contact Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="emergencyContactName"
                                  value={tenant.emergencyContactName} onChange={handleChange}
                                  required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Emergency Contact Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="emergencyContactPhone"
                                  value={tenant.emergencyContactPhone}
                                  onChange={handleChange}
                                  required/>
                </Form.Group>

                <Button variant="primary" type="submit">Add Tenant</Button>
            </Form>
        </Container>
    );
}

export default AddTenantForm;
