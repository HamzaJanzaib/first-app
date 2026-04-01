export type TaskStatus = "Done" | "In Progress" | "Todo";

export type TaskIcon = {
  name: string;
  backgroundColor: string;
};

export type Task = {
  id: string;
  category: string;
  title: string;
  time: string;
  status: TaskStatus;
  icon: TaskIcon;
  createdAt: string; // ISO string representing the date
};

export const TASKS: Task[] = [
  {
    id: "1",
    category: "Grocery shopping app design",
    title: "Market Research",
    time: "10:00 AM",
    status: "Done",
    icon: { name: "grid", backgroundColor: "#FF6B8A" },
    createdAt: new Date(2026, 2, 25).toISOString(), // 2026-03-25 base on DateSelector base
  },
  {
    id: "2",
    category: "Grocery shopping app design",
    title: "Competitive Analysis",
    time: "12:00 PM",
    status: "In Progress",
    icon: { name: "grid", backgroundColor: "#FF6B8A" },
    createdAt: new Date(2026, 2, 25).toISOString(),
  },
  {
    id: "3",
    category: "Uber Eats redesign challenge",
    title: "Create Low-fidelity Wireframe",
    time: "07:00 PM",
    status: "Todo",
    icon: { name: "arrow-down-circle", backgroundColor: "#4ADE80" },
    createdAt: new Date(2026, 2, 26).toISOString(),
  },
  {
    id: "4",
    category: "About design sprint",
    title: "How to pitch a Design Sprint",
    time: "09:00 PM",
    status: "Todo",
    icon: { name: "bookmark", backgroundColor: "#FBBF24" },
    createdAt: new Date(2026, 2, 24).toISOString(),
  },
];

export const FILTER_OPTIONS = [
  "All",
  "To do",
  "In Progress",
  "Completed",
] as const;

export type FilterOptions = (typeof FILTER_OPTIONS)[number];