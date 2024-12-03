import React from "react";
import {
  useDeleteUserMutation,
  useGetBooksQuery,
} from "../redux/features/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = ({ searchTerm}) => {
  const { data: users = [] } = useGetBooksQuery();
  const theme = useSelector((state) => state.themes.theme);
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const handleUpdate = (_id) => {
    navigate(`/update-user/${_id}`);
  };

  const handleDelete = async (_id) => {
    const confirmation = await Swal.fire({
      position: "center",
      icon: "warning",
      title: "Are you sure you want to delete this user?",
      showConfirmButton: true,
      confirmButtonText: "Yes, Delete",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (confirmation.isConfirmed) {
      try {
        await deleteUser(_id).unwrap();
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "User Deleted Successfully",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to Delete User",
          text: error?.data?.message || "Something went wrong",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-70 flex-col w-3/5">
      <button
        onClick={() => navigate("/create-user")}
        className={`${
          theme === "light"
            ? "border border-black rounded-lg px-5 py-1 mt-5 bg-white text-black"
            : "border border-white rounded-lg px-5 py-1 mt-5 bg-gray-800 text-white"
        }`}
      >
        Add User
      </button>
      <div className="w-4/5">
        {users.length > 0 ? (
          users
          .filter((user)=>{
            const searchQuery = searchTerm.toLowerCase()
            return (
              user.name.toLowerCase().includes(searchQuery)
            )
          })
            .map((item) => (
              <div
                key={item._id}
                className={`${
                  theme === "light"
                    ? "flex border mt-7 bg-slate-100 py-4 border-black rounded-lg justify-center items-center flex-col gap-5 shadow-lg w-300"
                    : "flex border mt-7 bg-slate-800 py-4 border-white text-white rounded-lg justify-center items-center flex-col gap-5"
                }`}
              >
                <p>Name : {item.name}</p>
                <p>Email : {item.email}</p>
                <p>Age : {item.age}</p>
                <p>Gender : {item.gender}</p>
                <div className="flex flex-row items-center justify-center gap-5">
                  <button
                    className="bg-red-500 rounded-lg px-4 py-1 text-white hover:bg-red-600"
                    onClick={() => handleDelete(item._id)}
                  >
                    Remover User
                  </button>
                  <button
                    className="bg-blue-500 rounded-lg px-4 py-1 text-white hover:bg-blue-600"
                    onClick={() => handleUpdate(item._id)}
                  >
                    Update User
                  </button>
                </div>
              </div>
            ))
        ) : (
          <div className="flex justify-center items-center">
            <p>No User Created! Add at least one...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
