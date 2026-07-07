import React, { useContext, useState } from "react"; 
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Icon from "../Elements/Icon";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import { logoutService } from "../../services/authService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";


function MainLayout(props) {
  const { children } = props;
  
  const themes = [
  { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
  { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
  { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
  { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
  { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
];

const { theme, setTheme, darkMode, toggleDarkMode } = useContext(ThemeContext);

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    { id: 3, name: "Transaction", icon: <Icon.Transaction />, link: "/transaction", },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  const { user, logout } = useContext(AuthContext);

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutService();
    } catch (err) {
      console.error(err);
    } finally {
      logout();
      // Backdrop akan hilang otomatis karena logout() unmount komponen ini
    }
  };

  return (
    <>
      {/* Backdrop logout */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (muiTheme) => muiTheme.zIndex.drawer + 9999 }}
        open={loggingOut}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h6" color="inherit" sx={{ mt: 2 }}>
            Logging Out
          </Typography>
        </Box>
      </Backdrop>

	    <div className={`flex min-h-screen ${theme.name} ${darkMode ? "dark-mode" : ""}`}>
			<aside 
            className="bg-defaultBlack w-28 sm:w-64 text-special-bg2 flex flex-col justify-between px-7 py-12">
        <div>
			<div className="mb-10">
                <Logo variant="secondary" />
            </div>
			<nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                    className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-special-bg3"
                    }`
                  }
                >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
		</div>
    					<div>
            <span className="text-xs">Themes</span>
            <div className="flex flex-col sm:flex-row gap-2 items-center mt-1">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer mb-2`}
                  onClick={() => setTheme(t)}
                ></div>
              ))}
            </div>
            {/* Dark mode toggle — IconButton */}
            <div className="flex items-center gap-2 mt-1">
              <IconButton
                onClick={toggleDarkMode}
                size="small"
                sx={{ color: "rgba(255,255,255,0.7)", p: 0.5 }}
                aria-label="toggle dark mode"
              >
                {darkMode ? (
                  <LightModeIcon fontSize="small" />
                ) : (
                  <DarkModeIcon fontSize="small" />
                )}
              </IconButton>
              <span className="text-xs hidden sm:inline">Dark Mode</span>
            </div>
          </div>
		<div>
      <div onClick={handleLogout} className="cursor-pointer">
			<div className="flex bg-special-bg3 text-white px-4 py-3 rounded-md">
                <div className="mx-auto sm:mx-0 text-primary">
                  <Icon.Logout/>
                  </div>
                <div className="ms-3 hidden sm:block">Logout</div>
              </div>
            </div>
            <div className="border my-10 border-b-special-bg"></div>
			<div className="flex justify-between items-center">
              <div>Avatar</div>
              <div className="hidden sm:block">
                <div>{user.name}</div>
                <div>View Profile</div>
              </div>
              <div className="hidden sm:block"><Icon.Detail size={15} /></div>
            </div>
		</div>
            </aside>
		<div className="bg-special-mainBg flex-1 flex flex-col">
            <header className="border border-b border-gray-05 px-6 py-7 flex justify-between items-center">
        <div className="flex items-center">
            <div className="font-bold text-2xl me-6">{user.name}</div> 
		    <div className="text-gray-03 flex">
                <Icon.ChevronRight size={20} />
                <span>May 19, 2023</span>
            </div> 
        </div>
		    <div className="flex items-center">
            <div className="me-10"><NotificationsIcon className="text-primary scale-110" /></div> 
		    <Input backgroundColor="bg-white" broder="border-white" />
      </div>
            </header>
			<main className="flex-1 px-6 py-4">{children}</main>
		</div>
    </div>
    </>
  );
}

export default MainLayout;