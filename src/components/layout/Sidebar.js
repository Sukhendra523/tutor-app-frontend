import React from "react";

const Sidebar = () => {
  const sidebarOptions = [
    {
      link: "#AllTutors",
      label: "All Tutors",
      access: "student",
    },
    {
      link: "#RequestedTutors",
      label: "Requested Tutors",
      access: "student",
    },
    {
      link: "#MyTutors",
      label: "My Tutors",
      access: "student",
    },
    {
      link: "#studentRequest",
      label: "Student Request",
      access: "tutor",
    },
    {
      link: "#students",
      label: "My Students",
      access: "tutor",
    },
  ];
  const role = JSON.parse(localStorage.getItem("user")).role;

  return (
    <div className="col-sm-2 pt-3 position-fixed start-0 bg-logo-color h-100">
      <ul className="list-unstyled">
        {sidebarOptions &&
          sidebarOptions.map(
            (option, i) =>
              option.access === role && (
                <li key={i} className="pt-5 pb-1 border-bottom border-3">
                  <a className="sidebar-link" href={option.link}>
                    {option.label}
                  </a>
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default Sidebar;
