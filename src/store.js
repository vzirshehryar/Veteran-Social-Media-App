import { configureStore } from '@reduxjs/toolkit'
import userId from './Reducers/reducer';

const store = configureStore({
    reducer: {
        userId
    }
});

export default store;