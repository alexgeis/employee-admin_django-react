import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./EmpAdminApp.module.css";
import Modal from "./components/Modal";
import EmployeeList from "./components/EmployeeList";
import EmployeeItems from "./components/EmployeeItems";

export default function EmpAdminApp() {
	// STATE to add
	// views - location, position, by hire date - useReducer?
	// active item
	const [employeeList, setEmployeeList] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		try {
			(async function fetchLatestEmployees() {
				const result = await axios("http://localhost:8000/api/employees/");
				setEmployeeList(result.data);
			})();
		} catch (error) {
			console.error(error);
		}
	});

	const modalToggle = () => {
		setModalOpen((modalOpen) => !modalOpen);
	};

	const handleSubmit = async (employee) => {
		modalToggle();
		setActiveItem(employee);
		if (employee.id) {
			// if old post to edit and submit
			await axios.put(
				`http://localhost:8000/api/employees/${employee.id}/`,
				employee
			);
			setActiveItem(activeItemInit);
			return;
		}
		// if new post to submit
		await axios.post("http://localhost:8000/api/employees/", employee);
		setActiveItem(activeItemInit);
	};

	// Delete item
	const deleteEmployee = async (employee) => {
		setActiveItem(employee);
		await axios.delete(`http://localhost:8000/api/tasks/${item.id}/`);
		setActiveItem(activeItemInit);
	};
	// Create item
	const createEmployee = async () => {
		const employee = { title: "", description: "", completed: false };
		setActiveItem(employee);
		modalToggle();
	};
	//Edit item
	const editEmployee = (employee) => {
		setActiveItem(employee);
		modalToggle();
	};

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Task Manager</h1>
			<h3 className={styles.title}>Built w/ React / Django</h3>
			<div className={styles.employeeContainer}>
				<button
					onClick={createItem}
					className={styles.btnAdd}
				>
					Add task
				</button>
				<EmployeeList
					viewCompleted={viewCompleted}
					displayCompleted={displayCompleted}
				/>
				<ul className={styles.employeeList}>
					<EmployeeItems
						viewCompleted={viewCompleted}
						employeeList={employeeList}
						editItem={editItem}
						handleDelete={handleDelete}
					/>
				</ul>
			</div>
			{modalOpen && (
				<Modal
					activeItem={activeItem}
					setActiveItem={setActiveItem}
					toggle={modalToggle}
					onSave={handleSubmit}
				/>
			)}
		</main>
	);
}
