import { ProfileSchema, ProfileType } from './model/types/profile';
import { profileActions, profileReducer } from './model/slice/profileSlice';
import { fetchProfileData } from './model/services/fetchProfileData';
import { getProfileData } from './model/selectors/getProfileData';
import { getProfileLoading } from './model/selectors/getProfileLoading';
import { getProfileError } from './model/selectors/getProfileError';
import ProfileCard from './ui/ProfileCard';

export {
    ProfileSchema,
    ProfileType,
    profileActions,
    profileReducer,
    fetchProfileData,
    getProfileData,
    getProfileLoading,
    getProfileError,
    ProfileCard,
};
