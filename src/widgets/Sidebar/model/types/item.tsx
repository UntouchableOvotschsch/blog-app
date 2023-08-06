import React from 'react';

export interface ItemType {
    path: string | undefined,
    text: string,
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
    authOnly?: boolean
}
