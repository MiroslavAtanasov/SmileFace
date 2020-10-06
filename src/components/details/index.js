import React, { useCallback, useState, useEffect } from "react"
import { useParams, useHistory } from 'react-router-dom'
import styles from './index.module.css'
import Avatar from '@material-ui/core/Avatar'

const DetailsPage = () => {
    const params = useParams()
    const history = useHistory()
    const [userInfo, setUserInfo] = useState(
        { postedBy: '', createdAt: '', location: '', imageUrl: '', description: '', likes: [], comments: [] }
    )


    const getData = useCallback(async () => {
        const response = await fetch(`http://localhost:3333/api/post/details/${params.id}`)

        if (!response.ok) {
            history.push('/error')
        } else {
            const post = await response.json()
            setUserInfo({ ...post })
        }
    }, [history, params.id])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <article className={styles.container}>
            <div className={styles.photo}>
                <img className={styles.image} alt='post-photos' src={userInfo.imageUrl} />
            </div>
            <div className={styles.info}>
                <header className={styles.header}>
                    <Avatar alt="miro" src='static/images/avatar/1.jpg'>
                    </Avatar>
                    <div>{userInfo.postedBy.username}</div>
                    <div>Follow</div>
                </header>
                <div className={styles.description}>{userInfo.description}</div>
                <div className={styles.comments}>{userInfo.comments}</div>
                <button>
                    like
                </button>
                <div>{userInfo.likes.length} likes</div>
                <div>{(userInfo.createdAt).substr(0, 10)}</div>
            </div>
        </article>
    )
}

export default DetailsPage