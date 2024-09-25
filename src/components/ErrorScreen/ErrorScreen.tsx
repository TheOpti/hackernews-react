import Container from 'react-bootstrap/Container';

import classes from './ErrorScreen.module.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const ErrorScreen = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-row  align-items-center mt-5 mb-5">
      <div className={classes.imageContainer} />
      <div className="mt-4">
        <h1>Oooops!</h1>
        <h5>There was an error...</h5>
        <p className="mt-4">
          We encountered an issue while fetching the data; please try again later. You can also
          click the button below to go back to the homepage.
        </p>
        <Button variant="primary" className="mt-3" onClick={() => navigate('/')}>
          Go back to Homepage
        </Button>
      </div>
    </Container>
  );
};
