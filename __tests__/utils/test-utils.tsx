import type React from "react"
import type { ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { ThemeProvider } from "next-themes"

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }

// Custom matchers and utilities
export const createMockTask = (overrides = {}) => ({
  id: "1",
  title: "Test Task",
  description: "Test Description",
  status: "pending",
  priority: "medium",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
})

export const createMockUser = (overrides = {}) => ({
  id: "1",
  name: "Test User",
  email: "test@example.com",
  ...overrides,
})

// Mock API responses
export const mockApiResponse = (data: any, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => data,
  text: async () => JSON.stringify(data),
})

// Wait for async operations
export const waitForLoadingToFinish = () => new Promise((resolve) => setTimeout(resolve, 0))
