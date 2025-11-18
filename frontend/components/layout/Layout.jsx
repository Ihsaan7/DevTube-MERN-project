import { useState } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isDark] = useState(true);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-neutral-950' : 'bg-neutral-50'
    }`}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
