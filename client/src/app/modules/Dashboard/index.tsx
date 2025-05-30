import React from 'react'
import ShowListUsers from './components/ShowListUsers'
import styles from './styles/styles.module.scss'
import { useGetMe } from '../User/hooks/useGetMe'
const DashboardView = () => {
    useGetMe()
    return (
        <div id={`${styles.dashboard__container}`}>

            <ShowListUsers />
        </div>
    )
}

export default DashboardView