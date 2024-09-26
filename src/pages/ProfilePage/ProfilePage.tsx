import { useQuery } from '@apollo/client';
import { Card, ListGroup, Container, Badge } from 'react-bootstrap';
import { USER_QUERY } from './ProfilePage.graphql';
import { useParams } from 'react-router-dom';
import { ErrorScreen } from '../../components/ErrorScreen/ErrorScreen';
import { LoadingState } from '../../components/LoadingState/LoadingState';

export const ProfilePage = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(USER_QUERY, { variables: { id } });

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  const { user } = data;

  return (
    <Container className="d-flex flex-column align-items-center mt-3 mb-3 gap-3">
      <Card className="justify-content-center col-12 col-sm-10 col-lg-8">
        <Card.Header>
          <h3 className="mb-0">John Doe</h3>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">Member since {user.createdAt}</Card.Subtitle>
          <Card.Text>{user.bio}</Card.Text>
        </Card.Body>
      </Card>
      <Card className="justify-content-center col-12 col-sm-10 col-lg-8">
        <Card.Header>
          <h5 className="mb-0">Submitted Links</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup as="ul">
            {user.links.map((link) => (
              <ListGroup.Item as="li" key={link.id} className="d-flex align-items-center gap-2">
                <a href={link.url} target="_blank" className="flex-grow-1">
                  {link.title}
                </a>
                <Badge bg="primary" pill>
                  {link.numberOfVotes} votes
                </Badge>
                <Badge bg="primary" pill>
                  {link.numberOfComments} comments
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      <Card className="justify-content-center col-12 col-sm-10 col-lg-8">
        <Card.Header>
          <h5 className="mb-0">Recent votes</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {user.votes.map(({ link }) => (
              <ListGroup.Item
                key={link.id}
                className="d-flex justify-content-between align-items-center">
                <a href={link.url} target="_blank">
                  {link.title}
                </a>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
