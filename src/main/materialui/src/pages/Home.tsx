
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

interface HomeProps {
  text?: string;
};

export default function Home(props: HomeProps) {
  const { text } = props;
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={12}>
        <Paper>
          <Typography variant="body2" color="textSecondary" align="center">
            {text}
          </Typography>
        </Paper>
      </Grid>
    </Grid>);
};