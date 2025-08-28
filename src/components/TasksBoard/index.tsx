import styles from './style.module.css'
import { ITask } from '../../App'
import { Task } from '../Task'
import EmptyTasks from '../EmptyTasks'
import { useState } from 'react'

// Utility to format ISO date to readable (e.g., August 28, 2025)
function formatDate(dateStr: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString(undefined, options)
}

// Group tasks by formatted date
function groupTasksByDate(tasks: ITask[]): Record<string, ITask[]> {
  return tasks.reduce((groups, task) => {
    const date = formatDate(task.createdAt)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(task)
    return groups
  }, {} as Record<string, ITask[]>)
}

interface TasksBoardProps {
  tasks: ITask[]
  onToggleTasksStatus: (id: string) => void
  onDeleteTask: (id: string) => void
}

export function TasksBoard({ tasks, ...props }: TasksBoardProps) {
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'complete' | 'incomplete'>('all')
  const [dateFilter, setDateFilter] = useState<'all' | string>('all') // 'all' or specific date

  // Extract distinct dates for filter dropdown
  const allDates = Array.from(new Set(tasks.map(task => formatDate(task.createdAt))))

  // Apply filters
  const filteredTasks = tasks.filter(task => {
    const formattedDate = formatDate(task.createdAt)

    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'complete' && task.isComplete) ||
      (statusFilter === 'incomplete' && !task.isComplete)

    const matchesDate = dateFilter === 'all' || formattedDate === dateFilter

    return matchesPriority && matchesStatus && matchesDate
  })

  const completeTasks = filteredTasks.filter(task => task.isComplete)
  const grouped = groupTasksByDate(filteredTasks)
  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  return (
    <div className={styles['tasks-board']}>
      {/* Header */}
      <header>
        <p className={styles['created-tasks']}>
          Created tasks <span>{filteredTasks.length}</span>
        </p>

        <p className={styles['complete-tasks']}>
          Completed{' '}
          <span>
            {completeTasks.length}
            {filteredTasks.length ? <span> of {filteredTasks.length}</span> : ''}
          </span>
        </p>
      </header>

      {/* Filters */}
      <div className={styles.filters}>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value as any)}>
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}>
          <option value="all">All Status</option>
          <option value="complete">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <select value={dateFilter} onChange={e => setDateFilter(e.target.value)}>
          <option value="all">All Dates</option>
          {allDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </div>

      {/* Task List or Empty State */}
      {filteredTasks.length ? (
        <div className={styles.tasks}>
          {sortedDates.map(date => (
            <div key={date}>
              <h3 className={styles.taskDate}>{date}</h3>
              <br />
              {grouped[date].map(task => (
                <Task key={task.id} {...task} {...props} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <EmptyTasks />
      )}
    </div>
  )
}

