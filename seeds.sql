USE employees_db;
INSERT INTO department (name)
VALUES ("programming"), ("cybersecurity"), ("marketing")

INSERT INTO roles (title, salary, department_id)
VALUES ("engineer", 80000, 1), ("junior developer", 50000, 2), ("marketer", 65000, 3)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sally", "Smith", 1, null), ("John", "Smith", 2, null), ("Bob", "Johnson", 3, null)