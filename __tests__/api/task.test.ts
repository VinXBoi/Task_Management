import { createMockTask, mockApiResponse } from "../utils/test-utils"


// Mock API functions (adjust based on your actual API)
const fetchTasks = async () => {
  const response = await fetch("/api/tasks")
  return response.json()
}

const createTask = async (task: any) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
  return response.json()
}

// Mock fetch globally
global.fetch = jest.fn()

describe("API Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("fetchTasks", () => {
    it("should fetch tasks successfully", async () => {
      const mockTasks = [createMockTask(), createMockTask({ id: "2" })]
      ;(fetch as jest.Mock).mockResolvedValueOnce(mockApiResponse(mockTasks))

      const result = await fetchTasks()

      expect(fetch).toHaveBeenCalledWith("/api/tasks")
      expect(result).toEqual(mockTasks)
    })

    it("should handle fetch error", async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"))

      await expect(fetchTasks()).rejects.toThrow("Network error")
    })
  })

  describe("createTask", () => {
    it("should create task successfully", async () => {
      const newTask = createMockTask({ title: "New Task" })
      ;(fetch as jest.Mock).mockResolvedValueOnce(mockApiResponse(newTask, 201))

      const result = await createTask(newTask)

      expect(fetch).toHaveBeenCalledWith("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      })
      expect(result).toEqual(newTask)
    })
  })
})
