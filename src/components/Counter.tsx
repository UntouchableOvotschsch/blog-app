import {FC, useState} from 'react'
import styles from './Counter.module.scss'

export const Counter: FC = () => {

    const [counter, setCounter] = useState(0)
    return (
        <div className={styles.container}>
            <h1>{counter}</h1>

            <div>
                <button onClick={() => setCounter(prev => prev + 1)}>increment</button>
                <button onClick={() => setCounter(prev => prev - 1)}>decrement</button>
            </div>
        </div>
    )
}

