import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

import { logo, money } from "../assets";
import { news } from "../assets";
import { navlinks } from "../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && "bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {name === "money" && showTooltip && (
        <span className="tooltip absolute top-[30px] left-[50%] transform translate-x-[-50%] bg-white p-2 rounded shadow-md">
          Donate
        </span>
      )}
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleThreeDotsClick = () => {
    // Use the navigate function to navigate to the desired route
    navigate("/news");
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <div
              key={link.name}
              className="tooltip-container"
              onMouseEnter={() => setHoveredIcon(link.name)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Icon
                {...link}
                isActive={isActive}
                handleClick={() => {
                  if (!link.disabled) {
                    setIsActive(link.name);
                    navigate(link.link);
                  }
                }}
              />

              {hoveredIcon === link.name && (
                <span className="tooltip">{link.name}</span>
              )}
            </div>
          ))}
          <Icon
            styles="w-[52px] h-[52px] bg-[#2c2f32]"
            imgUrl={money}
            name="money"
            handleClick={handleThreeDotsClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
