import React from 'react';

import { useParams } from 'react-router-dom';

import { EditableProfileCard } from '@/features/EditableProfileCard';
import PageWrapper from '@/shared/ui/PageWrapper';

const ProfilePage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <PageWrapper data-testid='ProfilePage'>
            <EditableProfileCard id={id!} />
        </PageWrapper>
    );
};

export default ProfilePage;
