import React from "react";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {Meta} from "@storybook/react";

export default {
    title: 'Todolist/AppWithRedux Stories',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

export const AppWithReduxBaseExample = (props: any) => {
    return (<AppWithRedux/>)
};



