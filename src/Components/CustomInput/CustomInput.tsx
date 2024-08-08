import React from 'react'
import styles from './CustomInput.module.css'


interface ICustomInput {
    value: string,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handlerFocusBlur: (value: boolean) => void
}

export const CustomInput: React.FC<ICustomInput> = ({ value, changeHandler, handlerFocusBlur }) => {
    return (
        <input type="text"
            onFocus={() => handlerFocusBlur(true)}
            className={styles.inputContainer}
            placeholder='Type a place name...'
            value={value}
            onChange={changeHandler}
        />
    )
}
