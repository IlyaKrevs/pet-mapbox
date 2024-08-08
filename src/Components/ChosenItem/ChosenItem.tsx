import React from 'react'
import styles from './ChosenItem.module.css'
import { IResponseItem } from '../../redux/api-mapbox/mapbox'

interface IChosenItem {
    data: IResponseItem
}

export const ChosenItem: React.FC<IChosenItem> = ({ data }) => {
    return (
        <div className={styles.mainContainer}>
            <div>Name: {data.properties.name}</div>
            <div>Full_Address: {data.properties.full_address}</div>
            <div>Mapbox_ID: {data.properties.mapbox_id}</div>
        </div>
    )
}
