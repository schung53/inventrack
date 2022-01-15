import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import DeleteButton from './DeleteButton';
import moment from 'moment';
import './ItemModal.module.css';

// Redux
import { connect } from 'react-redux';
import { setModalOpen, updateInventoryItemAsync } from '../features/inventory/inventorySlice';

// UI
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogActions } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

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
    constructor() {
        super();
        this.state = {
            name: null,
            trackingNumber: null,
            dateRegistered: null
        };
    }

    componentDidMount() {
        const { item } = this.props;
        this.setState({
            name: item.name,
            trackingNumber: item.trackingNumber,
            dateRegistered: item.dateRegistered
        });
    }

    handleOpen = () => {
        const { item, index, setModalOpen } = this.props;
        setModalOpen({ index, isOpen: true });
        this.setState({
            name: item.name,
            trackingNumber: item.trackingNumber,
            dateRegistered: item.dateRegistered
        });
    };

    handleClose = () => {
        const { index, setModalOpen } = this.props;
        setModalOpen({ index, isOpen: false });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleDateChange = () => {
        this.setState({ dateRegistered: new Date() });
    }

    handleUpdate = () => {
        const { item, updateInventoryItemAsync } = this.props;
        const updatedItem = {
            _id: item._id,
            name: this.state.name,
            trackingNumber: this.state.trackingNumber,
            dateRegistered: this.state.dateRegistered,
            imageURL: item.imageURL,
            thumbnailURL: item.thumbnailURL
        };
        updateInventoryItemAsync(updatedItem);
        this.handleClose();
    }

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
        const humanizedDate = moment(this.state.dateRegistered).format("MMMM Do YYYY h:mm a");

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
                        <Grid container>
                            <Grid item>
                                <Typography variant='body1' className={classes.date}>
                                    {"Name: "}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    variant="filled"
                                    style={{ margin: '0 0 5px 80px', width: '300px' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <Typography variant='body1' className={classes.date}>
                                    {"Date Registered: "}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    name="dateRegistered"
                                    value={humanizedDate}
                                    onChange={this.handleChange}
                                    disabled
                                    variant="filled"
                                    style={{ margin: '5px 0 5px 5px', width: '300px' }}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    size='small'
                                    variant='outlined'
                                    onClick={this.handleDateChange}
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <Typography variant='body1' className={classes.date}>
                                    {"Tracking Number: "}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    name="trackingNumber"
                                    value={this.state.trackingNumber}
                                    onChange={this.handleChange}
                                    variant="filled"
                                    style={{ margin: '5px 0 5px 0', width: '300px' }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            size='small'
                            variant='contained'
                            onClick={this.handleUpdate}
                            style={{ color: 'white', backgroundColor: '#004d40' }}
                        >
                            Update
                            <ChangeCircleIcon />
                        </Button>
                        <DeleteButton item={item} />
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
    setModalOpen,
    updateInventoryItemAsync
};

ItemModal.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ItemModal));
