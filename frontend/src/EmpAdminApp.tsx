import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./EmpAdminApp.module.css";
import Modal from "./components/Modal";
import FilterList from "./components/FilterList";
import EmployeeItems from "./components/EmployeeItems";

const date = new Date();
const formatedCurrDate = date.toISOString().slice(0, 10);
// YYYY-MM-DD

const activeEmployeeInit: Employee = {
	first_name: "",
	last_name: "",
	position: "",
	hire_date: formatedCurrDate,
};

export default function EmpAdminApp() {
	// STATE to add
	// views - location, position, by hire date - useReducer?
	const [activeEmployee, setActiveEmployee] = useState(activeEmployeeInit);
	const [employeeList, setEmployeeList] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		try {
			async function fetchLatestEmployees() {
				const result = await axios("http://localhost:8000/api/employees/");
				setEmployeeList(result.data);
			}
			fetchLatestEmployees();
		} catch (error) {
			console.error(error);
		}
	});

	const modalToggle = () => {
		setModalOpen((modalOpen) => !modalOpen);
	};

	const handleSubmit = async (employee: Employee) => {
		modalToggle();
		setActiveEmployee(employee);
		if (employee.id) {
			// if old post to edit and submit
			await axios.put(
				`http://localhost:8000/api/employees/${employee.id}/`,
				employee
			);
			setActiveEmployee(activeEmployeeInit);
			return;
		}
		// if new post to submit
		await axios.post("http://localhost:8000/api/employees/", employee);
		setActiveEmployee(activeEmployeeInit);
	};

	// Delete item
	const deleteEmployee = async (employee: Employee) => {
		setActiveEmployee(employee);
		await axios.delete(`http://localhost:8000/api/tasks/${employee.id}/`);
		setActiveEmployee(activeEmployeeInit);
	};
	// Create item
	const createEmployee = async () => {
		setActiveEmployee(activeEmployeeInit);
		modalToggle();
	};
	//Edit item
	const editEmployee = (employee: Employee) => {
		setActiveEmployee(employee);
		modalToggle();
	};

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Employee Admin</h1>
			<h3 className={styles.title}>Built w/ React / Django</h3>
			<div className={styles.employeeContainer}>
				<button
					onClick={createEmployee}
					className={styles.btnAdd}
				>
					Add Employee
				</button>
				{/* <FilterList
				viewCompleted={viewCompleted}
				displayCompleted={displayCompleted}
				/> */}
				<ul className={styles.employeeList}>
					<EmployeeItems
						// viewCompleted={viewCompleted}
						employeeList={employeeList}
						handleEdit={editEmployee}
						handleDelete={deleteEmployee}
					/>
				</ul>
			</div>
			{modalOpen && (
				<Modal
					activeEmployee={activeEmployee}
					setActiveEmployee={setActiveEmployee}
					toggle={modalToggle}
					onSave={handleSubmit}
				/>
			)}
		</main>
	);
}
