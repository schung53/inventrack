import React, { Component } from 'react';
import { withStyles } from '@mui/styles';

// UI
import { Card } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';

const styles = {
    button: {
        backgroundColor: '#001c33'
    },
    card: {
        width: '300px',
        margin: '10px 10px 30px 10px',
        backgroundColor: '#001c33',
        borderColor: '#154169',
        borderRadius: '10px',
        justifyContent: 'center'
    },
    cardTitle: {
        color: '#6db9fb',
        padding: '7px 3px 7px 3px',
        textAlign: 'left'
    },
    titlePadding: {
        padding: '5px 8px 5px 8px'
    },
    cardImage: {
        borderRadius: '7px',
        maxWidth: '96%',
        margin: '5px 5px 5px 5px'
    },
    cardVideo: {
        borderColor: '#001c33',
        borderRadius: '7px',
        maxWidth: '95%',
        margin: '5px 5px 5px 5px'
    },
    cardContent: {
        color: '#ffffff',
        textAlign: 'left',
        marginBottom: '-7px'
    },
    actionsGrid: {
        justifyContent: 'space-between',
        marginTop: '6px'
    },
    mediaGrid: {
        maxWidth: '100%',
        height: '150px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2e2f33',
        borderRadius: '7px',
        marginBottom: '20px'
    }
};



export class LoadingCard extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
            <Card 
                className={classes.card}
                variant='outlined'
            >
                <div className={classes.titlePadding}>
                    <Typography variant='body1' className={classes.cardTitle}>
                        Loading...
                    </Typography>
                </div>
                <CardContent
                    className={classes.cardContent}
                >
                    <Grid container className={classes.mediaGrid}>
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                    <Typography variant='caption' style={{color: "#6db9fb"}}>
                        Loading...
                    </Typography>
                    {" – "}
                    <Typography variant='caption'>
                        Loading...
                    </Typography>
                </CardContent>
            </Card>
            </div>
        );
    }
}

export default withStyles(styles)(LoadingCard);
