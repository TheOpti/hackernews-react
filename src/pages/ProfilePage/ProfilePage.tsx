import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import {
  Card,
  ListGroup,
  Container,
  Badge,
  OverlayTrigger,
  Popover,
  Tooltip
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { ErrorScreen } from '../../components/ErrorScreen/ErrorScreen';
import { LoadingState } from '../../components/LoadingState/LoadingState';

import { USER_QUERY } from './ProfilePage.graphql';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import classes from './ProfilePage.module.css';

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
          <div>
            <b>Registered:</b>
          </div>
          <Card.Text className="d-flex align-items-center gap-2">
            {formatRelativeDate()}{' '}
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Popover id="popover-basic" style={{ position: 'fixed' }}>
                  <Popover.Body>Account created on {formatDateToUserLocale()}</Popover.Body>
                </Popover>
              }>
              <span className={classes.icon}>
                <FontAwesomeIcon icon={faCircleInfo} />
              </span>
            </OverlayTrigger>
          </Card.Text>

          {user.email && (
            <>
              <div>
                <b>Email:</b>
              </div>
              <Card.Text className="d-flex align-items-center gap-2">
                {user.email}{' '}
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip style={{ position: 'fixed' }}>Change Email</Tooltip>}>
                  <span className={classes.icon}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </span>
                </OverlayTrigger>
              </Card.Text>
            </>
          )}

          {user.email && (
            <>
              <div>
                <b>Password:</b>
              </div>
              <Card.Text className="d-flex align-items-center gap-2">
                **********{' '}
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip style={{ position: 'fixed' }}>Change Password</Tooltip>}>
                  <span className={classes.icon}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </span>
                </OverlayTrigger>
              </Card.Text>
            </>
          )}

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
