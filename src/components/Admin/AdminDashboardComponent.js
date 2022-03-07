import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import { toast } from "react-toastify";

const AdminDashboardComponent = (props) => {
  const oneColumnRef = useRef();
  const twoColumnRef = useRef();

  const dashboardOverview = [
    {
      title: "Total Revenues",
      period: "30 Days",
      isSurplus: true,
      surplusText: "Revenue Up",
      value: "$711.66",
      icon: "icon-coins",
    },
    {
      title: "New Users",
      period: "30 Days",
      isSurplus: true,
      surplusText: "Users Up",
      value: "7,288",
      icon: "icon-team",
    },
    {
      title: "New Listings",
      period: "30 Days",
      isSurplus: false,
      surplusText: "Listing Down",
      value: "590",
      icon: "icon-property",
    },
  ];

  const visitorChartData = {
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
        fontFamily: "Poppins, Helvetica, Arial, sans-serif",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      theme: {
        mode: "dark",
      },
      colors: ["#0073e1", "#1fbfa9"],
    },
    series: [
      {
        name: "Target",
        data: [2000, 3000, 2000, 4000, 6000, 8000, 2000],
      },
      {
        name: "Visitors",
        data: [1780, 4872, 8719, 3200, 531, 4577, 5290],
      },
    ],
  };

  const registeredAgentChartData = {
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
        fontFamily: "Poppins, Helvetica, Arial, sans-serif",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
      theme: {
        mode: "dark",
      },
      colors: ["#0073e1", "#1fbfa9"],
    },
    series: [
      {
        name: "Target",
        data: [200, 400, 600, 800],
      },
      {
        name: "Registered Agent",
        data: [871, 320, 53, 457],
      },
    ],
  };

  const salesChartData = {
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
        fontFamily: "Poppins, Helvetica, Arial, sans-serif",
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      theme: {
        mode: "dark",
      },
      colors: ["#1fbfa9"],
    },
    series: [
      {
        name: "Sales",
        data: [871, 320, 53, 457, 871, 320, 53, 457, 871, 320, 53, 457],
      },
    ],
  };

  const socialMediaSalesChartData = {
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
        fontFamily: "Poppins, Helvetica, Arial, sans-serif",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      },
      theme: {
        mode: "dark",
      },
      colors: ["#0073e1", "#1fbfa9"],
    },
    series: [
      {
        name: "Target",
        data: [100, 100, 100, 100],
      },
      {
        name: "Sales",
        data: [28, 63, 110, 63],
      },
    ],
  };

  const earningsChartData = {
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
        fontFamily: "Poppins, Helvetica, Arial, sans-serif",
      },
      legend: {
        show: false,
      },
      theme: {
        mode: "dark",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#fc6687", "#1fbfa9"],
      labels: ["Expenses", "Profit"],
      tooltip: {
        y: {
          formatter: function (value, opts) {
            const getLabel = opts.globals.labels[opts.seriesIndex];
            return "This Month's " + getLabel + " : " + value + " %";
          },
          title: {
            formatter: function () {
              return "";
            },
          },
        },
      },
    },
    series: [28, 72],
  };

  // --------------------------
  // --------------------------

  const [oneColumnWidth, setOneColumnWidth] = useState(0);
  const [twoColumnWidth, setTwoColumnWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(300);

  // --------------------------
  // --------------------------

  const setupChartSize = () => {
    const desktopHeight = (window && window.innerHeight) || 0;
    const oneColumn =
      oneColumnRef && oneColumnRef.current && oneColumnRef.current.offsetWidth;
    const twoColumn =
      twoColumnRef && twoColumnRef.current && twoColumnRef.current.offsetWidth;
    // console.log(desktopHeight, oneColumnRef, twoColumnRef, oneColumn, twoColumn);

    setOneColumnWidth(oneColumn);
    setTwoColumnWidth(twoColumn);

    if (desktopHeight > 1100) {
      setChartHeight(450);
    } else if (desktopHeight > 900) {
      setChartHeight(400);
    }
  };

  const onClickDropdown = (dropdownType) => {
    comingSoonNotification(`${dropdownType} periodic chart`);
  };

  const comingSoonNotification = (featureName) => {
    toast.success(`${featureName} feature will come soon.`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 7000,
    });
  };

  // --------------------------
  // --------------------------

  useEffect(() => {
    setupChartSize();
  }, [oneColumnRef, twoColumnRef]);

  return (
    <div className="admin-dashboard__container">
      <div className="dashboard-row row--3 dashboard__overview">
        {dashboardOverview.map((overview, index) => {
          return (
            <div className="dashboard-column overview-box" key={index}>
              <div className="overview-box__content">
                <i className="icon-shift" />

                <div className="box__header">
                  <i className={overview.icon + " header-icon"} />
                  <div>
                    <h4 className="header-title">{overview.title}</h4>
                    <h6 className="header-subtitle">
                      (Last {overview.period})
                    </h6>
                  </div>
                </div>

                <div className="box__value">
                  <h4 className="value-text">{overview.value}</h4>
                  <div
                    className={
                      "surplus-indicator " +
                      (overview.isSurplus
                        ? "indicator--green"
                        : "indicator--red")
                    }
                  >
                    <i
                      className={
                        "indicator-icon icon-arrow-" +
                        (overview.isSurplus ? "up" : "down")
                      }
                    />
                    <p className="indicator-text">{overview.surplusText}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-row row--2 dashboard__visitors">
        <div className="dashboard-column" ref={twoColumnRef}>
          <div className="visitors__header">
            <h4 className="header__title">Visitors</h4>
            <button
              type="button"
              className="header__dropdown"
              onClick={() => onClickDropdown("Visitor")}
            >
              <p>Daily (2022)</p>
              <i className="icon-chevron-down" />
            </button>
          </div>
          <Chart
            options={visitorChartData.options}
            series={visitorChartData.series}
            type="area"
            width={twoColumnWidth}
            height={chartHeight}
          />
        </div>
        <div className="dashboard-column">
          <div className="visitors__header">
            <h4 className="header__title">Registered Agents</h4>
            <button
              type="button"
              className="header__dropdown"
              onClick={() => onClickDropdown("Registered agent")}
            >
              <p>Weekly (2022)</p>
              <i className="icon-chevron-down" />
            </button>
          </div>
          <Chart
            options={registeredAgentChartData.options}
            series={registeredAgentChartData.series}
            type="area"
            width={twoColumnWidth}
            height={chartHeight}
          />
        </div>
      </div>

      <div className="dashboard-row row--1 dashboard__sales" ref={oneColumnRef}>
        <div className="sales__header">
          <h4 className="header__title">Sales / Transactions</h4>
          <button
            type="button"
            className="header__dropdown"
            onClick={() => onClickDropdown("Transaction")}
          >
            <p>Monthly (2021)</p>
            <i className="icon-chevron-down" />
          </button>
        </div>
        <Chart
          options={salesChartData.options}
          series={salesChartData.series}
          type="bar"
          width={oneColumnWidth}
          height={chartHeight}
        />
      </div>

      <div className="dashboard-row row--2 dashboard__earnings">
        <div className="dashboard-column">
          <div className="earnings__header">
            <h4 className="header__title">Sales from Social Media</h4>
            <button
              type="button"
              className="header__dropdown"
              onClick={() => onClickDropdown("Social media sales")}
            >
              <p>Weekly (2022)</p>
              <i className="icon-chevron-down" />
            </button>
          </div>
          <Chart
            options={socialMediaSalesChartData.options}
            series={socialMediaSalesChartData.series}
            type="area"
            width={twoColumnWidth}
            height={chartHeight}
          />
        </div>
        <div className="dashboard-column column--earnings">
          <div className="earnings-wrapper">
            <i className="wrapper-icon icon-moneybag icon--green" />
            <div className="wrapper-content">
              <h4 className="content-title">$7200</h4>
              <p className="content-subtitle">This Month Earnings</p>
            </div>
          </div>
          <Chart
            options={earningsChartData.options}
            series={earningsChartData.series}
            type="donut"
            height={chartHeight}
          />
          <div className="earnings-wrapper wrapper--right">
            <i className="wrapper-icon icon-credit-card icon--red" />
            <div className="wrapper-content">
              <h4 className="content-title">$2800</h4>
              <p className="content-subtitle">This Month Expenses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardComponent;
