import './App.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import { Button, TextField } from '@mui/material';
import { Container } from '@mui/system';

function App() {
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
            InputProps={{ style: { color: '#F0740D' } }} 
            label="Password" 
            variant="standard" 
            type="password" 
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
