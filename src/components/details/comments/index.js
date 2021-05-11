import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './index.module.css'
import getCookie from '../../../utils/getCookie'
import dataService from '../../../services/dataService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"

const Comments = ({ userInfo, user }) => {
    const params = useParams()

    const DeleteComment = (id) => {
        return async function () {
            const postId = params.id
            await dataService({
                method: 'DELETE', url: `/post/deleteComment/${id}`, data: { postId }, token: getCookie('auth-token')
            })
        }
    }

    const renderComments = () => {
        return userInfo.comments
            .map(e => {
                return (
                    <div key={e._id} className={styles.comment}>
                        {/* <strong><p>{e.postedBy}</p></strong> */}
                        <div>
                            <strong><p>dada</p></strong>
                            <p className={styles.com}>{e.comment}</p>
                        </div>
                        {user._id === e.postedBy
                            ? <span onClick={DeleteComment(e._id)}>
                                <FontAwesomeIcon className={styles.icon} icon={faTrashAlt} />
                            </span>
                            : null
                        }
                    </div>
                )
            })
    }

    return (
        <div className={styles.container}>
            {userInfo.description ? <div className={styles.description}><strong>{userInfo.postedBy.username}</strong>{userInfo.description}</div> : null}
            <div >{renderComments()}</div>
        </div>

    )
}

export default Comments