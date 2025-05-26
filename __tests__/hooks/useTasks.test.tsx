"use client"

import React from "react"

import { renderHook, act } from "@testing-library/react"
import { createMockTask } from "../utils/test-utils"

// Mock custom hook (adjust based on your actual hook)
const useTasks = () => {
  const [tasks, setTasks] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const addTask = (task: any) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now().toString() }])
  }

  const updateTask = (id: string, updates: any) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
  }
}

describe("useTasks", () => {
  it("should initialize with empty tasks array", () => {
    const { result } = renderHook(() => useTasks())

    expect(result.current.tasks).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it("should add a new task", () => {
    const { result } = renderHook(() => useTasks())
    const newTask = createMockTask({ title: "New Task" })

    act(() => {
      result.current.addTask(newTask)
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe("New Task")
  })

  it("should update an existing task", () => {
    const { result } = renderHook(() => useTasks())
    const task = createMockTask()

    act(() => {
      result.current.addTask(task)
    })

    const taskId = result.current.tasks[0].id

    act(() => {
      result.current.updateTask(taskId, { title: "Updated Task" })
    })

    expect(result.current.tasks[0].title).toBe("Updated Task")
  })

  it("should delete a task", () => {
    const { result } = renderHook(() => useTasks())
    const task = createMockTask()

    act(() => {
      result.current.addTask(task)
    })

    const taskId = result.current.tasks[0].id

    act(() => {
      result.current.deleteTask(taskId)
    })

    expect(result.current.tasks).toHaveLength(0)
  })
})
