import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import FileInput from './FileInput';
import './NewItemModal.module.css';

// Redux
import { connect } from 'react-redux';
import { createInventoryItemAsync } from '../features/inventory/inventorySlice';

// UI
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { DialogContent } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const styles = {
    button: {
        backgroundColor: '#001c33',
        margin: 'auto auto 15px 15px'
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
        width: '400px',
        height: '1000px',
    },
    buttonText: {
        color: 'white'
    },
    textfield: {
        margin: '15px auto 15px auto'
    },
    trackingButton: {
        margin: '-5px auto 15px auto',
        backgroundColor: '#001c33'
    },
    fileBox: {
        width: '400px',
        height: '50px',
        border: '1px solid grey',
        borderRadius: '4px'
    },
    title: {
        marginLeft: '-10px'
    }
};

export class NewItemModal extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            name: "",
            trackingNumber: "",
            dateRegistered: new Date()
        };
    }

    handleOpen = () => {
        this.setState({
            open: true,
            name: "",
            trackingNumber: "",
            dateRegistered: new Date()
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const { createInventoryItemAsync, imageURL, thumbnailURL } = this.props;
        const newItem = {
            name: this.state.name,
            trackingNumber: this.state.trackingNumber,
            dateRegistered: this.state.dateRegistered,
            imageURL: imageURL,
            thumbnailURL: thumbnailURL
        };
        createInventoryItemAsync(newItem);
        this.handleClose();
    };

    generateTrackingNumber = () => {
        this.setState({ trackingNumber: uuidv4() });
    };

    render() {
        const { classes, imageURL, thumbnailURL } = this.props;
        const { open, name, trackingNumber, dateRegistered } = this.state;
        const humanizedDate = moment(dateRegistered).format("MMMM Do YYYY h:mm a");
        const allFieldsComplete = name && trackingNumber && imageURL && thumbnailURL;

        return (
            <div>
                <Button
                    size='medium'
                    variant='outlined'
                    onClick={this.handleOpen}
                    className={classes.button}
                >
                    <Typography variant='body1' className={classes.buttonText}>
                        Register New Item
                    </Typography>
                    <AddIcon />
                </Button>
                <Dialog
                    open={open}
                    maxWidth='xl'
                    onClose={this.handleClose}
                >
                    <DialogTitle className={classes.dialogTitle}>
                        <Grid container className={classes.titleGrid}>
                            <Grid item style={{ marginLeft: "10px" }}>
                                <Typography variant='h5' className={classes.title}>
                                    Register a New Item
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={this.handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <Grid container>
                            <Grid item>
                                <Typography variant='body1' color="#7f0000">
                                    *All fields must be complete (First upload image before submitting)
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField 
                                    label="Name"
                                    name="name"
                                    variant="outlined"
                                    value={name}
                                    onChange={this.handleChange}
                                    fullWidth
                                    className={classes.textfield}
                                    required
                                />
                                <TextField
                                    label="Tracking Number"
                                    name="trackingNumber"
                                    variant="outlined"
                                    value={trackingNumber}
                                    onChange={this.handleChange}
                                    fullWidth
                                    className={classes.textfield}
                                    required
                                />
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={this.generateTrackingNumber}
                                    fullWidth
                                    className={classes.trackingButton}
                                >
                                    Generate Tracking Number
                                    <AddIcon />
                                </Button>
                                <TextField
                                    label="Registration Date"
                                    variant="outlined"
                                    value={humanizedDate}
                                    disabled={true}
                                    fullWidth
                                    className={classes.textfield}
                                />
                            </Grid>
                            <Grid item style={{ marginTop: '20px', marginBottom: '3px' }}>
                                <Typography variant='body2'>
                                    Upload image (.jpg)*
                                </Typography>
                            </Grid>
                            <Grid item className={classes.fileBox}>
                                <Grid style={{ margin: '15px auto auto 20px' }}>
                                    <FileInput />
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            disabled={!allFieldsComplete}
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    imageURL: state.inventory.newImageURL,
    thumbnailURL: state.inventory.newThumbnailURL
});

const mapActionsToProps = {
    createInventoryItemAsync
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NewItemModal));
