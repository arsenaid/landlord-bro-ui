# Property Management App

This React app is designed to help property managers track properties, tenants, and leases. It provides an interface to view, add, edit, and delete data.

## Getting Started

To get started with this app, follow these steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the app in development mode:

   ```bash
   npm start
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Key Files

- `src/App.js` - Main App component that renders the header, footer, and routes
- `src/components/Header.js` - Header with app name and navigation
- `src/components/Footer.js` - Footer with copyright info
- `src/components/PropertyList.js` - Page to view all properties
- `src/components/PropertyDetails.js` - Page to view details of a single property
- `src/components/PropertyForm.js` - Form to add/edit a property
- `src/components/TenantForm.js` - Form to add/edit a tenant
- `src/components/LeaseForm.js` - Form to add/edit a lease

## Features

- Properties - View, add, edit, and delete properties
- Tenants - View, add, edit, and delete tenants
- Leases - View, add, edit, and delete leases associated with a property and tenant
- Responsive Design - Mobile-friendly interface

## Functionality

- The main App component handles routing and renders the common header and footer on all pages.

- The PropertyList page fetches properties from the API and displays them in a table. Clicking a property navigates to the PropertyDetails page.

- The PropertyDetails page loads data for a single property by ID and displays the details. Related tenants and leases are also loaded and displayed.

- The PropertyForm handles both add and edit functionality. On submit, it will either make a POST or PUT request to the API to create/update the property.

- The TenantForm and LeaseForm work similarly for managing tenants and leases. All forms validate input and display errors.

Overall, this provides a simple dashboard to manage properties and related data. The routing, reusable components, and API integration demonstrate some key patterns in React.