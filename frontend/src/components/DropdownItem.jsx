import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownItem = ({ id, name, image, price }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    width: "100%",
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3px 20px",
    cursor: 'pointer',
    backgroundColor: isHovered ? '#f0f0f0' : 'transparent',
    zIndex: 50,
  };

  const handleRedirection = (e) => {
    e.preventDefault();
    navigate(`/product/${id}`)
  }

  return (
    <div
      // key={id}
      style={baseStyle}
      onClick={handleRedirection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div onClick={handleRedirection}>
        <img src={image} width={100} alt={name} />
      </div>
      <div>{name}</div>
      <div>{price}</div>
    </div>
  );
};

export default DropdownItem;
