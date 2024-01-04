import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import PropertyForm from './components/PropertyForm';
import Home from './components/Home';
import TenantForm from "./components/TenantForm";
import LeaseForm from "./components/LeaseForm";

const App = () => {
    return (
        <div>
            <Header />
            <Container>
                <Router>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/add-property" element={<PropertyForm/>}/>
                            <Route path="/properties" element={<PropertyList/>}/>
                            <Route path="/property/:uid" element={<PropertyDetails/>}/>
                            <Route path="/add-tenant" element={<TenantForm/>}/>
                            <Route path="/add-lease" element={<LeaseForm/>}/>
                        </Routes>
                </Router>
            </Container>
            <Footer />
        </div>
    );
};

export default App;
