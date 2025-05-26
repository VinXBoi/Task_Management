"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Task } from "@/types/task"
import { Edit2, Trash2, ChevronDown, ChevronUp, Calendar, Clock } from "lucide-react"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-progress":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "done":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date() && task.status !== "done"
  }

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${
        task.status === "done" ? "opacity-75" : ""
      } ${isOverdue(task.dueDate) ? "border-red-300 bg-red-50" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-lg leading-tight ${
                task.status === "done" ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </Badge>
              <Badge className={getStatusColor(task.status)}>
                {task.status === "todo" ? "To-Do" : task.status === "in-progress" ? "In Progress" : "Done"}
              </Badge>
              {task.dueDate && (
                <Badge
                  variant="outline"
                  className={`flex items-center gap-1 ${isOverdue(task.dueDate) ? "border-red-400 text-red-600" : ""}`}
                >
                  <Calendar className="h-3 w-3" />
                  {formatDate(task.dueDate)}
                  {isOverdue(task.dueDate) && <Clock className="h-3 w-3" />}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(task)} className="h-8 w-8 p-0">
              <Edit2 className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Task</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &quot;{task.title}&quot;? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(task.id)} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>

      {task.description && (
        <CardContent className="pt-0">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-auto p-0 text-sm text-gray-600 hover:text-gray-900"
            >
              <span className="flex items-center gap-1">
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {isExpanded ? "Hide" : "Show"} Description
              </span>
            </Button>

            {isExpanded && <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{task.description}</div>}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
