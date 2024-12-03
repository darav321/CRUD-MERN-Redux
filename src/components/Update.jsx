import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateUserMutation, useGetUserQuery } from "../redux/features/userApi";
import Swal from "sweetalert2";

const Update = () => {
  const { id } = useParams();
  const theme = useSelector((state) => state.themes.theme);
  const { data: user, isSuccess } = useGetUserQuery(id);
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (isSuccess && user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAge(user.age || "");
      setGender(user.gender || "");
    }
  }, [isSuccess, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        _id: id, 
        name: name,
        email: email,
        age: age,
        gender: gender,
      };
      const response = await updateUser(payload).unwrap();
      console.log("User updated successfully:", response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User Updated",
        showConfirmButton: true,
        confirmButtonText: "Home Page",
        cancelButtonColor: "#3085d6"
      }).then((result)=>{
        if(result.isConfirmed) {
            navigate("/home")
        }
      })
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-2/5">
      <h1
        className={`${
          theme === "light"
            ? "text-2xl my-2 font-semibold text-gray-700"
            : "text-2xl my-2 font-semibold text-white"
        }`}
      >
        Update User
      </h1>
      <form
        onSubmit={handleSubmit}
        className={`${
          theme === "light"
            ? "flex justify-center items-center flex-col border border-gray-600 p-5 rounded-lg shadow-2xl min-w-3/5"
            : "flex justify-center items-center flex-col border border-white p-5 rounded-lg shadow-2xl min-w-3/5"
        }`}
      >
        <div className="mt-2 w-full px-3">
          <p className={`${theme === "light" ? "text-gray-600" : "text-white"}`}>
            Name:
          </p>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={`${
              theme === "light"
                ? "px-4 py-1 rounded-lg border border-gray-500 mt-2 outline-none w-full focus:ring-1 focus:ring-black"
                : "px-4 py-1 rounded-lg border border-gray-200 mt-2 bg-gray-800 w-full text-white outline-none focus:ring-1 focus:ring-white"
            }`}
          />
        </div>
        <div className="mt-5 w-full px-3">
          <p className={`${theme === "light" ? "text-gray-600" : "text-white"}`}>
            Email:
          </p>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${
              theme === "light"
                ? "px-4 py-1 rounded-lg border border-gray-500 mt-2 outline-none w-full focus:ring-1 focus:ring-black"
                : "px-4 py-1 rounded-lg border border-gray-200 mt-2 bg-gray-800 w-full text-white outline-none focus:ring-1 focus:ring-white"
            }`}
          />
        </div>
        <div className="flex items-center mt-5 gap-10 w-full px-3">
          <div>
            <p className={`${theme === "light" ? "text-gray-600" : "text-white"}`}>
              Age:
            </p>
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              className={`${
                theme === "light"
                  ? "px-4 py-1 w-20 rounded-lg border border-gray-500 mt-2 outline-none focus:ring-1 focus:ring-black"
                  : "px-4 py-1 w-20 rounded-lg border border-gray-200 mt-2 bg-gray-800 text-white outline-none focus:ring-1 focus:ring-white"
              }`}
            />
          </div>
          <div>
            <p className={`${theme === "light" ? "text-gray-600" : "text-white"}`}>
              Gender:
            </p>
            <div className="flex gap-7 flex-row mt-2">
              <div
                className={`${
                  theme === "light"
                    ? "flex flex-row items-center gap-2 justify-center"
                    : "flex flex-row items-center gap-2 justify-center text-white"
                }`}
              >
                <p>Male</p>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div
                className={`${
                  theme === "light"
                    ? "flex flex-row items-center gap-2 justify-center"
                    : "flex flex-row items-center gap-2 justify-center text-white"
                }`}
              >
                <p>Female</p>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-full flex items-center justify-center py-1 border border-gray-600 bg-slate-300 mt-5 mb-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
