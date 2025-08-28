import styles from './style.module.css'
import Clipboard from '../../assets/Clipboard.svg'

export default function EmptyTasks() {
  return (
    <div className={styles.empty}>
      <img src={Clipboard} alt="Clipboard image" />
      <p>You don't have any tasks registered yet</p>
      <p>Create tasks and organize your to-do items</p>
    </div>
  )
}
