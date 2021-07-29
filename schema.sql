DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

CREATE TABLE employee_info (
    id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(50)

)
