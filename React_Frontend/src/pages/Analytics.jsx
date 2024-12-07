import React, { useEffect, useState } from "react";
import AuthHandler from "../utils/Authhandler";
import APIHandler from "../utils/APIHandler";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";


const Analytics = ({ setLowStockMedicines }) => {
  const apiHandler = APIHandler();
  const navigate = useNavigate();
  const [customer_rqst_data, setCustomer_rqst_data] = useState(0);
  const [bill_count, setBill_count] = useState(0);
  const [medicine_count, setMedicine_count] = useState(0);
  const [company_count, setCompany_count] = useState(0);
  const [employee_count, setEmployee_count] = useState(0);
  const [profit_total, setProfit_total] = useState(0);
  const [sell_total, setSell_total] = useState(0);
  const [request_pending, setRequest_pending] = useState(0);
  const [request_completed, setRequest_completed] = useState(0);
  const [profit_amt_today, setProfit_amt_today] = useState(0);
  const [sell_amt_today, setSell_amt_today] = useState(0);
  const [medicine_expire_serializer_data, setMedicine_expire_serializer_data] = useState(0);
  const [medicineStock, setMedicineStock] = useState([]);


  useEffect(() => {
    AuthHandler.checkTokenExpiry();
    fetchHomePageData();
    fetchMedicineStock();
  }, []);

  const [profitChartOptions, setProfitChartOptions] = useState({
    chart: {
      type: "bar",
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (value) {
          return new Date(value).toLocaleDateString(); // Format the date for display
        },
      },
    },
    yaxis: {
      categories: [
        {
          name: "Profit",
          data: [],
        },
        {
          name: "Sales",
          data: [],
        },
        {
          name: "Buy",
          data: [],
        },
      ],
      title: {
        text: "₹ (Rupees)",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Total Profit, Sales & Buy Chart",
      align: "center",
    },
  });

  const [profitSeries, setProfitSeries] = useState([
    {
      name: "Date",
      data: [], // this will hold Date values
    },
  ]);

  const redirectCustomerRequest = () => {
    navigate("/customerRequest");
  };
  const redirectMedicinePage = () => {
    navigate("/manageMedicine");
  };
  const redirectCompanyPage = () => {
    navigate("/company");
  };

  const fetchMedicineStock = async () => {
    try {
      const medicineStockData = await apiHandler.fetchAllMedicine();
      console.log("Fetched medicine stock data:", medicineStockData.data); // Debugging log
      setMedicineStock(medicineStockData.data.data);
      checklowStockMedicine(medicineStockData.data.data); 
    } catch (error) {
      console.error("Error fetching medicine stock data:", error);
    }
  };

  const checklowStockMedicine = (medicines) => {
    const lowStockMedicines = medicines.filter((medicine) =>medicine.in_stock_total < 10);
    setLowStockMedicines(lowStockMedicines);
    console.log("Low stock medicines:", lowStockMedicines);
  };

  const fetchHomePageData = async () => {
    try {
      const homedata = await apiHandler.fetchHomePage();
      console.log("Fetched company data:", homedata); // Debugging log
      //   setCompanyData(companydata.data.data);
      setCustomer_rqst_data(homedata.data.customer_request);
      setBill_count(homedata.data.bill_count);
      setMedicine_count(homedata.data.medicine_count);
      setCompany_count(homedata.data.company_count);
      setEmployee_count(homedata.data.employee_count);
      setProfit_total(homedata.data.profit_total);
      setSell_total(homedata.data.sell_total);
      setRequest_pending(homedata.data.request_pending);
      setRequest_completed(homedata.data.request_completed);
      setProfit_amt_today(homedata.data.profit_amt_today);
      setSell_amt_today(homedata.data.sell_amt_today);
      setMedicine_expire_serializer_data(
        homedata.data.medicine_expire_serializer_data
      );

      // Set the profit chart data
      const profitData = homedata.data.profit_chart;
      const salesData = homedata.data.sell_chart;
      const buyData = homedata.data.buy_chart;

      // console.log("Buy data:", buyData);

      //For Profit chart
      const profitChart = profitData.map((item) => ({
        x: new Date(item.date).getTime(),
        y: item.amt,
      }));

      //For Sales chart
      const salesChart = salesData.map((item) => ({
        x: new Date(item.date).getTime(),
        y: item.amt,
      }));

      //For Buy chart
      const buyChart = buyData.map((item) => ({
        x: new Date(item.date).getTime(),
        y: item.amt,
      }));

      // console.log("Sales chart:", salesChart);
      // console.log("Profit chart:", profitChart);
      setProfitSeries([
        {
          name: "Profit",
          data: profitChart,
        },
        {
          name: "Sales",
          data: salesChart,
        },
        {
          name: "Buy",
          data: buyChart,
        },
      ]);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row mb-2 mb-xl-3">
          <div className="col-auto d-none d-sm-block">
            <h3>
              <strong>Analytics</strong> Dashboard
            </h3>
          </div>
        </div>
        <div className="home-card">
          <div className="row">
            <div className="col-sm-6 col-xl-3">
              <div className="card" onClick={redirectCustomerRequest}>
                <div className="home-card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title">Total Request</h5>
                      </div>
                      <div className="col-auto">
                        <div className="stat text-primary">
                          <i className="bi bi-clipboard2-pulse"></i>
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">{customer_rqst_data}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Total Sales</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <i className="bi bi-cash-coin"></i>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">{bill_count}</h1>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card" onClick={redirectMedicinePage}>
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Total Medicine</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <i className="bi bi-capsule-pill"></i>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">{medicine_count}</h1>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card" onClick={redirectCompanyPage}>
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Total Company</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <i className="bi bi-buildings"></i>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">{company_count}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Total Employee</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <i className="bi bi-person-fill-add"></i>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">{employee_count} </h1>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Total Profit</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <i className="bi bi-graph-up-arrow"></i>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">₹ {profit_total}</h1>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Total Sales Amt.</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <i className="bi bi-currency-dollar"></i>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">₹ {sell_total}</h1>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h4 className="card-title">Medicine Expire in Week</h4>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <i className="bi bi-hand-thumbs-down"></i>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-0 mb-3">
                    {medicine_expire_serializer_data}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-xl-3">
              <div className="card" onClick={redirectCustomerRequest}>
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Completed Request</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <i className="bi bi-check2-square"></i>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt- mb-3">{request_completed}</h1>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card" onClick={redirectCustomerRequest}>
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Pending Request</h5>
                    </div>

                    <div className="col-auto">
                      <div className="stat text-primary">
                        <i className="bi bi-question-circle"></i>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">{request_pending}</h1>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Today Sales Amount</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <i className="bi bi-cash"></i>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">₹ {sell_amt_today}</h1>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Today Sales Profit</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <i className="bi bi-bar-chart"></i>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">₹ {profit_amt_today}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chart">
          <Chart
            options={profitChartOptions}
            series={profitSeries}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </>
  );
};

export default Analytics;
