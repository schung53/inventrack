import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { deleteInventoryItemAsync, deleteImagesAsync } from '../features/inventory/inventorySlice';

// UI
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export class DeleteButton extends Component {
    handleClick = () => {
        const { item, deleteInventoryItemAsync, deleteImagesAsync } = this.props;
        const URLs = {
            imageURL: item.imageURL,
            thumbnailURL: item.thumbnailURL
        };
        deleteInventoryItemAsync(item._id);
        deleteImagesAsync(URLs);
    }

    render() {
        return (
            <Button
                size='small'
                variant='contained'
                onClick={this.handleClick}
                style={{ color: 'white', backgroundColor: '#7f0000' }}
            >
                Delete
                <DeleteIcon />
            </Button>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
    deleteInventoryItemAsync,
    deleteImagesAsync
};

DeleteButton.propTypes = {
    item: PropTypes.object
}

export default connect(mapStateToProps, mapActionsToProps)(DeleteButton);
