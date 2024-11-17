import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';

function AddressForm({formValues, setFormValues}) {
  // State for form value

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submission logic (e.g., send data to an API)
    console.log('Form submitted:', formValues);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, mb: 2 }} noValidate autoComplete="off">
      <Typography variant="h6" gutterBottom>
        Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="address-line1"
            value={formValues.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="houseNumber"
            name="houseNumber"
            label="House Number"
            fullWidth
            value={formValues.houseNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="address-level2"
            value={formValues.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal Code"
            fullWidth
            autoComplete="postal-code"
            value={formValues.zip}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="country"
            value={formValues.country}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddressForm;