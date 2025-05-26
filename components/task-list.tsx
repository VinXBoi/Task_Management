"use client"

import type { Task } from "@/types/task"
import { TaskCard } from "@/components/task-card"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  showCompleted?: boolean
}

export function TaskList({ tasks, onEdit, onDelete, showCompleted = false }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">{showCompleted ? "No completed tasks yet" : "No active tasks found"}</p>
        <p className="text-sm">
          {showCompleted ? "Complete some tasks to see them here" : "Create a new task to get started"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
