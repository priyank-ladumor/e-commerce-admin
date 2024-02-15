
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';



// ----------------------------------------------------------------------

export default function AppView() {
  const auth = localStorage.getItem("token")
  return (
    auth &&
    <Container className='mt-8' maxWidth="xl" >
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>


    </Container>
  );
}
