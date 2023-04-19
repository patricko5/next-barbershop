import { useState, useEffect } from "react";
import styles from "../../../styles/StaffTab.module.css";
import PersonalBookings from "./staff/PersonalBookings";
import PersonalInformation from "./staff/PersonalInformation";
import axios from "axios";
import AddStaff from "./staff/AddStaff";

const StaffTab = () => {
  const [staffs, setStaffs] = useState([]);
  const [activeStaff, setActiveStaff] = useState([]); // Add this
  const [inactiveStaff, setInactiveStaff] = useState([]); // Add this
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [currentStaffList, setCurrentStaffList] = useState("active"); // Add this
  const [actionTab, setActionTab] = useState("tab1");

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/staff");
        setStaffs(data);
        const activeStaffData = data.filter((staff) => staff.isActive);
        const inactiveStaffData = data.filter((staff) => !staff.isActive);
        setActiveStaff(activeStaffData);
        setInactiveStaff(inactiveStaffData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStaffs();
  }, [staffs]);

  useEffect(() => {
    if (selectedStaff === null) {
      if (activeStaff.length > 0 && currentStaffList === "active") {
        setSelectedStaff(activeStaff[0]);
      } else if (inactiveStaff.length > 0 && currentStaffList === "inactive") {
        setSelectedStaff(inactiveStaff[0]);
      }
    }
  }, [selectedStaff, activeStaff, inactiveStaff, currentStaffList]);

  const handleToggleStaffClick = (list) => {
    setCurrentStaffList(list);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleStaffClick = (staffMember) => {
    setSelectedStaff(staffMember);
  };

  const handleStaffUpdate = (updatedStaff) => {
    // Update the staffs array with the updated staff data
    const newStaffs = staffs.map((staff) =>
      staff._id === updatedStaff._id ? updatedStaff : staff
    );
    setStaffs(newStaffs);

    // Update the activeStaff and inactiveStaff arrays
    const activeStaffData = newStaffs.filter((staff) => staff.isActive);
    const inactiveStaffData = newStaffs.filter((staff) => !staff.isActive);
    setActiveStaff(activeStaffData);
    setInactiveStaff(inactiveStaffData);

    // If the selectedStaff is the one being updated, update its reference
    if (selectedStaff._id === updatedStaff._id) {
      const newSelectedStaff = updatedStaff.isActive
        ? activeStaffData.find((staff) => staff._id === updatedStaff._id)
        : inactiveStaffData.find((staff) => staff._id === updatedStaff._id);
      setSelectedStaff(newSelectedStaff);
    }
  };

  const HandleActionTabClick = (tab) => {
    setActionTab(tab);
  };
  console.log(selectedStaff);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <ul className={styles.tabContainer}>
            <li
              className={`${styles.tabButton} ${
                actionTab === "tab1" ? styles.activeButton2 : ""
              }`}
              onClick={() => HandleActionTabClick("tab1")}
            >
              View
            </li>
            <li
              className={`${styles.tabButton} ${
                actionTab === "tab2" ? styles.activeButton2 : ""
              }`}
              onClick={() => HandleActionTabClick("tab2")}
            >
              Add
            </li>
          </ul>
          <div className={styles.lineTop}></div>
        </div>
        <>
          {actionTab === "tab1" && (
            <div className={styles.bottom}>
              <div className={styles.left}>
                <div className={styles.listTopContainer}>
                  <div className={styles.titleContainer}>
                    <h1 className={styles.title}>List of Staff</h1>
                  </div>
                  <div className={styles.toggleStaff}>
                    <div
                      className={`${styles.toggleStaffButton} ${
                        currentStaffList === "active" && styles.activeButton
                      }`}
                      onClick={() => handleToggleStaffClick("active")}
                    >
                      <h5>Active</h5>
                    </div>
                    <div
                      className={`${styles.toggleStaffButton} ${
                        currentStaffList === "inactive" && styles.activeButton
                      }`}
                      onClick={() => handleToggleStaffClick("inactive")}
                    >
                      <h5>Inactive</h5>
                    </div>
                  </div>

                  <div className={styles.line}></div>
                </div>
                <div className={styles.cardsContainer}>
                  {(currentStaffList === "active"
                    ? activeStaff
                    : inactiveStaff
                  ).map((staff) => (
                    <div
                      key={staff._id}
                      className={`${styles.staffCard} ${
                        selectedStaff?._id === staff._id
                          ? styles.activeStaffCard
                          : ""
                      }`}
                      onClick={() => {
                        handleStaffClick(staff);
                      }}
                    >
                      <div className={styles.staffInfo}>
                        <h3 className={styles.name}>
                          {staff.firstName} {staff.lastName}
                        </h3>
                        <h6>
                          {staff.isActive
                            ? "Currently Working"
                            : "No longer Active"}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.recordTabMenu}>
                  <div
                    onClick={() => handleTabClick("tab1")}
                    className={styles.recordTabItem}
                  >
                    Personal Information
                  </div>
                  <div
                    onClick={() => handleTabClick("tab2")}
                    className={styles.recordTabItem}
                  >
                    Bookings
                  </div>
                </div>
                <div className={styles.content}>
                  {activeTab === "tab1" && selectedStaff && (
                    <PersonalInformation
                      selectedStaff={selectedStaff}
                      onUpdate={handleStaffUpdate}
                    />
                  )}
                  {activeTab === "tab2" && selectedStaff && (
                    <PersonalBookings selectedStaff={selectedStaff} />
                  )}
                </div>
              </div>
            </div>
          )}
          {actionTab === "tab2" && (
            <div className={styles.bottom}>
              <AddStaff />
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default StaffTab;
