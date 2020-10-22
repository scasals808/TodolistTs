import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {
    console.log('span')
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
        ? <TextField
            variant={'outlined'}
            value={title}
            onBlur={deActivatedEditMode}
            autoFocus={true}
            onChange={changeTitle}
        />
        : <span onDoubleClick={activatedEditMode}>{props.title}</span>
})