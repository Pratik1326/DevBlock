import { Widget } from './store'

export const templates = {
  todo: {
    name: 'To-Do App',
    description: 'A simple task management app',
    widgets: [
      {
        id: 'header-1',
        type: 'text' as const,
        position: { x: 50, y: 50 },
        size: { width: 300, height: 60 },
        properties: {
          text: 'My To-Do List',
          fontSize: 32,
          color: '#1f2937',
        },
      },
      {
        id: 'input-1',
        type: 'input' as const,
        position: { x: 50, y: 150 },
        size: { width: 300, height: 50 },
        properties: {
          placeholder: 'Add a new task...',
          label: 'New Task',
        },
      },
      {
        id: 'button-1',
        type: 'button' as const,
        position: { x: 370, y: 150 },
        size: { width: 100, height: 50 },
        properties: {
          label: 'Add Task',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
        },
      },
      {
        id: 'todo-1',
        type: 'todo' as const,
        position: { x: 50, y: 250 },
        size: { width: 500, height: 300 },
        properties: {
          label: 'Tasks',
          data: [
            { id: '1', text: 'Buy groceries', completed: false },
            { id: '2', text: 'Call dentist', completed: true },
            { id: '3', text: 'Finish project', completed: false },
          ],
        },
      },
    ],
  },
  crm: {
    name: 'CRM Dashboard',
    description: 'Customer relationship management dashboard',
    widgets: [
      {
        id: 'header-1',
        type: 'text' as const,
        position: { x: 50, y: 50 },
        size: { width: 400, height: 60 },
        properties: {
          text: 'Customer Dashboard',
          fontSize: 32,
          color: '#1f2937',
        },
      },
      {
        id: 'table-1',
        type: 'table' as const,
        position: { x: 50, y: 150 },
        size: { width: 800, height: 400 },
        properties: {
          label: 'Customers',
          data: [
            { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Active' },
            { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
            { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
          ],
        },
      },
      {
        id: 'chart-1',
        type: 'chart' as const,
        position: { x: 900, y: 150 },
        size: { width: 300, height: 200 },
        properties: {
          label: 'Sales Overview',
          data: [
            { month: 'Jan', sales: 1200 },
            { month: 'Feb', sales: 1900 },
            { month: 'Mar', sales: 1500 },
          ],
        },
      },
    ],
  },
  budget: {
    name: 'Budget Tracker',
    description: 'Personal finance and budget management',
    widgets: [
      {
        id: 'header-1',
        type: 'text' as const,
        position: { x: 50, y: 50 },
        size: { width: 350, height: 60 },
        properties: {
          text: 'Budget Tracker',
          fontSize: 32,
          color: '#1f2937',
        },
      },
      {
        id: 'input-1',
        type: 'input' as const,
        position: { x: 50, y: 150 },
        size: { width: 200, height: 50 },
        properties: {
          placeholder: 'Expense description',
          label: 'Description',
        },
      },
      {
        id: 'input-2',
        type: 'input' as const,
        position: { x: 270, y: 150 },
        size: { width: 150, height: 50 },
        properties: {
          placeholder: 'Amount',
          label: 'Amount',
        },
      },
      {
        id: 'button-1',
        type: 'button' as const,
        position: { x: 440, y: 150 },
        size: { width: 100, height: 50 },
        properties: {
          label: 'Add Expense',
          backgroundColor: '#10b981',
          color: '#ffffff',
        },
      },
      {
        id: 'table-1',
        type: 'table' as const,
        position: { x: 50, y: 250 },
        size: { width: 600, height: 300 },
        properties: {
          label: 'Expenses',
          data: [
            { id: '1', description: 'Groceries', amount: 120, date: '2024-01-15' },
            { id: '2', description: 'Gas', amount: 45, date: '2024-01-14' },
            { id: '3', description: 'Dinner', amount: 85, date: '2024-01-13' },
          ],
        },
      },
      {
        id: 'chart-1',
        type: 'chart' as const,
        position: { x: 700, y: 250 },
        size: { width: 300, height: 200 },
        properties: {
          label: 'Monthly Spending',
          data: [
            { category: 'Food', amount: 400 },
            { category: 'Transport', amount: 200 },
            { category: 'Entertainment', amount: 150 },
          ],
        },
      },
    ],
  },
} 