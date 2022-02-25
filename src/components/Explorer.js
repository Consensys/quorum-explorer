import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';

function Explorer(){

  return (
    <Container maxWidth="xl">
    
    <Typography
      component="h1"
      variant="h2"
      align="center"
      color="text.primary"
      gutterBottom
    >
      Explorer
    </Typography>
    
  </Container>

  );
}

export default Explorer;
