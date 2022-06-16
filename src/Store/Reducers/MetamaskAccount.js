import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    address: {},
    loading: false
}

const metamaskAccountSlice = createSlice({
    name: 'asda',
    initialState,
    reducers: {
        fillUpState: (state, action) => ({ ...state, address: { ...action.payload.user } }),
        fillOutState: (state) => ({ ...state, address: {} }),
        enableLoading: (state) => ({ ...state, loading: true }),
        disableLoading: (state) => ({ ...state, loading: false }),
    }
});

export const { fillUpState, fillOutState, enableLoading, disableLoading } = metamaskAccountSlice.actions;

export default metamaskAccountSlice.reducer;