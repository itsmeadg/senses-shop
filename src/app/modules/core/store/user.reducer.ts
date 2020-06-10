
import * as UserActions from './user.actions';
import { User } from '../../auth/models/app-user.model';

export interface State {
    loading: boolean;
    currentUser: User;
    auth: {
        token: string;
        authenticated: boolean;
    }
}

const defaultUser = new User(null, 'Guest', []);

const initialState: State = {
    loading: false,
    currentUser: { ...defaultUser },
    auth: {
        token: '',
        authenticated: false
    }
}

export function userReducer(state = initialState, action: UserActions.All) {
    switch (action.type) {
        case UserActions.GET_USER:
            return { ...state, loading: true };

        case UserActions.AUTHENTICATED:
            return { ...state, currentUser: { ...action.payload }, loading: false };

        case UserActions.NOT_AUTHENTICATED:
            return { ...state, currentUser: { ...defaultUser }, loading: false };

        case UserActions.GOOGLE_LOGIN:
            return { ...state, loading: true };

        case UserActions.AUTH_ERROR:
            return { ...state, ...action.payload, loading: false };

        case UserActions.LOGOUT:
            return { ...state, loading: true };
        default:
            return state;
    }
}