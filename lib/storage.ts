import type { Task } from "@/types/task"

const STORAGE_KEY = "taskease-tasks"

export function loadTasks(): Task[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error)
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error)
  }
}
