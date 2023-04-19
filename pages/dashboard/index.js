import Dashboard from "../../src/components/dashboard/Dashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";

function dashboard() {
  const router = useRouter();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const accountID = useSelector((state) => state.auth.accountID);
  const [staffId, setStaffId] = useState("");
  const [staffFullName, setStaffFullName] = useState("");

  if (!loggedIn) {
    router.push("/Login");
  }

  useEffect(() => {
    const getStaff = async (accountID) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/staff/account/${accountID}`
        );
        setStaffId(response.data._id);
        setStaffFullName(
          response.data.firstName + " " + response.data.lastName
        );
      } catch (error) {
        console.error(error);
      }
    };

    getStaff(accountID);
  }, []);

  return (
    <div>
      
      <Dashboard staffId={staffId} staffName={staffFullName}/>;
    </div>
  );
}

export default dashboard;
