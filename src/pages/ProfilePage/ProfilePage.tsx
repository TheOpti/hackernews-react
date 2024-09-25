import { useQuery } from '@apollo/client';
import { Row, Col, Card, ListGroup, Container, Badge } from 'react-bootstrap';
import { USER_QUERY } from './ProfilePage.graphql';
import { useParams } from 'react-router-dom';
import { ErrorScreen } from '../../components/ErrorScreen/ErrorScreen';
import { LoadingState } from '../../components/LoadingState/LoadingState';

const user = {
  name: 'John Doe',
  creationDate: '2020-01-15',
  bio: 'Software developer and tech enthusiast. Love to share and explore new ideas.',
  links: [
    { id: 1, title: 'React Documentation', url: 'https://reactjs.org', numberOfVotes: 12 },
    { id: 2, title: 'Hacker News', url: 'https://news.ycombinator.com', numberOfVotes: 3 },
    { id: 3, title: 'CSS Tricks', url: 'https://news.ycombinator.com', numberOfVotes: 5 }
  ],
  votes: [
    { id: 1, title: 'JavaScript Info', url: 'https://javascript.info' },
    { id: 2, title: 'MDN Web Docs', url: 'https://developer.mozilla.org' }
  ]
};

export const ProfilePage = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(USER_QUERY, { variables: { id } });

  return (
    <Container className="d-flex flex-column">
      <Row className="mt-3 mb-3 justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h3 className="mb-0">John Doe</h3>
            </Card.Header>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                Member since {user.creationDate}
              </Card.Subtitle>
              <Card.Text>{user.bio}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-3 justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Submitted Links</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup as="ul">
                {user.links.map((link, index) => (
                  <ListGroup.Item
                    as="li"
                    key={index}
                    className="d-flex justify-content-between align-items-center">
                    <a href={link.url}>{link.title}</a>
                    <Badge bg="primary" pill>
                      12 votes
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-3 justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent votes</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                {user.votes.map((link, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center">
                    <a href={link.url}>{link.title}</a>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
