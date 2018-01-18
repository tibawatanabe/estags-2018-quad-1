import { User } from './user.interfaces';

export interface DetailState {
    loading: boolean,
    editing: boolean,
    user: User,
    error: boolean,
    name: string,
    email: string,
    role: string
}