import React, { Component } from 'react'

import { connect } from 'react-redux';
import { fetchInitialInventoryAsync, createInventoryItemAsync } from '../features/inventory/inventorySlice';

export class InventoryView extends Component {
    componentDidMount() {
        const { fetchInitialInventoryAsync, createInventoryItemAsync } = this.props;
        const newItem = {
            name: 'Lawn Mower',
            dateRegistered: new Date(),
            trackingNumber: 'xxxx1234'
        }
        fetchInitialInventoryAsync();
        setTimeout(() => {
            createInventoryItemAsync(newItem)
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
    createInventoryItemAsync
};

export default connect(mapStateToProps, mapActionsToProps)(InventoryView);
