// Importing styling
import styles from './App.module.css'

import { useState } from 'react'
import { v4 as uuid } from 'uuid'

// Importing custom components
import { Header } from './components/Header'
import { NewTask } from './components/NewTask'
import { TasksBoard } from './components/TasksBoard'

// Task interface
export interface ITask {
  id: string
  content: string
  isComplete: boolean
  priority: 'low' | 'medium' | 'high',
  createdAt: string
}

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

function App() {
  const [adding, setAdding] = useState(false);
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  // React state to hold the list of tasks
  const [tasks, setTask] = useState<ITask[]>(storedTasks)

  /**
   * Uses OpenAI API to analyze the task content and assign a priority level
   * @param taskContent - the text/content of the task
   * @returns a priority value: 'low', 'medium', or 'high'
   */
  async function getTaskPriority(taskContent: string): Promise<'low' | 'medium' | 'high'> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer  ${apiKey}`, // ⚠️ Insert your OpenAI API key here securely (not on frontend in production)
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-5',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that analyzes to-do items and classifies them by urgency as high, medium, or low priority.'
          },
          {
            role: 'user',
            content: `Classify the priority of this task: "${taskContent}". Return only one word: high, medium, or low.`
          }
        ],
        temperature: 0
      })
    })

    const data = await response.json()
    const reply = data.choices[0].message.content.trim().toLowerCase()

    // Validate and return the response, fallback to 'medium' if invalid
    if (['high', 'medium', 'low'].includes(reply)) {
      return reply as 'low' | 'medium' | 'high'
    }

    return 'medium' // default if something goes wrong
  }

  /**
   * Uses logic to analyze the task content, Rollback for OpenAI
   * @param taskContent - the text/content of the task
   * @returns a priority value: 'low', 'medium', or 'high'
   */
  function estimatePriority(taskContent: string): 'low' | 'medium' | 'high' {
    const lower = taskContent.toLowerCase()
    const highPriorityKeywords = ['urgent', 'asap', 'immediately', 'critical', 'important', 'priority', 'midnight']
    const mediumPriorityKeywords = ['tomorrow', 'soon', 'important-ish', 'later', 'eventually', 'next']
    // Check if any high priority keyword exists
    if (highPriorityKeywords.some(keyword => lower.includes(keyword))) {
      return 'high'
    }
    // Check if any medium priority keyword exists
    if (mediumPriorityKeywords.some(keyword => lower.includes(keyword))) {
      return 'medium'
    }
    return 'low'
  }


  /**
   * Creates a new task with content and priority, saves it to localStorage and state
   * @param content - the content of the new task
   */
  async function addNewTask(content: string): Promise<void> {
    setAdding(true);
    let priority = null;
    try {
      priority = await getTaskPriority(content) // Analyze and get priority from OpenAI
    } catch (err) {
      priority = estimatePriority(content);
    }

    const task: ITask = {
      id: uuid(),
      content,
      isComplete: false,
      priority: priority,
      createdAt: new Date().toISOString()
    }

    // Retrieve and update tasks in localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const updatedTasks = [task, ...storedTasks]

    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setAdding(false);
    setTask(updatedTasks)
  }

  /**
   * Deletes a task by its ID from state
   * @param id - ID of the task to delete
   */
  function deleteTask(id: string): void {
    // Filter out the task to delete
    const filteredTasks = tasks.filter(task => task.id !== id)
    // Update localStorage
    localStorage.setItem('tasks', JSON.stringify(filteredTasks))
    // Update state
    setTask(filteredTasks)
  }

  /**
   * Toggles a task's completion status and reorders tasks:
   * Incomplete tasks appear before completed ones.
   * @param id - ID of the task to toggle
   */
  function toggleTasksStatus(id: string): void {
    let updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    ) as ITask[]

    // Move incomplete tasks to the top
    updatedTasks = updatedTasks.sort((a, b) =>
      a.isComplete && b.isComplete ? 0 : !a.isComplete && b.isComplete ? -1 : 1
    )

    setTask(updatedTasks)
  }

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <main>
          {/* Component for creating a new task */}
          <NewTask showLoader={adding} onCreateNewTask={addNewTask} />
          {/* Component displaying the list of tasks */}
          <TasksBoard
            tasks={tasks}
            onDeleteTask={deleteTask}
            onToggleTasksStatus={toggleTasksStatus}
          />
        </main>
      </div>
    </>
  )
}

export default App
