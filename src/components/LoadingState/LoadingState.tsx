import { Container, Card } from 'react-bootstrap';

interface Props {
  numberOfCards?: number;
}

export const LoadingState = (props: Props) => {
  const { numberOfCards = 3 } = props;

  return (
    <Container className="d-flex flex-column gap-3 flex-grow-1 mt-5 mb-5">
      {Array.from({ length: numberOfCards }, (_, index) => (
        <Card key={index}>
          <Card.Header>
            <h3 className="placeholder-glow">
              <span className="placeholder col-6"></span>
            </h3>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <p className="card-text placeholder-glow d-flex flex-wrap gap-2">
                <span className="placeholder col-6"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};
