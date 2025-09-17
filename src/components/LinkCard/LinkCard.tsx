import { Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';
import {
  faComment as farComment,
  faClock as farClock,
  faUser as farUser
} from '@fortawesome/free-regular-svg-icons';

import classes from './LinkCard.module.css';
import { NavLink } from 'react-router-dom';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { VOTE_MUTATION, UPDATE_LINK_VOTES_FRAGMENT } from './LinkCard.graphql';
import { useApolloClient, useMutation } from '@apollo/client';
import { useNotification } from '../../context/NotificationsProvider';
import { useAuth } from '../../context/AuthProvider';

type Props = {
  link: {
    id: number;
    title: string;
    description: string;
    url: string;
    postedBy: {
      name: string;
      userName: string;
      id: string;
    };
    numberOfComments: number;
    numberOfVotes: number;
    createdAt: string;
    votes: {
      id: number;
      user: {
        id: number;
        name: string;
      };
    }[];
  };
};

export const LinkCard = ({ link }: Props) => {
  const {
    id: linkId,
    title,
    url,
    postedBy: { name: userName, id },
    numberOfComments,
    numberOfVotes,
    createdAt,
    votes
  } = link;

  const { authenticatedUser } = useAuth();
  const { showNotification } = useNotification();
  const client = useApolloClient();
  const [vote, { loading }] = useMutation(VOTE_MUTATION);

  const openLinkInNewTab = () => {
    window.open(url, '_blank');
  };

  const addVote = () => {
    vote({
      variables: {
        linkId: linkId.toString()
      },
      onCompleted: ({ vote }) => {
        const existingLink = client.readFragment({
          id: `Link:${linkId}`,
          fragment: UPDATE_LINK_VOTES_FRAGMENT
        });

        if (!existingLink) {
          return;
        }

        client.writeFragment({
          id: `Link:${linkId}`,
          fragment: UPDATE_LINK_VOTES_FRAGMENT,
          data: {
            ...existingLink,
            votes: [...existingLink.votes, vote],
            numberOfVotes: existingLink.numberOfVotes + 1
          }
        });

        showNotification({ message: 'Vote added' });
      },
      onError: (err) => {
        showNotification({ message: err.message, variant: 'danger' });
      }
    });
  };

  const hasAlreadyVotedForLink = votes.some(({ user }) => user.name === authenticatedUser);

  return (
    <Card className="mb-2">
      <Card.Body>
        <Row className="m-0">
          <Col xs={1} className="p-0 cursor-pointer text-center" style={{ maxWidth: 40 }}>
            {!Boolean(hasAlreadyVotedForLink) && (
              <Button className="py-1 px-2" onClick={addVote}>
                {!loading && <FontAwesomeIcon icon={faArrowUp} size="lg" />}
                {loading && <Spinner animation="border" size="sm" />}
              </Button>
            )}
          </Col>
          <Col xs={11}>
            <Card.Title className="mb-2 d-inline-flex align-items-center">
              <h5 className="mb-0">
                <a href="#" className={`text-dark ${classes.link}`} onClick={openLinkInNewTab}>
                  {title}
                </a>
              </h5>
              <span className="m-y-0 mx-2 text-muted fs-6">({new URL(url).hostname})</span>
            </Card.Title>
            <Card.Text>
              <small className="text-muted d-flex align-items-center">
                <div className="mr-2">{numberOfVotes} points</div>
                <div className={`mx-2 ${classes.divider}`} />
                <div className="mr-2">
                  <FontAwesomeIcon icon={farComment} /> {numberOfComments} comments
                </div>
                <div className={`mx-2 ${classes.divider}`} />
                <span className="mr-2">
                  <FontAwesomeIcon icon={farClock} />{' '}
                  {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                </span>
                <div className={`mx-2 ${classes.divider}`} />
                <span>
                  <FontAwesomeIcon icon={farUser} /> added by{' '}
                  <NavLink to={`/profile/${id}`} className={`text-dark ${classes.link}`}>
                    {userName}
                  </NavLink>
                </span>
              </small>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
