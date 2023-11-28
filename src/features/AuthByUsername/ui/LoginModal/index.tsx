import React, { Suspense } from 'react';

import { useDeviceDetect } from '@/shared/lib/hooks/useDeviceDetect';
import DrawerDeprecated from '@/shared/ui/deprecated/Drawer';
import Drawer from '@/shared/ui/Drawer';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Modal as ModalDeprecated } from '@/shared/ui/deprecated/Modal';
import { Modal } from '@/shared/ui/Modal';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    visible: boolean;
    changeVisibility: () => void;
}
const LoginModal = ({ visible, changeVisibility }: LoginModalProps) => {
    const isMobile = useDeviceDetect();

    if (isMobile) {
        return (
            <ToggleFeatureComponent
                /* eslint-disable-next-line i18next/no-literal-string */
                name='isAppRedesigned'
                on={
                    <Drawer visible={visible} changeVisibility={changeVisibility}>
                        <Suspense fallback={<Loader />}>
                            <LoginFormAsync changeVisibility={changeVisibility} />
                        </Suspense>
                    </Drawer>
                }
                off={
                    <DrawerDeprecated visible={visible} changeVisibility={changeVisibility}>
                        <Suspense fallback={<Loader />}>
                            <LoginFormAsync changeVisibility={changeVisibility} />
                        </Suspense>
                    </DrawerDeprecated>
                }
            />
        );
    }

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <Modal visible={visible} changeVisibility={changeVisibility}>
                    <Suspense fallback={<Loader />}>
                        <LoginFormAsync changeVisibility={changeVisibility} />
                    </Suspense>
                </Modal>
            }
            off={
                <ModalDeprecated visible={visible} changeVisibility={changeVisibility}>
                    <Suspense fallback={<Loader />}>
                        <LoginFormAsync changeVisibility={changeVisibility} />
                    </Suspense>
                </ModalDeprecated>
            }
        />
    );
};

export default LoginModal;
