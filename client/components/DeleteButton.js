import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { deleteInventoryItemAsync } from '../features/inventory/inventorySlice';

// UI
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export class DeleteButton extends Component {
    handleClick = () => {
        const { id, deleteInventoryItemAsync } = this.props;
        deleteInventoryItemAsync(id);
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
    deleteInventoryItemAsync
};

DeleteButton.propTypes = {
    id: PropTypes.number
}

export default connect(mapStateToProps, mapActionsToProps)(DeleteButton);
