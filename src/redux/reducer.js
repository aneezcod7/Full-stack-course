import { COMMENTS } from '../Shared/comments';
import { PROMOTIONS } from '../Shared/promotions';
import { LEADERS } from '../Shared/leaders';
import { DISHES } from '../Shared/dishes';


export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

export const Reducer = (state = initialState,action) => {
    return state ;
};