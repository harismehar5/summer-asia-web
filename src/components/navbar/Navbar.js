import React from "react";
import './navbar.scss'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('login');
    navigate('/login');
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon"/>
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className="icon"/>
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon"/>
          </div>
          <div className="item">
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="small"
            onClick={handleLogout}
          >
            Log out
          </Button>
          </div>
          {/* <div className="item">
            <img src="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="avatar" />
          </div> */}
        </div>
      </div>
    </div>
  );
}