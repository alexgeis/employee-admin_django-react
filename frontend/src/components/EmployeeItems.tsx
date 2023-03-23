import React from "react";

const styles: any = {
	employeeListItem: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		marginRight: "2px",
		cursor: "pointer",
	},
	// completeEmployee: {
	// 	backgroundColor: "green",
	// 	color: "white",
	// 	textDecoration: "line-through",
	// },
	btnContainer: {
		marginTop: "0",
		display: "flex",
		gap: "10px",
	},
	btn: {
		marginTop: "0",
		borderRadius: "10px",
	},
	btnEdit: {
		marginRight: "2px",
	},
	btnDelete: {
		backgroundColor: "red",
		color: "white",
	},
};

type EmployeeItemProps = {
	// viewCompleted: boolean;
	employeeList: Employee[];
	handleEdit: (employee: Employee) => void;
	handleDelete: (employee: Employee) => void;
};

export default function EmployeeItems({
	employeeList,
	handleEdit,
	handleDelete,
}: EmployeeItemProps): JSX.Element {
	// const filteredEmployees = employeeList.filter((employee) => employee.view === <view-status-passed-as-prop>);

	return (
		<>
			{employeeList.map((employee, i) => (
				<li
					key={employee.id}
					style={styles.employeeListItem}
				>
					<span
						// style={
						// 	viewCompleted
						// 		? { ...styles.completeTask, ...styles.title }
						// 		: styles.title
						// }
						style={styles.title}
						title={`${employee.first_name} ${employee.last_name}`}
					>
						{`${employee.first_name} ${employee.last_name}`}
					</span>
					{/* TODO: update to use grid overflow to position edit/delete btns */}
					<span style={styles.btnContainer}>
						<button
							onClick={() => handleEdit(employee)}
							style={{ ...styles.btn, ...styles.btnDelete }}
						>
							Edit
						</button>
						<button
							onClick={() => handleDelete(employee)}
							style={{ ...styles.btn, ...styles.btnDelete }}
						>
							Delete
						</button>
					</span>
				</li>
			))}
		</>
	);
}
