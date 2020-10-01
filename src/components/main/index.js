import React, { useState, useEffect } from 'react'
import style from './index.module.css'
import Post from '../post'
import PageLayout from '../page-layout'
import getCookie from '../../utils/getCookie'


const Main = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const promise = await fetch('http://localhost:3333/api/post/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('auth-token')
            }
        }
        )
        const posts = await promise.json()
        setPosts(posts)
    }

    const renderPosts = () => {
        return posts.map(post => {
            return (
                <Post key={post._id} {...post} />
            )
        })
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <PageLayout>
            <div className={style.main}>
                <div className={style.stories}>
                    dadw
                    </div>
                <div className={style.posts}>
                    {renderPosts()}
                </div>
                <div className={style.aside}>
                    <div>
                        <div className={style['aside-title']}>
                            Suggestions For You
                            </div>
                    </div>
                </div>
            </div>
        </PageLayout>

    )
}

export default Main