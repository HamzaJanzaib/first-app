import React, { createContext, useState, useContext } from "react";
import { Task, TASKS } from "@/constants/task";

type Category = {
    id: string;
    name: string;
    icon: string;
    color: string;
}

type TaskContextType = {
  tasks: Task[];
  categories: Category[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
};

const INITIAL_CATEGORIES: Category[] = [
    { id: '1', name: 'Design', icon: 'color-palette', color: '#ec4899' },
    { id: '2', name: 'Grocery shopping', icon: 'cart', color: '#f59e0b' },
    { id: '3', name: 'Home Responsibilities', icon: 'home', color: '#10b981' },
    { id: '4', name: 'Personal Study', icon: 'book', color: '#6366f1' },
    { id: '5', name: 'Health & Fitness', icon: 'heart', color: '#ef4444' },
    { id: '6', name: 'Work Projects', icon: 'briefcase', color: '#3b82f6' },
];

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Math.random().toString(36).substring(7) };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: Math.random().toString(36).substring(7) };
    setCategories((prev) => [...prev, newCategory]);
  };

  return (
    <TaskContext.Provider value={{ tasks, categories, addTask, updateTask, deleteTask, addCategory }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
