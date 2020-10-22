import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropsType = {
    todoId: string
    addItem: (title: string, todoId: string) => void
}

export const AddItemForm = React.memo((props: PropsType) => {
    let [itemName, setItemName] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    function onItemNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setItemName(event.currentTarget.value);
        setError(null);
    }

    function onAddItemKeyPressed(event: KeyboardEvent<HTMLInputElement>) {
        if (error !== null) setError(null)
        if (event.key === 'Enter') {
            addItemLocal()
        }
    }

    function addItemLocal() {
        if (itemName.trim() !== '') {
            props.addItem(itemName.trim(), props.todoId);
            setItemName('');
        } else {
            setError('Title is required!');
        }
    }

    return (
        <div>
            <TextField size={"small"}
                       variant={'outlined'}
                       value={itemName}
                       onChange={onItemNameChanged}
                       onKeyPress={onAddItemKeyPressed}
                       error={!!error} //! - преобразование в булевый тип, !! - приведение в противоположный, className={error ? 'error' : ''}
                       label={'Title'}
                       helperText={error} //{error && <div className={'error_message'}>{error}</div>}
            />
            <IconButton color={"primary"} onClick={addItemLocal}>
                <AddBox/>
            </IconButton>
        </div>
    )
})
