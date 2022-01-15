import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import DeleteButton from './DeleteButton';
import './ItemModal.module.css';

// Redux
import { connect } from 'react-redux';
import { setModalOpen } from '../features/inventory/inventorySlice';

// UI
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
    button: {
        backgroundColor: '#001c33'
    },
    dialog: {
        borderRadius: '10px'
    },
    dialogTitle: {
        maxWidth: '800px',
    },
    titleGrid: {
        justifyContent: 'space-between'
    },
    dialogContent: {
        maxWidth: '800px',
        height: '1000px',
    },
    cardImage: {
        borderRadius: '7px',
        maxWidth: '795px',
        margin: '5px 5px 5px 5px'
    },
    cardVideo: {
        borderColor: '#001c33',
        borderRadius: '7px',
        maxWidth: '800px',
        margin: '5px 5px 5px 5px'
    },
    explanation: {
        maxWidth: '780px',
        padding: '10px 10px 10px 10px'
    },
    date: {
        margin: '10px 20px 5px 10px'
    },
    dateGrid: {
        alignItems: 'center'
    },
    copyright: {
        margin: '10px auto 5px auto'
    }
};

export class ItemModal extends Component {
    handleOpen = () => {
        const { index, setModalOpen } = this.props;
        setModalOpen({ index, isOpen: true });
    };

    handleClose = () => {
        const { index, setModalOpen } = this.props;
        setModalOpen({ index, isOpen: false });
    };

    _renderCardMedia() {
        const { item } = this.props;

        if (item.imageURL) {
            return (
                <img
                    src={item.imageURL}
                    alt={item.name}
                    style={styles.cardImage}
                />
            );
        }
    }

    render() {
        const { classes, inventory, item, index } = this.props;
        return (
            <div>
                <Button
                    size='small'
                    variant='outlined'
                    onClick={this.handleOpen}
                    className={classes.button}
                >
                    View Item
                </Button>
                <Dialog
                    open={inventory[index].open}
                    maxWidth='xl'
                    onClose={this.handleClose}
                >
                    <DialogTitle className={classes.dialogTitle}>
                        <Grid container className={classes.titleGrid}>
                            <Grid item style={{marginLeft: "10px"}}>
                                {item.name}
                            </Grid>
                            <Grid item>
                                <IconButton onClick={this.handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        {this._renderCardMedia()}
                        <Grid>
                            <Typography variant='body1' className={classes.date}>
                                {"Date Registered: " + item.dateRegistered}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant='body1' className={classes.date}>
                                {"Tracking Number: " + item.trackingNumber}
                            </Typography>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <DeleteButton id={item._id} />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    inventory: state.inventory.inventory
})

const mapActionsToProps = {
    setModalOpen
};

ItemModal.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ItemModal));
