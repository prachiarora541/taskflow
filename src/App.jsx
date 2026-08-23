import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
     BrowserRouter,
     Link,
     Navigate,
     NavLink,
     Outlet,
     Route,
     Routes,
     useNavigate,
     useParams,
     useSearchParams,
} from "react-router-dom";
import {
     ArrowLeft,
     BarChart3,
     CalendarDays,
     Check,
     CheckCircle2,
     ChevronDown,
     CircleHelp,
     ClipboardList,
     Clock3,
     GripVertical,
     Home as HomeIcon,
     LayoutDashboard,
     LogOut,
     Menu,
     Moon,
     Plus,
     Search,
     Settings as SettingsIcon,
     Sparkles,
     Sun,
     Trash2,
     TrendingUp,
     UserCircle,
     X,
     Zap,
     Eye,
     EyeOff,
} from "lucide-react";
import "./App.css";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
     clearSession,
     hasActiveSession,
     startSession,
     touchSession,
} from "./utils/session";

const columns = [
     { id: "todo", label: "Pending", icon: ClipboardList, tone: "red" },
     { id: "progress", label: "In progress", icon: Clock3, tone: "yellow" },
     { id: "done", label: "Completed", icon: CheckCircle2, tone: "green" },
];
const legacyTaskIds = new Set([
     "task-1",
     "task-2",
     "task-3",
     "task-4",
     "task-5",
     "task-6",
]);
const categories = [
     "Study",
     "Personal",
     "Work",
     "Fitness",
     "Shopping",
     "Other",
];
const priorities = ["High", "Medium", "Low"];
const blankTask = {
     title: "",
     description: "",
     category: "Study",
     priority: "Medium",
     dueDate: "",
     tags: "",
};
const getTomorrowDate = () => {
     const tomorrow = new Date();
     tomorrow.setDate(tomorrow.getDate() + 1);
     return tomorrow.toISOString().split("T")[0];
};

function App() {
     return (
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<ProtectedRoute />}>
                         <Route element={<AppLayout />}>
                              <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/analytics" element={<Analytics />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="/settings" element={<SettingsPage />} />
                              <Route path="/tasks/:id" element={<TaskDetails />} />
                         </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
               </Routes>
          </BrowserRouter>
     );
}
function ProtectedRoute() {
     return hasActiveSession() ? (
          <Outlet />
     ) : (
          <Navigate to="/login" replace />
     );
}

function AppLayout() {
     const [theme, setTheme] = useLocalStorage("theme", "light");
     const navigate = useNavigate();
     useEffect(() => {
          document.documentElement.dataset.theme = theme;
     }, [theme]);
     useEffect(() => {
          const activityEvents = ["click", "keydown", "mousemove", "touchstart"];
          const refreshSession = () => touchSession();
          const checkSession = () => {
               if (!hasActiveSession()) navigate("/login?expired=true", { replace: true });
          };
          activityEvents.forEach((eventName) => window.addEventListener(eventName, refreshSession));
          const interval = window.setInterval(checkSession, 30_000);
          return () => {
               activityEvents.forEach((eventName) => window.removeEventListener(eventName, refreshSession));
               window.clearInterval(interval);
          };
     }, [navigate]);
     return (
          <div className="app-shell">
               <Navbar theme={theme} setTheme={setTheme} />
               <main className="main">
                    <Routes>
                         <Route path="/dashboard" element={<Dashboard />} />
                         <Route path="/analytics" element={<Analytics />} />
                         <Route path="/profile" element={<Profile />} />
                         <Route
                              path="/settings"
                              element={<SettingsPage theme={theme} setTheme={setTheme} />}
                         />
                         <Route path="/tasks/:id" element={<TaskDetails />} />
                    </Routes>
               </main>
          </div>
     );
}

function Navbar({ theme, setTheme }) {
     const [menuOpen, setMenuOpen] = useState(false);
     const [profileOpen, setProfileOpen] = useState(false);
     const [query, setQuery] = useState("");
     const profileRef = useRef(null);
     const navigate = useNavigate();
     const user = getUser();
     useEffect(() => {
          const close = (event) => {
               if (profileRef.current && !profileRef.current.contains(event.target))
                    setProfileOpen(false);
          };
          const escape = (event) => event.key === "Escape" && setProfileOpen(false);
          document.addEventListener("mousedown", close);
          document.addEventListener("keydown", escape);
          return () => {
               document.removeEventListener("mousedown", close);
               document.removeEventListener("keydown", escape);
          };
     }, []);
     const submitSearch = (event) => {
          event.preventDefault();
          navigate(`/dashboard?search=${encodeURIComponent(query)}`);
          setMenuOpen(false);
     };
     const logout = () => {
          clearSession();
          navigate("/login");
     };
     const closeMenu = () => setMenuOpen(false);
     return (
          <>
               <header className="navbar">
                    <button
                         className="mobile-menu-button icon-button"
                         onClick={() => setMenuOpen(!menuOpen)}
                         aria-label="Open navigation"
                    >
                         <Menu size={20} />
                    </button>
                    <Link className="brand" to="/">
                         <span className="brand-mark">
                              <Zap size={17} fill="currentColor" />
                         </span>
                         <span>
                              task<span>flow</span>
                         </span>
                    </Link>
                    <nav className="main-nav">
                         <NavLink to="/">
                              <HomeIcon size={15} /> Home
                         </NavLink>
                         <NavLink to="/dashboard">
                              <LayoutDashboard size={15} /> Dashboard
                         </NavLink>
                         <NavLink to="/analytics">
                              <BarChart3 size={15} /> Analytics
                         </NavLink>
                         <NavLink to="/settings">
                              <SettingsIcon size={15} /> Settings
                         </NavLink>
                    </nav>
                    <form className="global-search" onSubmit={submitSearch}>
                         <Search size={16} />
                         <input
                              value={query}
                              onChange={(event) => setQuery(event.target.value)}
                              placeholder="Search tasks..."
                              aria-label="Search tasks globally"
                         />
                    </form>
                    <div className="profile-area" ref={profileRef}>
                         <button
                              className="profile-trigger"
                              onClick={() => setProfileOpen(!profileOpen)}
                         >
                              <span className="avatar">{user.name[0]}</span>
                              <span className="profile-name">{user.name}</span>
                              <ChevronDown size={14} />
                         </button>
                         {profileOpen && (
                              <div className="profile-dropdown">
                                   <div className="dropdown-user">
                                        <span className="avatar">{user.name[0]}</span>
                                        <div>
                                             <strong>{user.name}</strong>
                                             <small>{user.email}</small>
                                        </div>
                                   </div>
                                   <Link to="/profile" onClick={() => setProfileOpen(false)}>
                                        <UserCircle size={16} /> My profile
                                   </Link>
                                   <Link to="/settings" onClick={() => setProfileOpen(false)}>
                                        <SettingsIcon size={16} /> Settings
                                   </Link>
                                   <button
                                        onClick={() => {
                                             setTheme(theme === "light" ? "dark" : "light");
                                             setProfileOpen(false);
                                        }}
                                   >
                                        {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}{" "}
                                        {theme === "light" ? "Dark mode" : "Light mode"}
                                   </button>
                                   <button onClick={logout}>
                                        <LogOut size={16} /> Logout
                                   </button>
                              </div>
                         )}
                    </div>
               </header>
               {menuOpen && (
                    <div className="mobile-menu">
                         <form className="global-search" onSubmit={submitSearch}>
                              <Search size={16} />
                              <input
                                   value={query}
                                   onChange={(event) => setQuery(event.target.value)}
                                   placeholder="Search tasks..."
                                   aria-label="Search tasks"
                              />
                         </form>
                         <NavLink to="/" onClick={closeMenu}>
                              <HomeIcon size={17} /> Home
                         </NavLink>
                         <NavLink to="/dashboard" onClick={closeMenu}>
                              <LayoutDashboard size={17} /> Dashboard
                         </NavLink>
                         <NavLink to="/analytics" onClick={closeMenu}>
                              <BarChart3 size={17} /> Analytics
                         </NavLink>
                         <NavLink to="/settings" onClick={closeMenu}>
                              <SettingsIcon size={17} /> Settings
                         </NavLink>
                         <NavLink to="/profile" onClick={closeMenu}>
                              <UserCircle size={17} /> Profile
                         </NavLink>
                         <button onClick={logout}>
                              <LogOut size={17} /> Logout
                         </button>
                    </div>
               )}
          </>
     );
}

function Dashboard() {
     const [tasks, setTasks] = useLocalStorage("tasks", []);
     const [searchParams] = useSearchParams();
     const [search, setSearch] = useState(searchParams.get("search") || "");
     const [filters, setFilters] = useState({
          status: "All",
          priority: "All",
          category: "All",
          sort: "Newest first",
     });
     const [modal, setModal] = useState(null);
     const [dragOver, setDragOver] = useState(null);
     const [toast, setToast] = useState("");
     const allTasks = useMemo(() => tasks || [], [tasks]);
     useEffect(() => {
          const editId = searchParams.get("edit");
          if (!editId || !tasks) return undefined;
          const timer = window.setTimeout(() => setModal({ task: tasks.find((task) => task.id === editId) || null }), 0);
          return () => window.clearTimeout(timer);
     }, [searchParams, tasks]);
     useEffect(() => {
          if (tasks.length === legacyTaskIds.size && tasks.every((task) => legacyTaskIds.has(task.id)))
               setTasks([]);
     }, [tasks, setTasks]);
     const stats = useMemo(
          () => ({
               total: allTasks.length,
               todo: allTasks.filter((t) => t.status === "todo").length,
               progress: allTasks.filter((t) => t.status === "progress").length,
               done: allTasks.filter((t) => t.status === "done").length,
          }),
          [allTasks],
     );
     const percent = stats.total
          ? Math.round((stats.done / stats.total) * 100)
          : 0;
     const hasActiveFilters = Boolean(
          search.trim() ||
          filters.status !== "All" ||
          filters.priority !== "All" ||
          filters.category !== "All",
     );
     const visibleTasks = useMemo(
          () =>
               allTasks
                    .filter((task) =>
                         `${task.title} ${task.description} ${task.category} ${task.tags.join(" ")}`
                              .toLowerCase()
                              .includes(search.toLowerCase()),
                    )
                    .filter(
                         (task) => filters.status === "All" || task.status === filters.status,
                    )
                    .filter(
                         (task) =>
                              filters.priority === "All" || task.priority === filters.priority,
                    )
                    .filter(
                         (task) =>
                              filters.category === "All" || task.category === filters.category,
                    )
                    .toSorted((a, b) => {
                         if (filters.sort === "Oldest first")
                              return new Date(a.createdAt) - new Date(b.createdAt);
                         if (filters.sort === "Due date")
                              return (a.dueDate || "9999").localeCompare(b.dueDate || "9999");
                         if (filters.sort === "High priority")
                              return (
                                   priorities.indexOf(a.priority) - priorities.indexOf(b.priority)
                              );
                         if (filters.sort === "Low priority")
                              return (
                                   priorities.indexOf(b.priority) - priorities.indexOf(a.priority)
                              );
                         if (filters.sort === "Alphabetical")
                              return a.title.localeCompare(b.title);
                         return new Date(b.createdAt) - new Date(a.createdAt);
                    }),
          [allTasks, search, filters],
     );
     const updateTask = useCallback(
          (id, changes) =>
               setTasks((current) =>
                    current.map((task) =>
                         task.id === id
                              ? { ...task, ...changes, updatedAt: new Date().toISOString() }
                              : task,
                    ),
               ),
          [setTasks],
     );
     const notify = (message) => {
          setToast(message);
          setTimeout(() => setToast(""), 2200);
     };
     const moveTask = useCallback(
          (id, status) => {
               updateTask(id, { status });
               notify(
                    status === "done"
                         ? "Task completed. Nice work."
                         : "Task moved successfully.",
               );
          },
          [updateTask],
     );
     const deleteTask = useCallback(
          (id) => {
               setTasks((current) => current.filter((task) => task.id !== id));
               notify("Task deleted.");
          },
          [setTasks],
     );
     const saveTask = (data) => {
          const now = new Date().toISOString();
          const normalized = {
               ...data,
               tags:
                    typeof data.tags === "string"
                         ? data.tags
                              .split(",")
                              .map((tag) => tag.trim())
                              .filter(Boolean)
                         : data.tags,
          };
          if (modal?.task) updateTask(modal.task.id, normalized);
          else
               setTasks((current) => [
                    {
                         ...normalized,
                         id: `task-${Date.now()}`,
                         status: "todo",
                         createdAt: now,
                         updatedAt: now,
                    },
                    ...current,
               ]);
          setModal(null);
          notify(modal?.task ? "Changes saved." : "Task created.");
     };
     return (
          <>
               <div className="topbar">
                    <div>
                         <p className="overline">Sunday, August 23, 2026</p>
                         <h1>
                              Good evening, <em>{getUser().name}</em>{" "}
                              <span aria-hidden="true">✦</span>
                         </h1>
                         <p className="subtitle">
                              Small progress every day leads to big results.
                         </p>
                    </div>
                    <span className="avatar large">{getUser().name[0]}</span>
               </div>
               <section className="progress-panel">
                    <div className="section-heading">
                         <div>
                              <p className="overline">Your progress</p>
                              <h2>Keep the momentum going</h2>
                         </div>
                         <strong className="percent">
                              {percent}
                              <small>%</small>
                         </strong>
                    </div>
                    <div className="progress-track">
                         <span style={{ width: `${percent}%` }} />
                    </div>
                    <div className="stat-row">
                         <Stat label="Total tasks" value={stats.total} />
                         <Stat label="Pending" value={stats.todo} color="red" />
                         <Stat label="In progress" value={stats.progress} color="yellow" />
                         <Stat label="Completed" value={stats.done} color="green" />
                    </div>
               </section>
               <section className="toolbar">
                    <div className="search-wrap">
                         <Search size={17} />
                         <input
                              value={search}
                              onChange={(event) => setSearch(event.target.value)}
                              placeholder="Search your tasks..."
                              aria-label="Search tasks"
                         />
                         {search && (
                              <button onClick={() => setSearch("")} aria-label="Clear search">
                                   <X size={15} />
                              </button>
                         )}
                    </div>
                    <button
                         className="primary-button"
                         onClick={() => setModal({ task: null })}
                    >
                         <Plus size={17} /> New task
                    </button>
               </section>
               <section className="filters">
                    <FilterSelect
                         value={filters.status}
                         onChange={(value) => setFilters({ ...filters, status: value })}
                         options={["All", "todo", "progress", "done"]}
                         labels={{ todo: "To do", progress: "In progress", done: "Completed" }}
                    />
                    <FilterSelect
                         value={filters.priority}
                         onChange={(value) => setFilters({ ...filters, priority: value })}
                         options={["All", ...priorities]}
                    />
                    <FilterSelect
                         value={filters.category}
                         onChange={(value) => setFilters({ ...filters, category: value })}
                         options={["All", ...categories]}
                    />
                    <FilterSelect
                         value={filters.sort}
                         onChange={(value) => setFilters({ ...filters, sort: value })}
                         options={[
                              "Newest first",
                              "Oldest first",
                              "Due date",
                              "High priority",
                              "Low priority",
                              "Alphabetical",
                         ]}
                    />
               </section>
               {hasActiveFilters && !visibleTasks.length ? (
                    <div className="no-results">
                         <CircleHelp size={24} />
                         <strong>No such task found</strong>
                         <span>Try another search or create a new task.</span>
                         <button className="primary-button" onClick={() => setModal({ task: null })}>
                              <Plus size={16} /> Add task
                         </button>
                    </div>
               ) : (
                    <div className="board">
                         {columns.map((column) => (
                              <TaskColumn
                                   key={column.id}
                                   column={column}
                                   tasks={visibleTasks.filter((task) => task.status === column.id)}
                                   onMove={moveTask}
                                   onEdit={(task) => setModal({ task })}
                                   onDelete={deleteTask}
                                   onAdd={() => setModal({ task: null })}
                                   dragOver={dragOver}
                                   setDragOver={setDragOver}
                              />
                         ))}
                    </div>
               )}
               {modal && (
                    <TaskModal
                         task={modal.task}
                         onClose={() => setModal(null)}
                         onSave={saveTask}
                    />
               )}
               {toast && (
                    <div className="toast">
                         <Check size={16} /> {toast}
                    </div>
               )}
          </>
     );
}
function Stat({ label, value, color }) {
     return (
          <div className="stat">
               <span className={`stat-dot ${color || ""}`} />
               <div>
                    <strong>{value}</strong>
                    <small>{label}</small>
               </div>
          </div>
     );
}
function FilterSelect({ value, onChange, options, labels = {} }) {
     return (
          <label className="select-wrap">
               <span>{labels[value] || value}</span>
               <ChevronDown size={14} />
               <select
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    aria-label={`Filter ${labels[value] || value}`}
               >
                    {options.map((option) => (
                         <option key={option} value={option}>
                              {labels[option] || option}
                         </option>
                    ))}
               </select>
          </label>
     );
}
function TaskColumn({
     column,
     tasks,
     onMove,
     onEdit,
     onDelete,
     onAdd,
     dragOver,
     setDragOver,
}) {
     const Icon = column.icon;
     return (
          <section
               className={`column ${dragOver === column.id ? "drag-target" : ""}`}
               onDragOver={(event) => {
                    event.preventDefault();
                    setDragOver(column.id);
               }}
               onDragLeave={() => setDragOver(null)}
               onDrop={(event) => {
                    onMove(event.dataTransfer.getData("taskId"), column.id);
                    setDragOver(null);
               }}
          >
               <div className="column-head">
                    <div className={`column-icon ${column.tone}`}>
                         <Icon size={16} />
                    </div>
                    <h2>{column.label}</h2>
                    <span>{tasks.length}</span>
               </div>
               <div className="task-list">
                    {tasks.map((task) => (
                         <TaskCard
                              key={task.id}
                              task={task}
                              onMove={onMove}
                              onEdit={onEdit}
                              onDelete={onDelete}
                         />
                    ))}
                    {!tasks.length && (
                         <div className="empty-column">
                              {dragOver === column.id ? <><CircleHelp size={20} /><span>Drop tasks here</span></> : <><span>No tasks here yet</span><button className="text-link" onClick={onAdd}><Plus size={15} /> Add task</button></>}
                         </div>
                    )}
               </div>
          </section>
     );
}
function TaskCard({ task, onMove, onEdit, onDelete }) {
     const [menu, setMenu] = useState(false);
     return (
          <article
               className={`task-card ${task.status === "done" ? "completed" : ""}`}
               draggable
               onDragStart={(event) => event.dataTransfer.setData("taskId", task.id)}
          >
               <div className="card-top">
                    <span className={`status-chip ${task.status}`}>
                         {task.status === "todo" ? "Pending" : task.status === "progress" ? "In progress" : "Completed"}
                    </span>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                         <span />
                         {task.priority}
                    </span>
                    <button
                         className="more-button"
                         onClick={() => setMenu(!menu)}
                         aria-label="Task actions"
                    >
                         •••
                    </button>
                    {menu && (
                         <div className="task-menu">
                              {task.status !== "done" && (
                                   <button onClick={() => { setMenu(false); onEdit(task); }}>Edit</button>
                              )}
                              {task.status === "todo" && (
                                   <button onClick={() => { setMenu(false); onMove(task.id, "progress"); }}>Move to in progress</button>
                              )}
                              {task.status === "progress" && (
                                   <>
                                        <button onClick={() => { setMenu(false); onMove(task.id, "done"); }}>Mark completed</button>
                                        <button onClick={() => { setMenu(false); onMove(task.id, "todo"); }}>Move to pending</button>
                                   </>
                              )}
                              {task.status === "done" && (
                                   <>
                                        <button onClick={() => { setMenu(false); onMove(task.id, "progress"); }}>Move to in progress</button>
                                        <button onClick={() => { setMenu(false); onMove(task.id, "todo"); }}>Move to pending</button>
                                   </>
                              )}
                              <button onClick={() => onDelete(task.id)}>Delete</button>
                         </div>
                    )}
               </div>
               <Link to={`/tasks/${task.id}`} className="task-title">
                    {task.title}
               </Link>
               <p>{task.description}</p>
               <div className="card-meta">
                    <span>
                         <CalendarDays size={14} />
                         {task.dueDate
                              ? new Date(`${task.dueDate}T12:00:00`).toLocaleDateString("en-US", {
                                   month: "short",
                                   day: "numeric",
                              })
                              : "No date"}
                    </span>
                    <span className="category">{task.category}</span>
               </div>
               <div className="card-bottom">
                    <div className="tags">
                         {task.tags.slice(0, 2).map((tag) => (
                              <span key={tag}>#{tag}</span>
                         ))}
                    </div>
                    <div className="card-actions">
                         {task.status !== "done" && (
                              <button onClick={() => onEdit(task)}>Edit</button>
                         )}
                         <Link to={`/tasks/${task.id}`}>View</Link>
                    </div>
               </div>
               <div className="drag-handle">
                    <GripVertical size={15} />
               </div>
          </article>
     );
}
function TaskModal({ task, onClose, onSave }) {
     const [form, setForm] = useState(
          task ? { ...task, tags: task.tags.join(", ") } : blankTask,
     );
     const [error, setError] = useState("");
     const change = (event) =>
          setForm({ ...form, [event.target.name]: event.target.value });
     return (
          <div
               className="modal-backdrop"
               onMouseDown={(event) => event.target === event.currentTarget && onClose()}
          >
               <div className="modal" role="dialog" aria-modal="true">
                    <div className="modal-head">
                         <div>
                              <p className="overline">{task ? "Update task" : "New focus"}</p>
                              <h2>{task ? "Edit task" : "Create a task"}</h2>
                         </div>
                         <button className="icon-button" onClick={onClose} aria-label="Close">
                              <X size={19} />
                         </button>
                    </div>
                    <form
                         onSubmit={(event) => {
                              event.preventDefault();
                              if (!form.title.trim()) return setError("Task title is required.");
                              if (form.dueDate && form.dueDate < getTomorrowDate()) return setError("Due date must be a future date.");
                              setError("");
                              onSave(form);
                         }}
                    >
                         <label>
                              <span className="field-label">Task title <b className="required-mark">*</b></span>
                              <input
                                   name="title"
                                   value={form.title}
                                   onChange={change}
                                   placeholder="e.g. Complete React assignment"
                                   required
                              />
                         </label>
                         <label>
                              Description
                              <textarea
                                   name="description"
                                   value={form.description}
                                   onChange={change}
                                   placeholder="What does done look like?"
                                   rows="3"
                              />
                         </label>
                         <div className="form-grid">
                              <label>
                                   <span className="field-label">Category <b className="required-mark">*</b></span>
                                   <select name="category" value={form.category} onChange={change}>
                                        {categories.map((item) => (
                                             <option key={item}>{item}</option>
                                        ))}
                                   </select>
                              </label>
                              <label>
                                   <span className="field-label">Priority <b className="required-mark">*</b></span>
                                   <select name="priority" value={form.priority} onChange={change}>
                                        {priorities.map((item) => (
                                             <option key={item}>{item}</option>
                                        ))}
                                   </select>
                              </label>
                         </div>
                         <div className="form-grid">
                              <label>
                                   Due date
                                   <input
                                        type="date"
                                        min={getTomorrowDate()}
                                        name="dueDate"
                                        value={form.dueDate}
                                        onChange={change}
                                   />
                              </label>
                              <label>
                                   Tags
                                   <input
                                        name="tags"
                                        value={form.tags}
                                        onChange={change}
                                        placeholder="React, college"
                                   />
                              </label>
                         </div>
                              {error && <div className="form-error">{error}</div>}
                         <div className="modal-actions">
                              <button
                                   type="button"
                                   className="secondary-button"
                                   onClick={onClose}
                              >
                                   Cancel
                              </button>
                              <button className="primary-button" type="submit">
                                   {task ? "Save changes" : "Create task"}{" "}
                                   <ArrowLeft size={16} className="flip" />
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     );
}

function Page({ kicker, title, children }) {
     const navigate = useNavigate();
     return (
          <div className="page">
               <div className="page-heading">
                    <div>
                         <p className="overline">{kicker}</p>
                         <h1>{title}</h1>
                    </div>
                    <div className="page-nav">
                         <button className="secondary-button" onClick={() => navigate(-1)}>
                              <ArrowLeft size={16} /> Back
                         </button>
                         <Link className="secondary-button" to="/">
                              <HomeIcon size={16} /> Home
                         </Link>
                    </div>
               </div>
               {children}
          </div>
     );
}
function Analytics() {
     const [tasks] = useLocalStorage("tasks", []);
     const stats = {
          total: tasks.length,
          completed: tasks.filter((t) => t.status === "done").length,
          progress: tasks.filter((t) => t.status === "progress").length,
          pending: tasks.filter((t) => t.status === "todo").length,
     };
     return (
          <Page title="Analytics" kicker="Your rhythm">
               <p className="subtitle">A clear look at where your energy is going.</p>
               <div className="analytics-grid">
                    <div className="metric-card accent">
                         <TrendingUp size={20} />
                         <strong>
                              {stats.total
                                   ? Math.round((stats.completed / stats.total) * 100)
                                   : 0}
                              %
                         </strong>
                         <span>completion rate</span>
                    </div>
                    <div className="metric-card total-metric">
                         <ClipboardList size={20} />
                         <strong>{stats.total}</strong>
                         <span>total tasks</span>
                    </div>
                    <div className="metric-card pending-metric">
                         <ClipboardList size={20} />
                         <strong>{stats.pending}</strong>
                         <span>pending tasks</span>
                    </div>
                    <div className="metric-card completed-metric">
                         <CheckCircle2 size={20} />
                         <strong>{stats.completed}</strong>
                         <span>completed tasks</span>
                    </div>
                    <div className="metric-card progress-metric">
                         <Clock3 size={20} />
                         <strong>{stats.progress}</strong>
                         <span>in progress</span>
                    </div>
               </div>
               <div className="chart-grid">
                    <Chart
                         title="Tasks by category"
                         values={categories
                              .map((category) => [
                                   category,
                                   tasks.filter((t) => t.category === category).length,
                              ])
                              .filter((item) => item[1])}
                    />
                    <Chart
                         title="Tasks by priority"
                         values={priorities.map((priority) => [
                              priority,
                              tasks.filter((t) => t.priority === priority).length,
                         ])}
                    />
               </div>
          </Page>
     );
}
function Chart({ title, values }) {
     const max = Math.max(...values.map((item) => item[1]), 1);
     return (
          <section className="chart-panel">
               <div className="panel-title">
                    <h2>{title}</h2>
                    <BarChart3 size={18} />
               </div>
               {values.map(([label, value]) => (
                    <div className="bar-row" key={label}>
                         <span>{label}</span>
                         <div>
                              <i style={{ width: `${(value / max) * 100}%` }} />
                         </div>
                         <b>{value}</b>
                    </div>
               ))}
          </section>
     );
}
function Profile() {
     const [profile, setProfile] = useLocalStorage("profile", getUser());
     const [tasks] = useLocalStorage("tasks", []);
     const [editing, setEditing] = useState(false);
     const [form, setForm] = useState(profile);
     const completed = tasks.filter((task) => task.status === "done").length;
     const save = (event) => {
          event.preventDefault();
          setProfile(form);
          localStorage.setItem("currentUser", JSON.stringify(form));
          setEditing(false);
     };
     return (
          <Page title="My profile" kicker="Your workspace identity">
               <div className="profile-panel">
                    <div className="profile-hero">
                         <div className="profile-avatar">{profile.name[0]}</div>
                         <div>
                              <h2>{profile.name}</h2>
                              <p>
                                   @{profile.username} · {profile.email}
                              </p>
                         </div>
                         <button
                              className="primary-button"
                              onClick={() => {
                                   setForm(profile);
                                   setEditing(true);
                              }}
                         >
                              Edit profile
                         </button>
                    </div>
                    <div className="profile-stats">
                         <Fact label="Total tasks" value={tasks.length} />
                         <Fact label="Completed" value={completed} tone="completed-fact" />
                         <Fact label="Pending" value={tasks.length - completed} tone="pending-fact" />
                         <Fact
                              label="Progress"
                              value={`${tasks.length ? Math.round((completed / tasks.length) * 100) : 0}%`}
                              tone="completed-fact"
                         />
                    </div>
                    {editing && (
                         <form className="profile-edit" onSubmit={save}>
                              <label>
                                   Name
                                   <input
                                        value={form.name}
                                        onChange={(event) =>
                                             setForm({ ...form, name: event.target.value })
                                        }
                                        required
                                   />
                              </label>
                              <label>
                                   Username
                                   <input
                                        value={form.username}
                                        onChange={(event) =>
                                             setForm({ ...form, username: event.target.value })
                                        }
                                        required
                                   />
                              </label>
                              <label>
                                   Email
                                   <input
                                        type="email"
                                        value={form.email}
                                        onChange={(event) =>
                                             setForm({ ...form, email: event.target.value })
                                        }
                                        required
                                   />
                              </label>
                              <div className="modal-actions">
                                   <button
                                        type="button"
                                        className="secondary-button"
                                        onClick={() => setEditing(false)}
                                   >
                                        Cancel
                                   </button>
                                   <button className="primary-button">Save profile</button>
                              </div>
                         </form>
                    )}
               </div>
          </Page>
     );
}
function Fact({ label, value, tone = "" }) {
     return (
          <div className={tone}>
               <small>{label}</small>
               <strong>{value}</strong>
          </div>
     );
}
function SettingsPage({ theme, setTheme }) {
     const [tasks, setTasks] = useLocalStorage("tasks", []);
     const clearCompleted = () =>
          setTasks(tasks.filter((task) => task.status !== "done"));
     const reset = () => {
          if (window.confirm("Clear all tasks from this workspace?"))
               setTasks([]);
     };
     return (
          <Page title="Settings" kicker="Workspace preferences">
               <div className="settings-panel">
                    <div className="setting-row">
                         <div>
                              <h2>Appearance</h2>
                              <p>Choose how TaskFlow looks for you.</p>
                         </div>
                         <div className="segmented">
                              <button
                                   className={theme === "light" ? "selected" : ""}
                                   onClick={() => setTheme("light")}
                              >
                                   <Sun size={16} /> Light
                              </button>
                              <button
                                   className={theme === "dark" ? "selected" : ""}
                                   onClick={() => setTheme("dark")}
                              >
                                   <Moon size={16} /> Dark
                              </button>
                         </div>
                    </div>
                    <div className="setting-row">
                         <div>
                              <h2>Clear completed tasks</h2>
                              <p>Remove the finished work from your board.</p>
                         </div>
                         <button className="secondary-button" onClick={clearCompleted}>
                              <Trash2 size={16} /> Clear
                         </button>
                    </div>
                    <div className="setting-row danger">
                         <div>
                              <h2>Reset workspace</h2>
                              <p>Remove every task and start fresh.</p>
                         </div>
                         <button className="danger-button" onClick={reset}>
                              Reset all
                         </button>
                    </div>
               </div>
          </Page>
     );
}
function TaskDetails() {
     const { id } = useParams();
     const [tasks, setTasks] = useLocalStorage("tasks", []);
     const navigate = useNavigate();
     const task = tasks.find((item) => item.id === id);
     if (!task) return <NotFound />;
     const changeStatus = (status) => setTasks(tasks.map((item) => item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item));
     const remove = () => {
          if (window.confirm("Delete this task?")) {
               setTasks(tasks.filter((item) => item.id !== id));
               navigate("/dashboard");
          }
     };
     return (
          <Page kicker="Task details" title={task.title}>
               <div className="detail-panel">
                    <div className="detail-copy">
                         <span className={`priority ${task.priority.toLowerCase()}`}>
                              <span />
                              {task.priority} priority
                         </span>
                         <p>{task.description || "No description added."}</p>
                         <div className="detail-tags">
                              {task.tags.map((tag) => (
                                   <span key={tag}>#{tag}</span>
                              ))}
                         </div>
                    </div>
                    <div className="detail-facts">
                         <Fact
                              label="Status"
                              value={
                                   task.status === "progress"
                                        ? "In progress"
                                        : task.status === "done"
                                             ? "Completed"
                                             : "To do"
                              }
                              tone={`${task.status}-fact`}
                         />
                         <Fact label="Category" value={task.category} />
                         <Fact label="Due date" value={task.dueDate || "Not set"} />
                         <Fact
                              label="Updated"
                              value={new Date(task.updatedAt).toLocaleDateString()}
                         />
                    </div>
                    <div className="detail-actions">
                         <button className="secondary-button" onClick={remove}>
                              <Trash2 size={16} /> Delete task
                         </button>
                         {task.status !== "done" && <button className="primary-button" onClick={() => navigate("/dashboard")}>
                              Edit task
                         </button>}
                         {task.status === "todo" && <button className="secondary-button" onClick={() => changeStatus("progress")}>Move to in progress</button>}
                         {task.status === "progress" && <button className="secondary-button" onClick={() => changeStatus("done")}>Mark completed</button>}
                         {task.status === "done" && <button className="secondary-button" onClick={() => changeStatus("progress")}>Move to in progress</button>}
                    </div>
               </div>
          </Page>
     );
}

function AuthShell({ children, eyebrow, title, footer }) {
     return (
          <div className="auth-page">
               <div className="auth-aside">
                    <Link className="brand" to="/">
                         <span className="brand-mark">
                              <Zap size={18} fill="currentColor" />
                         </span>
                         task<span>flow</span>
                    </Link>
                    <div className="auth-quote">
                         <Sparkles size={22} />
                         <h1>Make room for the work that matters.</h1>
                         <p>Plan with intention. Move with momentum.</p>
                    </div>
               </div>
               <div className="auth-content">
                    <div className="auth-box">
                         <p className="overline">{eyebrow}</p>
                         <h1>{title}</h1>
                         {children}
                         {footer}
                    </div>
               </div>
          </div>
     );
}
function Login() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState("");
     const [message, setMessage] = useState("");
     const navigate = useNavigate();
     const login = (event) => {
          event.preventDefault();
          const account = JSON.parse(localStorage.getItem("profile") || "null");
          if (account && account.email === email && account.password === password) {
               startSession(account);
               navigate("/dashboard");
          } else
               setError(
                    "Invalid email or password. Create an account first if you are new here.",
               );
     };
     return (
          <AuthShell
               eyebrow="Welcome back"
               title="Log in to keep moving."
               footer={
                    <p className="auth-footer">
                         Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
               }
          >
               <p className="subtitle">Log in to continue managing your tasks.</p>
               {error && <div className="form-error">{error}</div>}
               {message && <div className="form-success">{message}</div>}
               <form className="auth-form" onSubmit={login}>
                    <label>
                         <span className="field-label">Email <b className="required-mark">*</b></span>
                         <input
                              type="email"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                              required
                         />
                    </label>
                    <label>
                         <span className="field-label">Password <b className="required-mark">*</b></span>
                         <PasswordField value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} />
                    </label>
                    <button
                         type="button"
                         className="forgot"
                         onClick={() =>
                              setMessage("Password reset is a frontend demo. No email was sent.")
                         }
                    >
                         Forgot password?
                    </button>
                    <button className="primary-button full">
                         Login <ArrowLeft size={16} className="flip" />
                    </button>
                    <Link className="secondary-button full auth-secondary" to="/signup">
                         Create an account
                    </Link>
               </form>
          </AuthShell>
     );
}
function Signup() {
     const [form, setForm] = useState({
          name: "",
          username: "",
          email: "",
          password: "",
          confirm: "",
     });
     const [error, setError] = useState("");
     const [match, setMatch] = useState(false);
     const navigate = useNavigate();
     const change = (event) => {
          const next = { ...form, [event.target.name]: event.target.value };
          setForm(next);
          setMatch(next.password.length > 0 && next.password === next.confirm);
     };
     const signup = (event) => {
          event.preventDefault();
          if (!form.name.trim() || !form.username.trim())
               return setError("Name and username are required.");
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
               return setError("Please enter a valid email address.");
          if (form.password.length < 8)
               return setError("Password must be at least 8 characters.");
          if (form.password !== form.confirm)
               return setError("Passwords do not match.");
          const account = {
               name: form.name,
               username: form.username,
               email: form.email,
               password: form.password,
          };
          localStorage.setItem("profile", JSON.stringify(account));
          setError("");
          navigate("/login?created=true");
     };
     return (
          <AuthShell
               eyebrow="Start fresh"
               title="Create your TaskFlow account."
               footer={
                    <p className="auth-footer">
                         Already have an account? <Link to="/login">Login</Link>
                    </p>
               }
          >
               <p className="subtitle">A few details, then your workspace is ready.</p>
               {error && <div className="form-error">{error}</div>}
               {match && <div className="form-success">Passwords match.</div>}
               <form className="auth-form" onSubmit={signup}>
                    <label>
                         <span className="field-label">Full name <b className="required-mark">*</b></span>
                         <input name="name" value={form.name} onChange={change} required />
                    </label>
                    <label>
                         <span className="field-label">Username <b className="required-mark">*</b></span>
                         <input
                              name="username"
                              value={form.username}
                              onChange={change}
                              required
                         />
                    </label>
                    <label>
                         <span className="field-label">Email <b className="required-mark">*</b></span>
                         <input
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={change}
                              required
                         />
                    </label>
                    <div className="form-grid">
                         <label>
                              <span className="field-label">Password <b className="required-mark">*</b></span>
                              <PasswordField name="password" value={form.password} onChange={change} minLength={8} />
                         </label>
                         <label>
                              <span className="field-label">Confirm password <b className="required-mark">*</b></span>
                              <PasswordField name="confirm" value={form.confirm} onChange={change} minLength={8} />
                         </label>
                    </div>
                    <button className="primary-button full">
                         Create account <ArrowLeft size={16} className="flip" />
                    </button>
               </form>
          </AuthShell>
     );
}
function PasswordField({ name, value, onChange, minLength = 8 }) {
     const [visible, setVisible] = useState(false);
     return (
          <span className="password-field">
               <input name={name} type={visible ? "text" : "password"} value={value} onChange={onChange} minLength={minLength} required />
               <button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? "Hide password" : "Show password"}>
                    {visible ? <EyeOff size={16} /> : <Eye size={16} />}
               </button>
          </span>
     );
}
function getUser() {
     try {
          return (
               JSON.parse(
                    localStorage.getItem("currentUser") || localStorage.getItem("profile"),
               ) || {
                    name: "Student",
                    username: "student",
                    email: "student@example.com",
               }
          );
     } catch {
          return {
               name: "Student",
               username: "student",
               email: "student@example.com",
          };
     }
}
function Landing() {
     const navigate = useNavigate();
     const loggedIn = hasActiveSession();
     return (
          <div className="landing">
               <header className="landing-nav">
                    <Link className="brand" to="/">
                         <span className="brand-mark">
                              <Zap size={17} fill="currentColor" />
                         </span>
                         task<span>flow</span>
                    </Link>
                    <button className="text-link" onClick={() => navigate(loggedIn ? "/dashboard" : "/login")}>
                         {loggedIn ? "Go to dashboard" : "Sign in"} <ArrowLeft size={16} className="flip" />
                    </button>
               </header>
               <main className="landing-content">
                    <div className="hero-copy">
                         <p className="overline">A calmer way to move forward</p>
                         <h1>
                              Plan it.
                              <br />
                              <em>Move it.</em>
                              <br />
                              Get it done.
                         </h1>
                         <p>
                              TaskFlow turns scattered to-dos into a visible workflow, so every
                              small win has somewhere to go.
                         </p>
                         <div>
                              <button
                                   className="primary-button"
                                   onClick={() => navigate(loggedIn ? "/dashboard" : "/signup")}
                              >
                                   Get started <ArrowLeft size={17} className="flip" />
                              </button>
                              <button
                                   className="secondary-button"
                                   onClick={() => navigate(loggedIn ? "/dashboard" : "/login")}
                              >
                                   View demo
                              </button>
                         </div>
                    </div>
                    <div className="hero-preview">
                         <div className="preview-top">
                              <span>Today's flow</span>
                              <strong>6 tasks</strong>
                         </div>
                         <div className="preview-progress">
                              <span style={{ width: "68%" }} />
                         </div>
                         <div className="preview-columns">
                              <div>
                                   <b>TO DO</b>
                                   <i>Finish neural notes</i>
                                   <i>Read chapter four</i>
                              </div>
                              <div>
                                   <b>IN PROGRESS</b>
                                   <i>Build interactions</i>
                              </div>
                              <div>
                                   <b>COMPLETED</b>
                                   <i className="done-line">Morning run</i>
                                   <i className="done-line">Buy groceries</i>
                              </div>
                         </div>
                    </div>
               </main>
               <section className="landing-features">
                    {[
                         ["Create tasks", "Capture the next clear step."],
                         ["Move work", "Drag ideas into action."],
                         ["See progress", "Make momentum visible."],
                    ].map(([title, copy], index) => (
                         <div key={title}>
                              <span>0{index + 1}</span>
                              <h2>{title}</h2>
                              <p>{copy}</p>
                         </div>
                    ))}
               </section>
          </div>
     );
}
function NotFound() {
     return (
          <div className="not-found">
               <span className="brand-mark">
                    <Zap size={20} fill="currentColor" />
               </span>
               <p className="overline">Lost in the workflow</p>
               <h1>404</h1>
               <p>This task seems to have disappeared.</p>
               <Link
                    className="primary-button"
                    to={localStorage.getItem("isLoggedIn") === "true" ? "/dashboard" : "/"}
               >
                    Back to safety
               </Link>
          </div>
     );
}
export default App;
