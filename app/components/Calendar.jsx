import React from "react";

const Calendar = () => {
  return (
    <div
      style={{
        height: "182px",
        width: "272px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Calendar</h3>
      {/* Här kan du lägga till din kalenderlogik eller bibliotek */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100% - 30px)",
        }}
      >
        <p>Kalenderinnehåll kommer här</p>
      </div>
    </div>
  );
};

export default Calendar;
