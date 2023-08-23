export interface ProfileState{
    profile: Profile;
    notifications: Notification[];
    currentProfile: Profile;
    isLoading: boolean;
}

export interface ProfilePayload{
    profile: Profile;
    notifications: Notification[];
    username: string;
}

export interface Profile{
    id: number;
    img: string;
    createdAt: string;
    teamId: number;
    birthday: string;
    username: string | null;
}

export interface Notification{
    id: number;
    notification_type: string;
    notification: string;
    sender_profile_id: number;
    created_at: string;
}
