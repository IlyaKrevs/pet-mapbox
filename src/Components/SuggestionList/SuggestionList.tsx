import React from 'react'
import styles from './SuggestionList.module.css'
import { IResponseItem } from '../../redux/api-mapbox/mapbox'

interface ISuggestionList {
    arr: IResponseItem[],
    chosenIndex: number | null,
    searchValue: string,
    callbacks: {
        hover: (i: number) => void,
        pick: (v: string) => void
    }
}

export const SuggestionList: React.FC<ISuggestionList> = ({ arr, chosenIndex, searchValue, callbacks }) => {

    return (
        <div className={styles.mainContainer}>
            {arr.map((item, index) => <SuggestionItem
                key={item.id}
                value={item}
                chosenIndex={chosenIndex}
                index={index}
                searchValue={searchValue}
                callbacks={callbacks}
            />)}
        </div>
    )
}



interface ISuggestionItem {
    value: IResponseItem,
    chosenIndex: number | null,
    index: number,
    searchValue: string,
    callbacks: {
        hover: (i: number) => void,
        pick: (v: string) => void
    }
}
const SuggestionItem: React.FC<ISuggestionItem> = ({ value, chosenIndex, index, searchValue, callbacks }) => {

    let prevPart = ''
    let emphasisPart = ''
    let lastPart = ''

    let firstShortCut = value.properties.full_address
    let secondShortCut = searchValue

    if (firstShortCut.toLowerCase().includes(secondShortCut.toLowerCase())) {
        let index = firstShortCut.toLowerCase().indexOf(secondShortCut.toLowerCase())

        prevPart = firstShortCut.slice(0, index)

        emphasisPart = firstShortCut.slice(index, secondShortCut.length)
        lastPart = firstShortCut.slice(index + secondShortCut.length)

    } else {
        lastPart = firstShortCut
    }

    let resultStyle = [styles.itemContainer];

    if (chosenIndex === index) {
        resultStyle.push(styles.chosenStyle)
    }

    return (
        <div className={resultStyle.join(' ')}
            onMouseOver={() => callbacks.hover(index)}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                e.stopPropagation()
                callbacks.pick(firstShortCut)
            }}
        >
            <div>
                {prevPart}
                <span className={styles.emphasisPart}>
                    {emphasisPart}
                </span>
                {lastPart}
            </div>
        </div>
    )
}
