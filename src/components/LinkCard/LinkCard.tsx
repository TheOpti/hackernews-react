import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';
import {
  faComment as farComment,
  faClock as farClock,
  faUser as farUser,
  faCaretSquareUp
} from '@fortawesome/free-regular-svg-icons';

import classes from './LinkCard.module.css';
import { NavLink } from 'react-router-dom';

type Props = {
  link: any;
};

export const LinkCard = ({ link }: Props) => {
  const {
    title,
    url,
    postedBy: { name: userName, id },
    numberOfComments,
    numberOfVotes,
    createdAt
  } = link;

  const hostname = new URL(url).hostname;

  const openLinkInNewTab = () => {
    window.open(url, '_blank');
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Row className="m-0">
          <Col xs="auto" className={`p-0 ${classes.upvoteIcon}`}>
            <FontAwesomeIcon icon={faCaretSquareUp} size="xl" />
          </Col>
          <Col>
            <Card.Title className="mb-2 d-flex align-items-center">
              <h5 className="mb-0">
                <a href="#" className={`text-dark ${classes.link}`} onClick={openLinkInNewTab}>
                  {title}
                </a>
              </h5>
              <span className="mb-0 mx-2 text-muted fs-6">({hostname})</span>
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
