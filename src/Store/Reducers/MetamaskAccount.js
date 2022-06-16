import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    account: {},
    loading: false
}

const metamaskAccountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        fillUpState: (state, action) => ({ ...state, account: { ...action.payload.user } }),
        fillOutState: (state) => ({ ...state, account: {} }),
        enableLoading: (state) => ({ ...state, loading: true }),
        disableLoading: (state) => ({ ...state, loading: false }),
    }
});

export const { fillUpState, fillOutState, enableLoading, disableLoading } = metamaskAccountSlice.actions;

export default metamaskAccountSlice.reducer;