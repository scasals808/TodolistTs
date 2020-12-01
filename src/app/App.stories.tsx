import React from "react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";
import {Meta} from "@storybook/react";
import StoryRouter from 'storybook-react-router';

export default {
    title: 'Todolist/App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator, StoryRouter()]
} as Meta

export const AppBaseExample = () => {
    return (<App demo={true}/>)
};



