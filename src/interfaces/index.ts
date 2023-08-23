import { ProfileState } from "./profile";
import { UserState } from "./user";
import { BookState } from "./book";
import { LayoutState } from "./layout";

export interface State{
    user: UserState;
    profile: ProfileState;
    book: BookState;
    layout: LayoutState;
}
