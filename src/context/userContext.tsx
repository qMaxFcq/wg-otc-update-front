import { createContext, useContext, ReactNode, useState } from "react";
import * as UserProfileAPI from "../api/user-api";

interface userProfileDataType {
    userProfileData: string;
    username: string;
}

interface UserProflieContextValue {
    fetchUserProfile: (token: string) => Promise<void>;
    userProfileData: userProfileDataType | null;
}

const UserProfileContext = createContext<UserProflieContextValue | undefined>(
    undefined
);

export const useUserProfileContext = () => {
    const context = useContext(UserProfileContext);

    if (!context) {
        throw new Error(
            "useUserProfileContext must be used within an useUserProfileContextProvider"
        );
    }
    return context;
};

interface UserProfileContextProviderProps {
    children: ReactNode;
}

export const UserProfileContextProvider = ({
    children,
}: UserProfileContextProviderProps) => {
    const [userProfileData, setUserProfileData] =
        useState<userProfileDataType | null>(null);

    const fetchUserProfile = async () => {
        try {
            const res = await UserProfileAPI.userProfile();
            setUserProfileData(res.data);
        } catch (error) {
            console.log("error from fetchUserProfile", error);
        }
    };

    const contextValue: UserProflieContextValue = {
        fetchUserProfile,
        userProfileData,
    };

    return (
        <UserProfileContext.Provider value={contextValue}>
            {children}
        </UserProfileContext.Provider>
    );
};
