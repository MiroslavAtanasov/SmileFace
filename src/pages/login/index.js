import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context'
import styles from './index.module.css'
import Input from '../../components/input'
import Button from '../../components/button'
import Link from '../../components/link'

const LoginPage = () => {
    const history = useHistory()
    const context = useContext(UserContext)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const promise = await fetch('http://localhost:3333/api/user/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-type': 'application/json' }
            })
            const authToken = promise.headers.get('Authorization')
            document.cookie = `instagram=${authToken}`

            const response = await promise.json()

            if (response.email && authToken) {
                context.logIn({
                    email: response.email,
                    id: response._id
                })
                history.push(`/`)
            } else {
                history.push('/login')
            }
        } catch (e) {
            console.log('Incorrect email/password')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1 className={styles['logo-name']}>
                    SmileFace
                </h1>
                <div>
                    <form onSubmit={onSubmit}>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            // onBlur={this.handlerBlurEmail}
                            id="email"
                            type='login'
                            placeholder="Enter your email"
                        />
                        <Input
                            name='password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            // onBlur={this.handlerBlurPassword}
                            id="password"
                            type='login'
                            placeholder="Password"
                        />
                        <Button type='login' title="Log in" />
                        <div className={styles.or}>
                            <div className={styles['or-text']}>or</div>
                            <div className={styles.line}></div>
                        </div>
                    </form>
                </div>
                <div>
                    <Button type='facebook' title="Log in with Facebook" />
                </div>
            </div>
            <div className={styles.acc}>
                <div className={styles.text}>
                    <p>Don't have an account?
                    <Link
                            key='Sign up'
                            href="/register"
                            title='Sign up'
                            type='login'
                        />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage