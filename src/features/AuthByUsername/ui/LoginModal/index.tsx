import React, { Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { useDeviceDetect } from '@/shared/lib/hooks/useDeviceDetect';
import Drawer from '@/shared/ui/Drawer';

interface LoginModalProps {
    visible: boolean
    changeVisibility: () => void
}
const LoginModal = ({ visible, changeVisibility }: LoginModalProps) => {
    const isMobile = useDeviceDetect();

    if (isMobile) {
        return (
            <Drawer visible={visible} changeVisibility={changeVisibility}>
                <Suspense fallback={<Loader />}>
                    <LoginFormAsync changeVisibility={changeVisibility} />
                </Suspense>
            </Drawer>
        );
    }

    return (
        <Modal visible={visible} changeVisibility={changeVisibility}>
            <Suspense fallback={<Loader />}>
                <LoginFormAsync changeVisibility={changeVisibility} />
            </Suspense>
        </Modal>
    );
};

export default LoginModal;
