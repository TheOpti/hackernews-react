import { Button, Card } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

import classes from './LinkCard.module.css';

type Props = {
  link: any;
};

export const LinkCard = ({ link }: Props) => {
  const {
    description,
    url,
    postedBy: { name: userName },
    votes
  } = link;

  const hostname = new URL(url).hostname;

  return (
    <Card className={classes.linkCard}>
      <div className={classes.voteBlock}>
        <Button className={classes.voteButton}>
          <Plus className={classes.voteIcon} />
        </Button>
        <div className={classes.votes}>{votes.length}</div>
      </div>
      <Card.Body className={classes.linkCardBody}>
        <div className={classes.titleRow}>
          <Card.Title className={classes.linkTitle}>{description}</Card.Title>
          <Card.Text>({hostname})</Card.Text>
        </div>
        <Card.Text className={classes.titleBottomRow}>
          posted by {userName} | 4 hours ago | 12 comments
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
