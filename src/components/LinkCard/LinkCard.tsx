import { Button, Card } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

import classes from './LinkCard.module.css';

type Props = {
  link: any;
};

export const LinkCard = ({ link }: Props) => {
  const {
    title,
    url,
    postedBy: { name: userName },
    numberOfComments,
    numberOfVotes,
    createdAt
  } = link;

  const hostname = new URL(url).hostname;

  return (
    <Card className={classes.linkCard}>
      <div className={classes.voteBlock}>
        <Button className={classes.voteButton}>
          <Plus className={classes.voteIcon} />
        </Button>
        <div className={classes.votes}>{numberOfVotes}</div>
      </div>
      <div>
        <div className={classes.titleRow}>
          <Card.Title className={classes.linkTitle}>{title}</Card.Title>
          <Card.Text>({hostname})</Card.Text>
        </div>
        <Card.Text className={classes.titleBottomRow}>
          posted by {userName} | {createdAt} | {numberOfComments} comments
        </Card.Text>
      </div>
    </Card>
  );
};
