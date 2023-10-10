import React from 'react';

import Flex, { FlexProps } from '../Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

const HStack = (props: HStackProps) => <Flex {...props} direction='row' />;

export default HStack;
