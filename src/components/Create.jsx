import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useAddUserMutation } from "../redux/features/userApi";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";

const Create = () => {
  const theme = useSelector((state) => state.themes.theme);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [addUser, {isLoading, isError, error}] = useAddUserMutation();
  const navigate = useNavigate()

  const getErrorMessage = () => {
    if (!error) return null;

    switch (error.status) {
      case 403:
        return 'All fields are required';
      case 402:
        return 'User already exists';
      case 500:
        return 'Internal server error. Please try again later.';
      default:
        return error.data?.message || 'An unexpected error occurred.';
    }
  };

  const onSubmit = async (data) => {
    try {
      await addUser(data).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User Added",
        showConfirmButton: true,
        confirmButtonText: "Home Page",
        showCancelButton: true,
        cancelButtonText:"Continue Adding",
        cancelButtonColor: "#3085d6"
      }).then((result)=>{
        if(result.isConfirmed) {
            navigate("/home")
        }
        else
        {
          reset()
        }
      })
    } catch (error) {
      console.error(error)
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
        Create User
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${
          theme === "light"
            ? " flex justify-center items-center flex-col border border-gray-600 p-5 rounded-lg shadow-2xl min-w-3/5"
            : "flex justify-center items-center flex-col border border-white bg-gray-800 p-5 rounded-lg shadow-2xl min-w-3/5"
        }`}
      >
        <div className="mt-2 w-full px-3">
          <p
            className={`${theme === "light" ? "text-gray-600" : "text-white"}`}
          >
            Name:
          </p>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            name="name"
            className={`${
              theme === "light"
                ? "px-4 py-1 rounded-lg border border-gray-500 mt-2 outline-none w-full focus:ring-1 focus:ring-black"
                : "px-4 py-1 rounded-lg border border-gray-200 mt-2 bg-gray-800 w-full text-gray-100 outline-none focus:ring-1 focus:ring-white"
            }`}
          />
        </div>
        <div className="mt-5 w-full px-3">
          <p
            className={`${theme === "light" ? "text-gray-600" : "text-white"}`}
          >
            Email
          </p>
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            name="email"
            className={`${
              theme === "light"
                ? "px-4 py-1 rounded-lg border border-gray-500 mt-2 outline-none w-full focus:ring-1 focus:ring-black"
                : "px-4 py-1 rounded-lg border border-gray-200 mt-2 bg-gray-800 w-full text-gray-100 outline-none focus:ring-1 focus:ring-white"
            }`}
          />
        </div>
        <div className="flex items-center mt-5 gap-10 w-full px-3">
          <div>
            <p
              className={`${
                theme === "light" ? "text-gray-600" : "text-white"
              }`}
            >
              Age
            </p>
            <input
              {...register("age")}
              type="text"
              name="age"
              placeholder="Age"
              className={`${
                theme === "light"
                  ? "px-4 py-1 w-20 rounded-lg border border-gray-500 mt-2 outline-none focus:ring-1 focus:ring-black"
                  : "px-4 py-1 w-20 rounded-lg border border-gray-200 mt-2 text-gray-100 bg-gray-800 outline-none focus:ring-1 focus:ring-white"
              }`}
            />
          </div>
          <div>
            <p
              className={`${
                theme === "light" ? "text-gray-600" : "text-white"
              }`}
            >
              Gender
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
                  {...register("gender")}
                  type="radio"
                  name="gender"
                  value="Male"
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
                  {...register("gender")}
                  type="radio"
                  name="gender"
                  value="Female"
                />
              </div>
            </div>
          </div>
        </div>
        <button className="w-full rounded-lg flex items-center justify-center py-1 border text-white border-gray-600 bg-blue-500 mt-5 mb-4">
          Submit
        </button>
      </form>
      {isError && (
        <p className="text-red-500 mt-2">
          {getErrorMessage()}
        </p>
      )}
    </div>
  );
};

export default Create;
