import React, { Component } from 'react';
import LoadingCard from '../components/LoadingCard';
import ItemCard from '../components/ItemCard';
import NewItemModal from '../components/NewItemModal';

// Redux
import { connect } from 'react-redux';
import { fetchInitialInventoryAsync } from '../features/inventory/inventorySlice';

// UI
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

export class home extends Component {
    componentDidMount() {
        const { fetchInitialInventoryAsync } = this.props;
        fetchInitialInventoryAsync();
    }

    render() {
        const { inventory, loading } = this.props;
        const loadingArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        return (
            <div>
                <div>
                    <Grid container justify="center">
                        <Grid item xs={0.5} />
                        <Grid item xs={11} >
                            <Grid container>
                                <Grid item>
                                    <Typography variant='h3' style={{ margin: '30px auto auto 15px' }} color='#6db9fb'>
                                        InvenTrack
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <Typography variant='body1' style={{ margin: '10px auto 20px 15px' }} color='white'>
                                        Inventory tracking made easy – Made with ♥ by James S. Chung
                                    </Typography>
                                </Grid>
                            </Grid>
                            <NewItemModal />
                            <Grid container justify="center">
                                {loading ?
                                    <>
                                        {loadingArray.map((num) => {
                                            return (
                                                <Grid key={num} item>
                                                    <LoadingCard />
                                                </Grid>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        {inventory.map((item, index) => {
                                            return (
                                                <Grid key={item._id} item>
                                                    <ItemCard index={index} item={item} />
                                                </Grid>
                                            )
                                        })}
                                    </>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={0.5} />
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    inventory: state.inventory.inventory,
    loading: state.inventory.loading
});

const mapActionsToProps = {
    fetchInitialInventoryAsync
};

export default connect(mapStateToProps, mapActionsToProps)(home);
