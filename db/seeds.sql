
INSERT INTO department (department_name)
VALUES  ('Finance'),
        ('Engineering'),
        ('Sales'),
        ('Legal');


INSERT INTO role (job_title, salary, department_id)
VALUES  ('Accountant', '$75,000', '1'),
        ('Account Manager', '$60,000', '1'),
        ('Software Engineer', '$88,000', '2'),
        ('Lead Engineer', '$115,000', '2'),
        ('Marketing Manager', '$95,000', '3'),
        ('Salesperson', '$50,000', '3'),
        ('Lead Lawyer', '$190,000', '4'),
        ('Lawyer', '$130,000', '4');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Victor', 'Carlesso', '1', '1'),
        ('Jodie', 'Hall', '2', '1'),
        ('Daniel', 'Reiser', '3', '4'),
        ('Sarah', 'Alba', '4', '4'),
        ('Jim', 'Smith', '5', '5'),
        ('Kevin', 'Peters', '6', '5'),
        ('Vanessa', 'Ruiz', '7', '7'),
        ('Matt', 'Salter', '8', '7');