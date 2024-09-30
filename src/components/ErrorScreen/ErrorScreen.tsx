import Container from 'react-bootstrap/Container';

import classes from './ErrorScreen.module.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const ErrorScreen = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 mb-5 gap-3 d-flex justify-content-center">
      <div className="d-flex flex-column flex-md-row align-items-center gap-1 gap-md-3 col-sm-10 col-lg-8">
        <div className={classes.imageContainer} />
        <div className="mt-2 mt-md-4">
          <h1>Oooops!</h1>
          <h5>There was an error...</h5>
          <p className="mt-2 mt-md-4">
            We encountered an issue while fetching the data; please try again later. You can also
            click the button below to go back to the homepage.
          </p>
          <Button variant="primary" className="mt-2 mt-md-3" onClick={() => navigate('/')}>
            Go back to Homepage
          </Button>
        </div>
      </div>
    </Container>
  );
};
