import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import StylesBase from '../styles/StylesBase';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

interface OrganizationProps {
  text?: string;
}

export default function Organization(props: OrganizationProps) {
  const theme = useTheme();
  const classes = StylesBase();

  const [name, setName] = useState('');
  const [id, setID] = useState(0);
  const [street, setStreet] = useState('');
  const [po, setPO] = useState('');
  const [city, setCity] = useState('');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper style={{ padding: theme.spacing(4) }}>
          <Typography
            variant="h2"
            component="h2"
            style={{ paddingBottom: theme.spacing(2) }}
          >
            Organization
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9} direction="column">
              <div style={{ padding: theme.spacing(1) }}>
                <TextField
                  id="organization-name"
                  label="Organization Name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  helperText="Legal name of the organization"
                  fullWidth
                  margin="normal"
                  value={name}
                />
                <TextField
                  id="organization-id"
                  label="Organization ID"
                  helperText="The internal ID of the organization"
                  disabled
                  margin="normal"
                  value={id}
                />
              </div>
              <Divider />
              <div style={{ padding: theme.spacing(1) }}>
                <Grid item>
                  <TextField
                    id="organization-street"
                    label="Organization Street address"
                    helperText="The physical location of the organization"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="organization-po"
                    label="Organization Postal/ZIP code"
                    helperText="The postal or Zip code for the organization"
                    value={po}
                    onChange={(e) => setPO(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="organization-city"
                    label="Organization City"
                    helperText="The origin city of the organization"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
              </div>
              <div style={{ padding: theme.spacing(1) }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    alert('clicked');
                  }}
                >
                  Update
                </Button>
              </div>
            </Grid>
            <Grid xs={12} md={3} justify="center" alignItems="center">
              <Box mx="auto">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://via.placeholder.com/512"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Logo
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Lorem ispum!
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
