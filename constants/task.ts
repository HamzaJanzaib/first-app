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

const getRelativeDate = (offsetDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString();
};

export const TASKS: Task[] = [
  {
    id: "1",
    category: "Grocery shopping app design",
    title: "Market Research",
    time: "10:00 AM",
    status: "Done",
    icon: { name: "grid", backgroundColor: "#FF6B8A" },
    createdAt: getRelativeDate(0), // Today
  },
  {
    id: "2",
    category: "Grocery shopping app design",
    title: "Competitive Analysis",
    time: "12:00 PM",
    status: "In Progress",
    icon: { name: "grid", backgroundColor: "#FF6B8A" },
    createdAt: getRelativeDate(0), // Today
  },
  {
    id: "3",
    category: "Uber Eats redesign challenge",
    title: "Create Low-fidelity Wireframe",
    time: "07:00 PM",
    status: "Todo",
    icon: { name: "terminal", backgroundColor: "#4ADE80" },
    createdAt: getRelativeDate(1), // Tomorrow
  },
  {
    id: "4",
    category: "About design sprint",
    title: "How to pitch a Design Sprint",
    time: "09:00 PM",
    status: "Todo",
    icon: { name: "bookmark", backgroundColor: "#FBBF24" },
    createdAt: getRelativeDate(-1), // Yesterday
  },
  {
    id: "5",
    category: "Personal Study",
    title: "Read React Native Docs",
    time: "08:00 AM",
    status: "Done",
    icon: { name: "school", backgroundColor: "#60A5FA" },
    createdAt: getRelativeDate(-2),
  },
  {
    id: "6",
    category: "Health & Fitness",
    title: "Morning Routine Gym",
    time: "06:30 AM",
    status: "Todo",
    icon: { name: "barbell", backgroundColor: "#A78BFA" },
    createdAt: getRelativeDate(2),
  },
  {
    id: "7",
    category: "Work Projects",
    title: "Review PRs for Mobile App",
    time: "11:30 AM",
    status: "In Progress",
    icon: { name: "briefcase", backgroundColor: "#F472B6" },
    createdAt: getRelativeDate(0),
  },
  {
    id: "8",
    category: "Home Responsibilities",
    title: "Buy Groceries for dinner",
    time: "05:00 PM",
    status: "Todo",
    icon: { name: "cart", backgroundColor: "#34D399" },
    createdAt: getRelativeDate(3),
  },
];

export const FILTER_OPTIONS = [
  "All",
  "To do",
  "In Progress",
  "Completed",
] as const;

export type FilterOptions = (typeof FILTER_OPTIONS)[number];