import React, { Component } from 'react'

import { connect } from 'react-redux';
import { fetchInitialInventoryAsync, createInventoryItemAsync, deleteInventoryItemAsync } from '../features/inventory/inventorySlice';

export class InventoryView extends Component {
    componentDidMount() {
        const { fetchInitialInventoryAsync, createInventoryItemAsync, deleteInventoryItemAsync } = this.props;
        const newItem = {
            name: 'Lawn Mower',
            dateRegistered: new Date(),
            trackingNumber: 'xxxx1234'
        }
        fetchInitialInventoryAsync();
        setTimeout(() => {
            deleteInventoryItemAsync("61deac2bd975c0c2e76d6618")
        }, 4000);
    }

    render() {
        const { inventory } = this.props;

        return (
            <div>
                HELLO WORLD
                {JSON.stringify(inventory)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    inventory: state.inventory.inventory
});

const mapActionsToProps = {
    fetchInitialInventoryAsync,
    createInventoryItemAsync,
    deleteInventoryItemAsync
};

export default connect(mapStateToProps, mapActionsToProps)(InventoryView);
