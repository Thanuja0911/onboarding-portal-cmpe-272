import React, { useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  LinearProgress,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import "./Dashboard.css";

const Dashboard = () => {
  // Initial employee data stored in state
  const [employees, setEmployees] = useState([
    {
      id: "1234",
      fullName: "Andy Smith",
      position: "Marketing Director",
      email: "andysmith@gmail.com",
      hiringLead: "Sammy Stone",
      documents: "Browse all",
      workflow: 1, // Workflow stage: 1 = Pre-Onboarding, 2 = Onboarding, 3 = Complete
    },
    {
      id: "3476",
      fullName: "Ben Anderson",
      position: "Copywriter",
      email: "andersonb@gmail.com",
      hiringLead: "Sammy Stone",
      documents: "Browse all",
      workflow: 2,
    },
    {
      id: "8955",
      fullName: "Joahn Collins",
      position: "Senior PHP Developer",
      email: "jcollins@gmail.com",
      hiringLead: "Jim Neutron",
      documents: "Browse all",
      workflow: 3,
    },
  ]);
  
  const [openDialog, setOpenDialog] = useState(false);  // To control dialog visibility
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);  // To store the employee ID whose workflow is being edited
  const [selectedStage, setSelectedStage] = useState(1);  // To store the selected workflow stage

  // Function to handle deletion of an employee
  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  // Function to handle opening of the edit dialog
  const handleEdit = (id, currentStage) => {
    setSelectedEmployeeId(id);
    setSelectedStage(currentStage);
    setOpenDialog(true);
  };

  // Function to handle closing of the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle saving the selected workflow stage
  const handleSaveWorkflow = () => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === selectedEmployeeId
          ? { ...employee, workflow: selectedStage }
          : employee
      )
    );
    setOpenDialog(false);
  };

  // Function to render workflow progress with stages
  const renderWorkflow = (employee) => {
    const stages = ["Pre-Onboarding", "Onboarding", "Complete"];
    const progress = (employee.workflow / stages.length) * 100;

    return (
      <div className="workflow-container">
        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={progress}
          className="progress-bar"
        />
        {/* Workflow Stages */}
        <div className="workflow-stages">
          {stages.map((label, index) => (
            <Typography
              key={index}
              variant="caption"
              className={`workflow-stage ${
                index + 1 === employee.workflow ? "active-stage" : ""
              }`}
            >
              {label}
            </Typography>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <SideBar />
      <div className="dashboard-container">
        {/* Page Header */}
        <Typography variant="h4" className="header-text" gutterBottom>
          Employees
        </Typography>

        {/* Employee Table */}
        <TableContainer className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID #</strong></TableCell>
                <TableCell><strong>Full Name</strong></TableCell>
                <TableCell><strong>Position</strong></TableCell>
                <TableCell><strong>E-Mail</strong></TableCell>
                <TableCell><strong>Hiring Lead</strong></TableCell>
                <TableCell><strong>Documents</strong></TableCell>
                <TableCell><strong>Onboarding Workflow</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.fullName}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.hiringLead}</TableCell>
                  <TableCell>
                    <a href="#" className="documents-link">
                      {employee.documents}
                    </a>
                  </TableCell>
                  <TableCell>{renderWorkflow(employee)}</TableCell>
                  <TableCell>
                    <div className="action-icons" >
                      {/* Edit Icon */}
                      <Tooltip title="Edit" arrow>
                        <IconButton size="small" onClick={() => handleEdit(employee.id, employee.workflow)}>
                          <Edit className="action-icon" />
                        </IconButton>
                      </Tooltip>
                      {/* Delete Icon */}
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(employee.id)}
                        >
                          <Delete className="action-icon" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Dialog for editing workflow stage */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ backgroundColor: "#e6f7ff", fontSize: "15px", fontWeight: 600 }}>Edit Onboarding Status</DialogTitle>
        <DialogContent style={{ padding: "20px" }}>
          <RadioGroup
            value={selectedStage}
            onChange={(e) => setSelectedStage(parseInt(e.target.value))}
          >
            <FormControlLabel value={1} control={<Radio />} label="Pre-Onboarding" />
            <FormControlLabel value={2} control={<Radio />} label="Onboarding" />
            <FormControlLabel value={3} control={<Radio />} label="Complete" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveWorkflow} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;