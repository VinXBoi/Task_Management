import { render, screen } from "../utils/test-utils"

// Mock the main page component (adjust based on your actual page)
const HomePage = () => (
  <div>
    <h1>Task Management</h1>
    <p>Welcome to your task management application</p>
    <button>Create New Task</button>
  </div>
)

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<HomePage />)

    expect(screen.getByRole("heading", { name: /task management/i })).toBeInTheDocument()
  })

  it("renders welcome message", () => {
    render(<HomePage />)

    expect(screen.getByText(/welcome to your task management application/i)).toBeInTheDocument()
  })

  it("renders create new task button", () => {
    render(<HomePage />)

    expect(screen.getByRole("button", { name: /create new task/i })).toBeInTheDocument()
  })
})
