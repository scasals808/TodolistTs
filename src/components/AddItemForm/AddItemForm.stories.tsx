import React from "react";
import {action} from "@storybook/addon-actions";
import {AddItemForm} from "./AddItemForm";

export default {
    title: 'Todolist/AddItemForm Stories',
    component: AddItemForm,

}

export const AddItemFormBaseExample = () => {
    return (<AddItemForm
        addItem={action('Button inside form clicked')}
        todoId={'zxc'}
    />)
};

export const AddItemFormDisabledExample = () => {
    return (<AddItemForm disabled={true}
        addItem={action('Button inside form clicked')}
        todoId={'zxc'}
    />)
};
