// Mock utility functions (adjust based on your actual utils)
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString()
}

const validateTask = (task: any) => {
  const errors: string[] = []

  if (!task.title || task.title.trim().length === 0) {
    errors.push("Title is required")
  }

  if (task.title && task.title.length > 100) {
    errors.push("Title must be less than 100 characters")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "red"
    case "medium":
      return "yellow"
    case "low":
      return "green"
    default:
      return "gray"
  }
}

describe("Utility Functions", () => {
  describe("formatDate", () => {
    it("should format date string correctly", () => {
      const date = "2024-01-15T10:30:00Z"
      const formatted = formatDate(date)
      expect(formatted).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/)
    })

    it("should format Date object correctly", () => {
      const date = new Date("2024-01-15")
      const formatted = formatDate(date)
      expect(formatted).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/)
    })
  })

  describe("validateTask", () => {
    it("should return valid for a proper task", () => {
      const task = { title: "Valid Task", description: "Description" }
      const result = validateTask(task)

      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it("should return invalid for task without title", () => {
      const task = { description: "Description" }
      const result = validateTask(task)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain("Title is required")
    })

    it("should return invalid for task with empty title", () => {
      const task = { title: "   ", description: "Description" }
      const result = validateTask(task)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain("Title is required")
    })

    it("should return invalid for task with title too long", () => {
      const task = { title: "a".repeat(101), description: "Description" }
      const result = validateTask(task)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain("Title must be less than 100 characters")
    })
  })

  describe("getPriorityColor", () => {
    it("should return correct colors for priorities", () => {
      expect(getPriorityColor("high")).toBe("red")
      expect(getPriorityColor("medium")).toBe("yellow")
      expect(getPriorityColor("low")).toBe("green")
      expect(getPriorityColor("unknown")).toBe("gray")
    })
  })
})
