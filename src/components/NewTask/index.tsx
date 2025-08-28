// Importing necessary modules and components
import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './style.module.css'

// Props interface: expects a function to create a new task
interface NewTaskProps {
  onCreateNewTask: (content: string) => void;
  showLoader: boolean
}

// NewTask component allows users to input and add a new task
export function NewTask({ onCreateNewTask, showLoader = false }: NewTaskProps) {
  // State to hold the value of the input field
  const [newTaskText, setNewTaskText] = useState('')

  // Check if input is empty to disable the submit button
  const isNewTaskEmpty = !newTaskText

  /**
   * Handles input validation failure.
   * Sets a custom validity message when the input is empty on form submission.
   */
  function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>): void {
    event.target.setCustomValidity(
      'Please enter a task first. This field is required.'
    )
  }

  /**
   * Handles input changes.
   * Resets validation message and updates the input state.
   */
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('') // Clear previous validation message
    setNewTaskText(event.target.value) // Update state with new input
  }

  /**
   * Handles form submission.
   * Prevents default form behavior, calls parent handler to create task, and resets input.
   */
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()
    onCreateNewTask(newTaskText) // Pass new task content up to parent
    setNewTaskText('') // Clear the input field
  }

  return (
    <div className={styles['new-task']}>
      {/* Input field for entering the task content */}
      <input
        type="text"
        onChange={handleNewTaskChange}
        value={newTaskText}
        placeholder="Add a new task"
        onInvalid={handleNewTaskInvalid}
        required
      />

      {/* Submit button, disabled if input is empty */}
      <button
        type="submit"
        onClick={handleCreateNewTask}
        disabled={isNewTaskEmpty}
      >
        {showLoader ? 'Adding' : 'Create'}
      </button>
    </div>
  )
}
