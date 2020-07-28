import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

export function EditableSpan(props: PropsType) {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)


    function activatedEditMode() {
        setEditMode(true)
        setTitle(props.title)
    }

    function deActivatedEditMode() {
        setEditMode(false)
        props.saveNewTitle(title)
    }

    function changeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value);
    }

    return editMode
        ? <input
            value={title}
            onBlur={deActivatedEditMode}
            autoFocus={true}
            onChange={changeTitle}
        />
        : <span onDoubleClick={activatedEditMode}>{props.title}</span>
}