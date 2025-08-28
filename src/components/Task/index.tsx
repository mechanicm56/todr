// Importing necessary icons
import { AlignLeft, CheckCircle, Circle, List, Trash } from 'phosphor-react'
import { FormEvent } from 'react'
// Importing the task interface to define the props structure
import { ITask } from '../../App'
// Importing CSS module styles
import styles from './style.module.css'

// Defining the props interface extending the task interface (id, content, isComplete)
// Also including the functions to toggle task status and delete task
interface TaskProps extends ITask {
  onToggleTasksStatus: (id: string) => void
  onDeleteTask: (id: string) => void
}

 // Helper to return a CSS class based on priority
  function getPriorityClass(priority: 'low' | 'medium' | 'high') {
    switch (priority) {
      case 'high':
        return styles.highPriority
      case 'medium':
        return styles.mediumPriority
      case 'low':
      default:
        return styles.lowPriority
    }
  }

// Functional component to represent a single task
export function Task({
  id,
  content,
  isComplete,
  priority,
  onToggleTasksStatus,
  onDeleteTask
}: TaskProps) {

  // Handler to toggle task's completed status
  function handleToggleTasksStatus(event: FormEvent) {
    event.preventDefault()
    onToggleTasksStatus(id)
  }

  // Handler to delete the task
  function handDeleteTask(event: FormEvent) {
    event.preventDefault()
    onDeleteTask(id)
  }

  return (
    <div className={styles.task}>
      {/* Button to mark the task as complete or incomplete */}
      <button
        title="complete task"
        className={styles['complete-btn']}
        type="submit"
        onClick={handleToggleTasksStatus}
      >
        {isComplete ? (
          // Show checked icon if task is completed
          <CheckCircle
            size={24}
            weight="duotone"
            className={styles.completed}
          />
        ) : (
          // Show empty circle icon if task is not completed
          <Circle size={24} weight="duotone" className={styles['to-do']} />
        )}
      </button>

      {/* Task content text. If completed, it will have a line-through style */}
      <p className={isComplete ? styles.through : ''}>
        {/* Priority badge */}
        <span className={`${styles.priorityBadge} ${getPriorityClass(priority)}`}>
          {priority}
        </span>
        <span>{content}</span>
      </p>

      {/* Button to delete the task */}
      <button
        title="delete task"
        type="submit"
        className={styles['delete-btn']}
        onClick={handDeleteTask}
      >
        <Trash size={24} />
      </button>
    </div>
  )
}
