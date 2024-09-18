import './lightmode.css';
import React from "react";
import Toggle from "react-toggle";

export const Light = ({isDark, setIsDark}) => {

    const handleChange = () => {
        setIsDark(!isDark);
    };
  
    return (
        <div className="toggle-theme-wrapper">
            <span>☀️</span>
            <label className="toggle-theme" htmlFor="checkbox">
            <input
                type="checkbox"
                id="checkbox"
                checked={isDark}
                onChange={handleChange}
                />
            <div className="slider round"></div>
            </label>
            <span>🌒</span>
        </div>
    );
  };