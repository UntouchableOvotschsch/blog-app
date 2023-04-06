import React, { Dispatch, SetStateAction, Suspense } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { Loader } from 'shared/ui/Loader/Loader';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}
const LoginModal = ({ visible, setVisible }: LoginModalProps) => (
    <Modal visible={visible} setVisible={setVisible}>
        <Suspense fallback={<Loader />}>
            <LoginFormAsync />
        </Suspense>
    </Modal>
);

export default LoginModal;
