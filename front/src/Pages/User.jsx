import Topbar from "../components/Topbar";
import UserDashboard from "../components/UserDashboard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const trips = [
    {
        "_id": "63f29fa46ec3d282a776e12a",
        "userId": "63f1850c5ee346cc22311b54",
        "date": "2023-02-19",
        "locations": [
            {
                "name": "location333",
                "latitude": 1,
                "_id": "63f29fa46ec3d282a776e12b"
            },
            {
                "name": "location2",
                "latitude": 2,
                "_id": "63f29fa46ec3d282a776e12c"
            }
        ],
        "createdAt": "2023-02-19T22:16:04.190Z",
        "updatedAt": "2023-02-19T22:16:04.190Z",
        "__v": 0
    },
    {
        "_id": "63f2a343eb17083b4de8af99",
        "userId": "63f1850c5ee346cc22311b54",
        "date": "2023-03-19",
        "locations": [
            {
                "name": "new trip location",
                "latitude": 1,
                "_id": "63f2a343eb17083b4de8af9a"
            }
        ],
        "createdAt": "2023-02-19T22:31:31.826Z",
        "updatedAt": "2023-02-19T22:31:31.826Z",
        "__v": 0
    },
    {
        "_id": "63f2abddeb17083b4de8afe4",
        "userId": "63f1850c5ee346cc22311b54",
        "date": "2023-05-20",
        "locations": [
            {
                "name": "boston",
                "latitude": 2,
                "_id": "63f2abddeb17083b4de8afe5"
            },
            {
                "name": "boston",
                "latitude": 3,
                "_id": "63f2abddeb17083b4de8afe6"
            },
            {
                "name": "boston",
                "latitude": 4,
                "_id": "63f2abddeb17083b4de8afe7"
            }
        ],
        "createdAt": "2023-02-19T23:08:13.030Z",
        "updatedAt": "2023-02-19T23:08:13.030Z",
        "__v": 0
    }
]

  useEffect(() => {
    const fetchUser = async () => {
      const res = localStorage.getItem("user_info");
      setUser(res);
      if (!res) {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      <Topbar />
      <UserDashboard/>

    </div>
  );
}
