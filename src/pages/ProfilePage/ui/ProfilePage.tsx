import React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from 'widgets/PageWrapper';
import { EditableProfileCard } from 'features/EditableProfileCard';

const ProfilePage = () => {
    const { id } = useParams<{id: string}>();

    return (
        <PageWrapper>
            <EditableProfileCard id={id!} />
        </PageWrapper>
    );
};

export default ProfilePage;
