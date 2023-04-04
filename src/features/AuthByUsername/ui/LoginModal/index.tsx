import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import LoginForm from '../LoginForm';

interface LoginModalProps {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}
const LoginModal = ({ visible, setVisible }: LoginModalProps) => (
    <Modal visible={visible} setVisible={setVisible}>
        <LoginForm />
    </Modal>
);

export default LoginModal;
