import React from 'react';

import Flex, { FlexProps } from '../Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

const VStack = (props: VStackProps) => <Flex {...props} direction='column' />;

export default VStack;
