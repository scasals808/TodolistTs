import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsType) {
    let [itemName, setItemName] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    function onItemNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setItemName(event.currentTarget.value);
        setError(null);
    }

    function onAddItemKeyPressed(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            addItemLocal()
        }
    }

    function addItemLocal() {
        if (itemName.trim() !== '') {
            props.addItem(itemName.trim());
            setItemName('');
        } else {
            setError('Title is required!');
        }
    }

    return (
        <div>
            <input
                type='text'
                value={itemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                className={error ? 'error' : ''}
            />
            <button onClick={addItemLocal}>+</button>
            {error && <div className={'error_message'}>{error}</div>}
        </div>
    )
}
