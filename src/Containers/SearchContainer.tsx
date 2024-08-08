import React, { useEffect, useRef, useState } from 'react'
import styles from './SearchContainer.module.css'
import { CustomInput } from '../Components/CustomInput/CustomInput'
import { SuggestionList } from '../Components/SuggestionList/SuggestionList'
import { useGetDataByTextQuery } from '../redux/api-mapbox/mapbox'
import { ChosenItem } from '../Components/ChosenItem/ChosenItem'
import { IResponseItem } from '../redux/api-mapbox/mapbox'

export const SearchContainer = () => {

    const [input, setInput] = useState<string>('')
    const [searchValue, setSearchValue] = useState<string>('')
    const [chosenIndex, setChosenIndex] = useState<number | null>(null)
    const [isShowSuggestion, setIsShowSuggestion] = useState<boolean>(false)
    const [chosenItem, setChosenItem] = useState<IResponseItem | null>(null)

    const timeoutID = useRef<NodeJS.Timeout>()
    const inputContainerRef = useRef<HTMLDivElement>(null)

    const { data, isFetching } = useGetDataByTextQuery(searchValue, { skip: !searchValue.length })

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setChosenItem(null)
        setInput(e.target.value)
        clearTimeout(timeoutID.current)

        timeoutID.current = setTimeout(() => {
            setSearchValue(e.target.value)
            setChosenIndex(0)
            setIsShowSuggestion(true)
        }, 500);
    }


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (inputContainerRef.current && !inputContainerRef.current.contains(e.target as Node)) {
                setIsShowSuggestion(false)
            }
        }

        window.addEventListener('mousedown', handleClickOutside)

        return () => window.removeEventListener('mousedown', handleClickOutside)
    }, [])


    function handleFocusBlur(value: boolean) {
        setIsShowSuggestion(value)
    }

    function hoverHadnler(index: number) {
        setChosenIndex(index)
    }

    function pickHandler(value: string) {
        setInput(value)
        data && chosenIndex && setChosenItem(data[chosenIndex])
        setIsShowSuggestion(false)
    }

    const callbacksForSuggestionItem = {
        hover: hoverHadnler,
        pick: pickHandler,
    }

    useEffect(() => {
        const keydownHandler = (e: KeyboardEvent) => {
            if (chosenIndex === null || !data) {
                return
            }

            if (e.key === 'ArrowDown') {
                if (chosenIndex < data.length - 1) {
                    setChosenIndex(chosenIndex + 1)
                } else {
                    setChosenIndex(0)
                }

            } else if (e.key === 'ArrowUp') {
                if (chosenIndex > 0) {
                    setChosenIndex(chosenIndex - 1)
                } else {
                    setChosenIndex(data.length - 1)
                }

            } else if (e.key === 'Enter') {
                setInput(data[chosenIndex].properties.full_address)
                setChosenItem(data[chosenIndex])
                setIsShowSuggestion(false)
            }
        }

        window.addEventListener('keydown', keydownHandler)
        return () => window.removeEventListener('keydown', keydownHandler)
    }, [chosenIndex, data, searchValue])



    let content;

    if (isShowSuggestion && searchValue.length && data && !isFetching) {
        content = (<SuggestionList
            arr={data}
            chosenIndex={chosenIndex}
            searchValue={searchValue}
            callbacks={callbacksForSuggestionItem}
        />)
    } else if (chosenItem && searchValue.length) {
        content = (<ChosenItem data={chosenItem} />)
    }

    return (
        <div className={styles.wrapper} >
            <div className={styles.mainContainer}
                ref={inputContainerRef}
            >
                <CustomInput
                    handlerFocusBlur={handleFocusBlur}
                    value={input}
                    changeHandler={changeHandler}
                />

                {content}
            </div>
        </div>
    )
}