"use client"

import { useState, useEffect } from "react"
import { TaskForm } from "@/components/task-form"
import { TaskList } from "@/components/task-list"
import { TaskStats } from "@/components/task-stats"
import { TaskFilters } from "@/components/task-filters"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Task, TaskStatus } from "@/types/task"
import { loadTasks, saveTasks } from "@/lib/storage"

export default function TaskManagementApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = loadTasks()
    setTasks(savedTasks)
    setFilteredTasks(savedTasks)
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  // Filter and search tasks
  useEffect(() => {
    let filtered = tasks

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort by priority (high -> medium -> low)
    filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })

    setFilteredTasks(filtered)
  }, [tasks, statusFilter, searchQuery])

  const handleCreateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
  }

  const handleUpdateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!editingTask) return

    const updatedTask: Task = {
      ...editingTask,
      ...taskData,
    }

    setTasks((prev) => prev.map((task) => (task.id === editingTask.id ? updatedTask : task)))
    setEditingTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">TaskEasy</h1>
          <p className="text-gray-600">Lightweight task management for agile teams</p>
        </div>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{editingTask ? "Edit Task" : "Create New Task"}</CardTitle>
                <CardDescription>
                  {editingTask ? "Update the task details below" : "Add a new task to your workflow"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaskForm
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  initialData={editingTask}
                  isEditing={!!editingTask}
                  onCancel={handleCancelEdit}
                />
              </CardContent>
            </Card>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Task Dashboard</CardTitle>
                <CardDescription>Manage your tasks with priority-based organization</CardDescription>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search tasks by title or description..."
                  />
                  <TaskFilters currentFilter={statusFilter} onFilterChange={setStatusFilter} />
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="active">Active Tasks</TabsTrigger>
                    <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
                  </TabsList>

                  <TabsContent value="active" className="mt-4">
                    <TaskList
                      tasks={filteredTasks.filter((task) => task.status !== "done")}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      showCompleted={false}
                    />
                  </TabsContent>

                  <TabsContent value="completed" className="mt-4">
                    <TaskList
                      tasks={filteredTasks.filter((task) => task.status === "done")}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      showCompleted={true}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
