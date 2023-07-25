import React, { useEffect, useState } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FormDetails from "./FormDetails";
import { RiDeleteBin6Fill } from "react-icons/ri";

function EmpList() {
  // Hooks
  const [people, setPeople] = useState([]); //All Employee

  const [addname, setaddname] = useState(" "); //Add Employee name
  const [addemail, setaddemail] = useState(" "); //Add Employee email
  const [addrole, setaddrole] = useState(" "); //Add Employee role

  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [modalShow, setModalShow] = useState(false); // Modal
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee

  const cancelButtonRef = useRef(null);

  // view employee details in a modal
  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setModalShow(true);
  };

  // close the modal
  const handleCloseModal = () => {
    setModalShow(false);
  };

  // adding employee details
  const HandleAddName = (e) => {
    setaddname(e.target.value);
  };
  const HandleAddemail = (e) => {
    setaddemail(e.target.value);
  };
  const HandleAddrole = (e) => {
    setaddrole(e.target.value);
  };

  // Filter employees
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // setting localStorage
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setPeople(JSON.parse(storedEmployees));
    }
  }, []);

  // Save the updated employee data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(people));
  }, [people]);

  // Handle click event to delete an employee
  const handleDeleteEmployee = (employee) => {
    const updatedPeople = people.filter((person) => person !== employee);
    setPeople(updatedPeople);
    localStorage.setItem("employees", JSON.stringify(updatedPeople));
  };

  // add a new employee
  const HandleAddbutton = (e) => {
    e.preventDefault();
    const addEmployee = {
      name: addname,
      email: addemail,
      role: addrole,
    };
    setPeople((prevPeople) => [...prevPeople, addEmployee]);
    setaddname("");
    setaddemail("");
    setaddrole("");
    localStorage.setItem("employees", JSON.stringify(addEmployee));
    alert("Employee added successfully");
  };

  // prevent  modal from closing
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  // update an employee's details
  const handleUpdateEmployee = (updatedEmployee) => {
    const index = people.findIndex(
      (person) => person.name === updatedEmployee.name
    );
    if (index !== -1) {
      const updatedPeople = [...people];
      updatedPeople[index] = updatedEmployee;
      setPeople(updatedPeople);
      localStorage.setItem("employees", JSON.stringify(updatedPeople));
    }
  };

  return (
    <>
      <h1 className="text-3xl p-3 tracking-wider">EMPLOYEE-MANAGEMENT-APP</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name"
        className="border px-3 py-2 rounded-md mb-4 w-full focus:border-0"
      />
      {/* Employee List */}
      <div className="p-8 rounded-xl">
        <ul className="divide-y divide-gray-100">
          {filteredPeople.map((person) => (
            <li
              key={person}
              className="flex justify-between py-5 hover:shadow-xl border p-4 rounded-xl ease-in-out transition-all"
              onClick={() => handleViewDetails(person)}
            >
              <p className="text-sm leading-6 text-gray-900 font-bold">
                {person.name}
              </p>
              <div>
                <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                <p>{person.email}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEmployee(person);
                }}
                className="text-red-500 font-bold focus:outline-none hover:bg-white p-4 rounded-full"
              >
                <RiDeleteBin6Fill />
              </button>
            </li>
          ))}
        </ul>

        {/* Form to Add New Employee */}
        <form
          onSubmit={HandleAddbutton}
          className="border p-5 rounded-xl mt-5 hover:shadow-xl transition-all ease-in-out"
        >
          <h1 className="text-xl mb-3 tracking-wider font-extralight">
            ADD AN EMPLOYEE
          </h1>
          <div className="flex flex-col gap-3">
            <input
              onChange={HandleAddName}
              type="text"
              name="name"
              id="name"
              value={addname}
              className=" focus:outline-none block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Employee Name"
            />
            <input
              onChange={HandleAddemail}
              type="text"
              name="email"
              id="email"
              value={addemail}
              className=" focus:outline-none block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Employee Email"
            />
            <input
              onChange={HandleAddrole}
              type="text"
              name="role"
              value={addrole}
              id="role"
              className=" focus:outline-none block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Employee Role"
            />
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              ADD
            </button>
          </div>
        </form>
      </div>

      {/* Modal for displaying employee details */}
      <Transition.Root show={modalShow} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setModalShow}
          onClick={handleFormClick}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        EMPLOYEE DETAILS
                      </Dialog.Title>
                      <div className="mt-2">
                        {selectedEmployee && (
                          <FormDetails
                            onUpdateEmployee={handleUpdateEmployee}
                            selectedEmployee={selectedEmployee}
                            onClick={handleFormClick}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleCloseModal}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default EmpList;
