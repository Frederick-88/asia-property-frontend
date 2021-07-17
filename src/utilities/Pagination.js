import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/pagination.scss";

const Pagination = (props) => {
  const [activePage, setActivePage] = useState(1);
  const currentQueryUrl = useLocation().search;

  const paginationList = [1, 2, 3, 4];
  const maxPaginationNum = Math.max(...paginationList);
  const minPaginationNum = Math.min(...paginationList);
  const isOnMaxPage = maxPaginationNum === activePage;
  const isOnMinPage = minPaginationNum === activePage;

  const paginationClass = (page) => {
    return activePage === page
      ? "pagination-item item--active"
      : "pagination-item";
  };

  const nextPrevButtonClass = (type) => {
    if (type === "prev")
      return isOnMinPage
        ? "pagination-item item--button item--disabled"
        : "pagination-item item--button";
    return isOnMaxPage
      ? "pagination-item item--button item--disabled"
      : "pagination-item item--button";
  };

  const route = (value) => {
    if (value === "prev") return `?page=${activePage - 1}`;
    else if (value === "next") return `?page=${activePage + 1}`;
    return `?page=${value}`;
  };

  useEffect(() => {
    const getPageQueryNumber = parseInt(currentQueryUrl.replace(/[^0-9]/g, ""));
    setActivePage(getPageQueryNumber);
  }, [currentQueryUrl]);

  return (
    <ul className="pagination">
      <li className={nextPrevButtonClass("prev")}>
        <Link to={route("prev")} className="link icon-pagination-arrow-left" />
      </li>
      {paginationList.map((page) => {
        return (
          <li className={paginationClass(page)} key={page}>
            <Link className="link" to={route(page)}>
              {page}
            </Link>
          </li>
        );
      })}
      <li className={nextPrevButtonClass("next")}>
        <Link to={route("next")} className="link icon-pagination-arrow-right" />
      </li>
    </ul>
  );
};

export default Pagination;
