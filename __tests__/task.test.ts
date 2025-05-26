import { describe, it, expect, beforeEach } from "@jest/globals"
import { loadTasks, saveTasks } from "@/lib/storage"
import type { Task } from "@/types/task"

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("Task Storage", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
  })

  it("should load tasks from localStorage", () => {
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Test Task",
        description: "Test Description",
        priority: "high",
        status: "todo",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
    ]

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTasks))

    const tasks = loadTasks()
    expect(tasks).toEqual(mockTasks)
    expect(localStorageMock.getItem).toHaveBeenCalledWith("taskease-tasks")
  })

  it("should return empty array when no tasks in localStorage", () => {
    localStorageMock.getItem.mockReturnValue(null)

    const tasks = loadTasks()
    expect(tasks).toEqual([])
  })

  it("should save tasks to localStorage", () => {
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Test Task",
        description: "Test Description",
        priority: "high",
        status: "todo",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
    ]

    saveTasks(mockTasks)
    expect(localStorageMock.setItem).toHaveBeenCalledWith("taskease-tasks", JSON.stringify(mockTasks))
  })
})

describe("Task Priority Sorting", () => {
  it("should sort tasks by priority correctly", () => {
    const tasks: Task[] = [
      {
        id: "1",
        title: "Low Priority Task",
        description: "",
        priority: "low",
        status: "todo",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        title: "High Priority Task",
        description: "",
        priority: "high",
        status: "todo",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "3",
        title: "Medium Priority Task",
        description: "",
        priority: "medium",
        status: "todo",
        createdAt: "2024-01-01T00:00:00.000Z",
      },
    ]

    const sorted = tasks.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })

    expect(sorted[0].priority).toBe("high")
    expect(sorted[1].priority).toBe("medium")
    expect(sorted[2].priority).toBe("low")
  })
})
