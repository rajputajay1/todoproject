import React, { useEffect, useState } from "react";
import "./PeopleAdded.css";
import AddPeople from "../addPeople/AddPeople";
import { fetchGetData, patchData, postData } from "../../../api";

function PeopleAdded({ onclose }) {
  const [gmailadd, setGmailAdd] = useState(false);
  const [gmail, setGmail] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  console.log(Object.keys(selectedUser).length);
  useEffect(() => {
    async function getUsers() {
      const token = localStorage.getItem("token");
      const fetchUsers = await fetchGetData("user/get-all-users", {}, token);
      console.log(fetchUsers);
      setUsers(fetchUsers.data);
    }
    getUsers();
  }, []);

  const handleGmailAdd = async () => {
    if (selectedUser) {
      try {
        const token = localStorage.getItem("token");
        const newMember = await patchData(
          "user/addMember",
          {
            email: gmail,
          },
          token
        );
        setGmailAdd(true);
      } catch (err) {}
    }
  };

  const handleGmailClose = () => {
    setGmailAdd(false);
    onclose();
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setGmail(email);
    setSelectedUser({});
    if (email) {
      const filtered = users.filter((user) =>
        user.email.toLowerCase().includes(email.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setGmail(user.email);
    setFilteredUsers([]);
  };

  return (
    <>
      <div className="popup-overlaypeople">
        <div className="popup-contentpeople">
          <p className="addpeople">Add people to the board</p>
          <div className="addemialinput">
            <input
              type="text"
              className="addpeopleinput"
              placeholder="Enter the email"
              value={gmail}
              onChange={handleEmailChange}
            />
          </div>
          {filteredUsers.length > 0 && (
            <div className="user-suggestions">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="user-suggestion"
                  onClick={() => handleUserSelect(user)}
                >
                  {user.email}
                </div>
              ))}
            </div>
          )}
          <div className="bothbtnaddpeople">
            <div className="canclebtnpeopleadd" onClick={onclose}>
              Cancel
            </div>
            <button
              className={`addemailbtnpeopleadd ${
                Object.keys(selectedUser).length == 0 ? "disabled" : ""
              }`}
              onClick={handleGmailAdd}
              disabled={Object.keys(selectedUser).length == 0}
            >
              Add Email
            </button>
          </div>
        </div>
      </div>
      {gmailadd && (
        <div>
          <AddPeople onclose={handleGmailClose} mail={gmail} />
        </div>
      )}
    </>
  );
}

export default PeopleAdded;
