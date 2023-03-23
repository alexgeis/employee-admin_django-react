import styles from "./Modal.module.css";

type ModalProps = {
	activeEmployee: Employee;
	setActiveEmployee: (newActiveEmployee: Employee) => void;
	toggle: () => void;
	onSave: (newTask: Employee) => void;
};

export default function Modal({
	activeEmployee,
	setActiveEmployee,
	toggle,
	onSave,
}: ModalProps) {
	const handleChange = (e: any) => {
		let { name, value } = e.target;
		// FOR CHECKBOX INPUT
		// if (e.target.type === "checkbox") {
		// 	value = e.target.checked;
		// }
		const newActiveEmployee = { ...activeEmployee, [name]: value };
		setActiveEmployee(newActiveEmployee);
	};

	return (
		<div
			className={styles.modalOverlay}
			onClick={toggle}
		>
			<div
				className={styles.modalContentContainer}
				onClick={(e: any) => {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
					return false;
				}}
			>
				<h2 className={styles.header}>Add Task Item</h2>
				<section className={styles.body}>
					<form
						action=""
						method="post"
					>
						<fieldset>
							{/* FIRST NAME */}
							<label
								htmlFor="first_name"
								className={styles.formLabel}
							>
								First Name:
								<input
									type="text"
									name="first_name"
									value={activeEmployee.first_name}
									onChange={handleChange}
								/>
							</label>
							{/* LAST NAME */}
							<label
								htmlFor="last_name"
								className={styles.formLabel}
							>
								Last Name:
								<input
									type="text"
									name="last_name"
									value={activeEmployee.last_name}
									onChange={handleChange}
								/>
							</label>
							{/* POSITION */}
							<label
								htmlFor="position"
								className={styles.formLabel}
							>
								Position:
								<input
									type="text"
									name="position"
									value={activeEmployee.position}
									onChange={handleChange}
									placeholder="CEO"
								/>
							</label>
							{/* DATE OF HIRE */}
							<label
								htmlFor="hire_date"
								className={styles.formLabel}
							>
								Date of Hire:
								<input
									type="date"
									name="hire_date"
									value={activeEmployee.hire_date}
									onChange={handleChange}
								/>
							</label>
							{/* VIEW VARIABLE */}
							{/* <label
								htmlFor="completed"
								className={styles.formLabel}
							>
								Completed:
								<input
									type="checkbox"
									name="completed"
									checked={activeEmployee.completed}
									onChange={handleChange}
								/>
							</label> */}
						</fieldset>
					</form>
				</section>
				<div className={styles.footer}>
					<button
						className={styles.btnSubmit}
						onClick={() => onSave(activeEmployee)}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
