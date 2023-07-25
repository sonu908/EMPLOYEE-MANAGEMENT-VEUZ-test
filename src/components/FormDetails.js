import React, { useState } from "react";

function FormDetails({ selectedEmployee, onClick, onUpdateEmployee }) {
  const [name, setName] = useState(selectedEmployee.name);
  const [role, setRole] = useState(selectedEmployee.role);
  const [email, setEmail] = useState(selectedEmployee.email);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Save the updated details to local storage

  const SubmitUpdate = (e) => {
    e.preventDefault();
    // Create an updatedEmployee object with the edited details
    const updatedEmployee = {
      name: name,
      role: role,
      email: email,
      // Add other details here...
    };
    onUpdateEmployee(updatedEmployee);

    console.log(name, email, role);
    // Save the updated details to local storage
    localStorage.setItem("employees", JSON.stringify(updatedEmployee));

    console.log(name, email, role);
  };

  return (
    <>
      <form onSubmit={SubmitUpdate} onClick={onClick}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="sm:col-span-4">
              <div className=" mt-4 border p-4 transition-all ease-in-out  hover:rounded-lg  hover:shadow-lg">
                <label className="text-xs tracking-widest ">NAME</label>
                <input
                  id="username"
                  disabled
                  defaultValue={selectedEmployee.name}
                  className="block  font-bold text-3xl w-full  leading-6 text-gray-900  border-b border-transparent focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div className=" mt-4 border p-4 transition-all ease-in-out  hover:rounded-lg  hover:shadow-lg">
                <label className=" text-xs tracking-widest">ROLE</label>
                <input
                  id="role"
                  onChange={handleRoleChange}
                  defaultValue={selectedEmployee.role}
                  className="block  font-bold w-full  leading-6 text-gray-900  border-b border-transparent focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div className=" mt-4 border p-4 transition-all ease-in-out  hover:rounded-lg  hover:shadow-lg">
                <label className="text-xs tracking-widest">EMAIL</label>
                <input
                  onChange={handleEmailChange}
                  id="email"
                  defaultValue={selectedEmployee.email}
                  className="block  font-bold w-full  leading-6 text-gray-900  border-b border-transparent focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            UPDATE
          </button>
        </div>
      </form>{" "}
    </>
  );
}

export default FormDetails;
