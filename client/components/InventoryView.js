import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchInitialInventoryAsync, updateInventoryItemAsync, deleteInventoryItemAsync } from '../features/inventory/inventorySlice';

export class InventoryView extends Component {
    componentDidMount() {
        const { fetchInitialInventoryAsync, updateInventoryItemAsync, deleteInventoryItemAsync } = this.props;
        const newItem = {
            _id: '61dece9d86f35018274106d8',
            name: 'Cr',
            dateRegistered: new Date(),
            trackingNumber: 'hhhhhh1234',
            __v: 0
        }
        fetchInitialInventoryAsync();
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
    updateInventoryItemAsync,
    deleteInventoryItemAsync
};

export default connect(mapStateToProps, mapActionsToProps)(InventoryView);
