import styles from './style.module.css'
import logo from '../../assets/rocket.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="todo list logo" />
      <h1>
        <span>to</span>
        <span>do</span>
      </h1>
    </header>
  )
}
