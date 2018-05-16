import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  card: {
    //maxWidth: 345,
    width: (theme.spacing.unit * 30),
    height: (theme.spacing.unit * 30) * 1.618,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

function RemovableMediaCard(props) {
  const { classes, image: {data, type, size, name, lastModified}} = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={data}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {type}
          </Typography>
          <Typography component="p">
            {size}
          </Typography>
          <Typography component="p">
            {lastModified}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => props.removeImage()}>
            Remove
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

RemovableMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RemovableMediaCard);
