import { useQuery } from '@apollo/client';
import { differenceInDays, differenceInMonths, differenceInYears, formatDistance } from 'date-fns';
import {
  Card,
  ListGroup,
  Container,
  Badge,
  Tooltip,
  OverlayTrigger,
  Popover
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { ErrorScreen } from '../../components/ErrorScreen/ErrorScreen';
import { LoadingState } from '../../components/LoadingState/LoadingState';

import { USER_QUERY } from './ProfilePage.graphql';

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

  const formatRelativeDate = () => {
    const currentDate = new Date();
    const userDate = new Date(user.createdAt);

    // Calculate the differences
    const days = differenceInDays(currentDate, userDate);
    const months = differenceInMonths(currentDate, userDate);
    const years = differenceInYears(currentDate, userDate);

    if (days < 30) {
      return `${days} days ago`;
    }

    if (months < 12) {
      return `${months} months ago`;
    }

    return `${years} years ago`;
  };

  const formatDateToUserLocale = () => {
    return new Intl.DateTimeFormat(navigator.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(user.createdAt));
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-3 mb-3 gap-3">
      <Card className="justify-content-center col-12 col-sm-10 col-lg-8">
        <Card.Header>
          <h3 className="mb-0">{user.name}</h3>
        </Card.Header>
        <Card.Body>
          {user.email && (
            <>
              <div>
                <b>Email:</b>
              </div>
              <Card.Text>{user.email}</Card.Text>
            </>
          )}
          <div>
            <b>Registered:</b>
          </div>
          <Card.Text>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Popover id="popover-basic" style={{ position: 'fixed' }}>
                  <Popover.Body>Account created on {formatDateToUserLocale()}</Popover.Body>
                </Popover>
              }>
              <span>{formatRelativeDate()}</span>
            </OverlayTrigger>
          </Card.Text>
          <div>
            <b>Bio:</b>
          </div>
          <Card.Text> {user.bio}</Card.Text>
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
