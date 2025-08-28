import styles from './style.module.css'
import logo from '../../assets/ai.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="todo list logo" />
      <h1>
        <span>To</span>
        <span>do</span>
      </h1>
    </header>
  )
}
