import { Table } from "antd";
import React from "react";
import { MdPersonAdd } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { RiEmpathizeLine } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { FaAmbulance } from "react-icons/fa";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { FiArrowUpRight, FiPlus, FiSearch } from "react-icons/fi";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllData, GetPatients } from "../../../../Redux/Datas/action";
import { Link } from "react-router-dom";

const FrontPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const columns = [
    { title: "Name", dataIndex: "patientName", key: "patientName" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  const { patients } = useSelector((store) => store.data.patients);
  const {
    dashboard: { data },
  } = useSelector((store) => store.data);
  const user = useSelector((store) => store.auth.data.user);
  const patientRows = (patients || []).filter((patient) =>
    [patient.patientName, patient.disease, patient.department, patient.bloodGroup, patient.email]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const displayName = user?.name || user?.nurseName || user?.docName || user?.adminName || "Care team";
  const action = user?.userType === "nurse"
    ? { label: "Register patient", to: "/addpatient" }
    : user?.userType === "admin"
      ? { label: "Add a doctor", to: "/addoctor" }
      : { label: "View reports", to: "/reports" };
  const metrics = [
    { label: "Doctors", value: data?.doctor, icon: <MdPersonAdd className="overviewIcon" /> },
    { label: "Nurses", value: data?.nurse, icon: <FaUserNurse className="overviewIcon" /> },
    { label: "Patients", value: data?.patient, icon: <RiEmpathizeLine className="overviewIcon" /> },
    { label: "Admins", value: data?.admin, icon: <RiAdminLine className="overviewIcon" /> },
    { label: "Available beds", value: data?.bed, icon: <FaBed className="overviewIcon" /> },
    { label: "Ambulances", value: data?.ambulance, icon: <FaAmbulance className="overviewIcon" /> },
    { label: "Appointments", value: data?.appointment, icon: <BsFillBookmarkCheckFill className="overviewIcon" /> },
    { label: "Reports", value: data?.report, icon: <MdPayment className="overviewIcon" /> },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPatients());
    dispatch(GetAllData());
  }, [dispatch]);

  return (
    <div className="container">
      <Sidebar />
      <div className="AfterSideBar">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">Medly / Overview</p>
            <h1>Dashboard</h1>
          </div>
          <div className="dashboard-header-tools">
            <label className="dashboard-search">
              <FiSearch aria-hidden="true" />
              <input
                type="search"
                placeholder="Search patients"
                aria-label="Search patients"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
            <div className="dashboard-user">
              <div className="dashboard-avatar" aria-hidden="true">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="dashboard-user-copy">
                <p className="dashboard-user-name">{displayName}</p>
                <p className="dashboard-user-role">{user?.userType || "Care team"}</p>
              </div>
            </div>
          </div>
        </header>
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">Your care, coordinated</p>
            <h2>{user ? `Good to see you, ${displayName}.` : "Good to see you."}</h2>
            <p>Here's your hospital at a glance. Keep every part of care moving together.</p>
          </div>
          <Link className="dashboard-action" to={action.to}>
            <FiPlus aria-hidden="true" /> {action.label} <FiArrowUpRight aria-hidden="true" />
          </Link>
        </section>
        <div className="section-heading">
          <div>
            <h2>Hospital overview</h2>
            <p>A live snapshot of your care operations</p>
          </div>
        </div>
        <div className="maindiv">
          {metrics.map((metric) => (
            <div className="commondiv" key={metric.label}>
              <div>
                <h1>{metric.value ?? "-"}</h1>
                <p>{metric.label}</p>
              </div>
              {metric.icon}
            </div>
          ))}
        </div>
        <div className="patientDetails">
          <div className="section-heading">
            <div>
              <h2>Recent patients</h2>
              <p>{patientRows.length} patient records</p>
            </div>
          </div>
          <div className="patientBox">
            {patientRows.length ? (
              <Table
                columns={columns}
                dataSource={patientRows}
                rowKey={(patient, index) => patient._id || patient.id || index}
                pagination={{ pageSize: 6, hideOnSinglePage: true }}
                scroll={{ x: 700 }}
              />
            ) : (
              <div className="empty-patients">
                {searchTerm ? "No patients match your search." : "No patient records to show yet."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
