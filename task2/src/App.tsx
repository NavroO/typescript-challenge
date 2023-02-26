import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';

function App() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Container>
      <Accordion sx={{ 
          backgroundColor: '#FFF9ED',
          maxWidth: '500px',
          transform: 'none',
        }}>
        <AccordionSummary
          sx={{
            transform: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Personal data</Typography>          
        </AccordionSummary>
        <AccordionDetails           
          sx={{
            display: 'flex', 
            alignItems: "center", 
            justifyContent: "center", 
            flexDirection: "column",
          }}>
          <TextField 
            sx={{
              width: '100%', 
              marginBottom: "20px"
            }} 
            InputLabelProps={{ style: { color: '#F0740D' } }} 
            InputProps={{ style: { color: '#F0740D' } }} 
            id="standard-basic" 
            label="Name" 
            variant="standard" 
          />
         <TextField
            id="standard-basic"
            label="Email"
            sx={{
              width: '100%', 
              marginBottom: "20px"
            }} 
            variant="standard"
            InputLabelProps={{ style: { color: '#F0740D' } }}
          />
          <TextField 
            sx={{
              width: '100%', 
              marginBottom: "20px"
            }} 
            id="standard-basic" 
            InputLabelProps={{ style: { color: '#F0740D' } }} 
            InputProps={{ style: { color: '#F0740D' }, endAdornment: showPassword ? <VisibilityOffIcon sx={{ color: '#F0740D' }} onClick={() => setShowPassword(false)} /> : <VisibilityIcon sx={{ color: '#F0740D' }} onClick={() => setShowPassword(true)} /> }}
            label="Password" 
            variant="standard"
            type={showPassword ? "text" : "password"}
          />
          <Button variant="text"
            disableRipple={true}
            sx={{
              color: '#F0740D',
            }}
          >
            SAVE
          </Button>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default App;
