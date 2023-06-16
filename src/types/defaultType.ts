import * as React from 'react';
export interface ChildrenType {
    children?: React.ReactNode | React.ReactElement
}
export interface listItemType {
    icon: React.ReactElement
    url: string;
    title: string;
}