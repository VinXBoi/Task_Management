"use client"

import { render, screen, fireEvent } from "../utils/test-utils"
import { createMockTask } from "../utils/test-utils"

// Mock TaskCard component (you'll need to adjust based on your actual component)
const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: any) => (
  <div data-testid="task-card">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <span data-testid="task-status">{task.status}</span>
    <span data-testid="task-priority">{task.priority}</span>
    <button onClick={() => onEdit(task.id)}>Edit</button>
    <button onClick={() => onDelete(task.id)}>Delete</button>
    <button onClick={() => onStatusChange(task.id, "completed")}>Mark Complete</button>
  </div>
)

describe("TaskCard", () => {
  const mockTask = createMockTask()
  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()
  const mockOnStatusChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders task information correctly", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} onStatusChange={mockOnStatusChange} />)

    expect(screen.getByText(mockTask.title)).toBeInTheDocument()
    expect(screen.getByText(mockTask.description)).toBeInTheDocument()
    expect(screen.getByTestId("task-status")).toHaveTextContent(mockTask.status)
    expect(screen.getByTestId("task-priority")).toHaveTextContent(mockTask.priority)
  })

  it("calls onEdit when edit button is clicked", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} onStatusChange={mockOnStatusChange} />)

    fireEvent.click(screen.getByText("Edit"))
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask.id)
  })

  it("calls onDelete when delete button is clicked", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} onStatusChange={mockOnStatusChange} />)

    fireEvent.click(screen.getByText("Delete"))
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id)
  })

  it("calls onStatusChange when mark complete button is clicked", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} onStatusChange={mockOnStatusChange} />)

    fireEvent.click(screen.getByText("Mark Complete"))
    expect(mockOnStatusChange).toHaveBeenCalledWith(mockTask.id, "completed")
  })
})
