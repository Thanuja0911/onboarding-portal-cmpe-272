import EmployeeProfile from "./EmployeeProfileModel.js";

export const createEmployee = async (employeeData) => {
  const employee = new EmployeeProfile(employeeData);
  return await employee.save();
};

export const getEmployeeById = async (id) => {
  return await EmployeeProfile.findById(id);
};
