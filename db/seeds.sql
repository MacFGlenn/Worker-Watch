USE employee_db;

INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Programming'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Sales Person', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Junior Engineer', 120000, 2),
    ('Accountant', 125000, 3),
    ('Legal Lead', 250000, 4),

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
    ('Jeff', 'Moe', 1, 'Ash Katchum'),
    ('Jake', 'Hanson', 2, 'Jeff Moe'),
    ('Ash', 'Katchum', 3, null),
    ('Jeffers', 'Tupack', 4, 'Ash Katchum'),
    ('Malia', 'Brown', 5, null),
    ('Sara', 'Mara', 6, null),
    ('Frank', 'Franklin', 7, 'Sara Mara');
