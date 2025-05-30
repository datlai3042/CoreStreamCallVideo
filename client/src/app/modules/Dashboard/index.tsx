import React from 'react'
import ShowListUsers from './components/ShowListUsers'
import styles from './styles/styles.module.scss'
import { useGetMe } from '../User/hooks/useGetMe'
import { createPeer } from '../Streaming/config/peer'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/Redux/store'
const DashboardView = () => {
    useGetMe()
    const user = useSelector((state: RootState) => state.authStore.user)
            const peer = createPeer(user?._id || '');
    
    return (
        <div id={`${styles.dashboard__container}`}>

            <ShowListUsers />
        </div>
    )
}

export default DashboardView