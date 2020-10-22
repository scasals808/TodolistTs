import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'Todolist/EditableSpan Stories',
    component: EditableSpan
}

export const EditableSpanFormBaseExample = () => {
    return (<EditableSpan title={'StartValue'} saveNewTitle={action('Value changed')}/>)
};