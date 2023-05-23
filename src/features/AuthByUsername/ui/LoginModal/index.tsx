import React, { Suspense } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { Loader } from 'shared/ui/Loader/Loader';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    visible: boolean
    changeVisibility: () => void
}
const LoginModal = ({ visible, changeVisibility }: LoginModalProps) => (
    <Modal visible={visible} changeVisibility={changeVisibility}>
        <Suspense fallback={<Loader />}>
            <LoginFormAsync changeVisibility={changeVisibility} />
        </Suspense>
    </Modal>
);

export default LoginModal;
