import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Container, Form} from "react-bootstrap";

const LeaseForm = () => {
    const [propertyOptions, setPropertyOptions] = useState([]);
    const [propertyId, setPropertyId] = useState('');
    const [tenantId, setTenantId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [paymentPeriod, setPaymentPeriod] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/v1/properties');
                const extractedProperties = response.data.properties;
                setPropertyOptions(extractedProperties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    const handleAddLease = (event) => {
        event.preventDefault();

        const payload = {
            propertyId,
            tenantId,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            paymentPeriod
        };

        // Send the POST request to the API
        axios.post('http://localhost:8080/v1/leases', payload)
            .then((response) => {
                // Handle successful response
                console.log('Lease added successfully:', response.data);
                // Reset the form fields
            })
            .catch((error) => {
                // Handle error
                console.error('Error adding lease:', error);
            });
    };

    return (
        <Container>
            <h1>Add Tenant</h1>
            <Form onSubmit={handleAddLease}>
                <Form.Group className="mb-3">
                    <Form.Label>Property ID</Form.Label>
                    <Form.Select name="properties"
                                 value={propertyId}
                                 onChange={(e) => setPropertyId(e.target.value)} required>
                        <option>Select Property</option>
                        {propertyOptions.map((property) => (
                            <option key={property.uid} value={property.uid}>
                                {property.uid}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tenant ID</Form.Label>
                    <Form.Control type="text" name="tenantId" placeholder="Enter Tenant ID"
                                  value={tenantId} onChange={(e) => setTenantId(e.target.value)}
                                  required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter start date" name="startDate"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                                  required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter end date" name="endDate"
                                  value={endDate}
                                  onChange={(e) => setEndDate(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Select name="paymentPeriod"
                                 value={paymentPeriod}
                                 onChange={(e) => setPaymentPeriod(e.target.value)} required>
                        <option>Select Payment Period</option>
                        <option value="MONTHLY">Monthly</option>
                        <option value="WEEKLY">Weekly</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">Add Lease</Button>
            </Form>
        </Container>
    );
};

export default LeaseForm;
