import { NavLink, Link } from "react-router-dom";
import { Wind, CloudSunRain, Map, List, SlidersHorizontal } from "lucide-react";

const navItems = [
  { to: "/current", icon: CloudSunRain, label: "Weather" },
  { to: "/cities", icon: List, label: "Cities" },
  { to: "/map", icon: Map, label: "Map" },
  { to: "/settings", icon: SlidersHorizontal, label: "Settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-24 bg-[#202B3E] text-gray-200 flex flex-col items-center py-6 ml-4 my-4 gap-8 rounded-[20px]">
      {/* Top Icon */}
      <Link to="/current" className="cursor-pointer">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#33435E]/60 text-[#7D94C3] shadow-xl">
          <Wind size={38} />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-8">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-white" : "text-slate-400 hover:text-white "
              }`
            }
          >
            <item.icon
              size={30}
              strokeWidth={item.label === "Settings" ? 3 : 2}
            />
            <span className="text-sm font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
