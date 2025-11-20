function HistoryIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2a8 8 0 108 8h-1.5a6.5 6.5 0 11-6.5-6.5V2z" />
      <path d="M10 6v5l3 3" />
    </svg>
  );
}
function LikeIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
    </svg>
  );
}
function PlaylistIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <rect x="3" y="4" width="14" height="12" rx="2" />
      <path d="M7 8h6v2H7V8zm0 4h4v2H7v-2z" />
    </svg>
  );
}
function AnalyticsIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <rect x="3" y="11" width="2" height="6" rx="1" />
      <rect x="8" y="7" width="2" height="10" rx="1" />
      <rect x="13" y="4" width="2" height="13" rx="1" />
    </svg>
  );
}
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      className={`h-screen w-64 border-r flex flex-col justify-center transition-all duration-300 ${
        isDark
          ? "bg-neutral-950 border-neutral-800"
          : "bg-white border-neutral-200"
      }`}
      style={{
        paddingTop: "5vh",
        paddingBottom: "5vh",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: isDark ? "#f97316 #18181b" : "#f97316 #f3f4f6",
      }}
    >
      <nav className="flex flex-col gap-2 px-4">
        <button onClick={() => navigate("/home")} className={navBtn(isDark)}>
          <HomeIcon className="sidebar-icon" />{" "}
          <span className="sidebar-text">Home</span>
        </button>
        <button
          onClick={() => navigate("/subscriptions")}
          className={navBtn(isDark)}
        >
          <SubsIcon className="sidebar-icon" />{" "}
          <span className="sidebar-text">Subscriptions</span>
        </button>
        <button onClick={() => navigate("/history")} className={navBtn(isDark)}>
          <HistoryIcon className="sidebar-icon" />{" "}
          <span className="sidebar-text">History</span>
        </button>
        <button
          onClick={() => navigate("/liked-videos")}
          className={navBtn(isDark)}
        >
          <LikeIcon className="sidebar-icon" />{" "}
          <span className="sidebar-text">Liked Videos</span>
        </button>
        <button
          onClick={() => navigate("/playlists")}
          className={navBtn(isDark)}
        >
          <PlaylistIcon className="sidebar-icon" />{" "}
          <span className="sidebar-text">Playlists</span>
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className={navBtn(isDark)}
        >
          <AnalyticsIcon className="sidebar-icon" />{" "}
          <span className="sidebar-text">Analytics</span>
        </button>
        {user && (
          <button
            onClick={() => navigate("/profile")}
            className={navBtn(isDark)}
          >
            <ProfileIcon className="sidebar-icon" />{" "}
            <span className="sidebar-text">Your Channel</span>
          </button>
        )}
      </nav>
    </aside>
  );
};

function navBtn(isDark) {
  return `w-full flex items-center gap-4 px-4 py-3 font-medium rounded transition-colors duration-200 ${
    isDark
      ? "text-neutral-400 hover:bg-neutral-900 hover:text-white"
      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
  }`;
}

// Icons
function HomeIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  );
}
function SubsIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M4 4h12v2H4V4zm0 4h12v2H4V8zm0 4h8v2H4v-2z" />
      <circle cx="16" cy="14" r="2" />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

export default Sidebar;

// Add responsive styles for bigger screens
// Place in index.css or global CSS
