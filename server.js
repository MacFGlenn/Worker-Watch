const inquirer = require("inquirer");
const confirm = require("inquirer-confirm");
const db = require("./db/connection");

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to employee database.");

  db.query("SELECT * FROM department", (err, res) => {
    console.log(res);
    departments = res.map((depart) => ({
      name: depart.name,
      value: depart.id,
    }));
  });

  db.query("SELECT * FROM role", (err, res) => {
    roles = res.map((role) => ({
      name: role.title,
      value: role.id,
    }));
  });

  db.query("SELECT * FROM employee", (err, res) => {
    employees = res.map((employee) => ({
      first_name: employee.first_name,
      last_name: employee.last_name,
      value: employee.id,
    }));
  });
  init();
});

function init() {
  inquirer
    .prompt({
      type: "list",
      message: "Please choose an option",
      name: "mainMenu",
      choices: [
        {
          name: "View All Departments",
          value: "viewAllDepartments",
        },
        {
          name: "View All Roles",
          value: "viewAllRoles",
        },
        {
          name: "View All Employees",
          value: "viewAllEmployees",
        },
        {
          name: "Add A Department",
          value: "addDepartment",
        },
        {
          name: "Add A Role",
          value: "addRole",
        },
        {
          name: "Add An Employee",
          value: "addEmployee",
        },
        {
          name: "Update An Employee Role",
          value: "updateRole",
        },
        {
          name: "End",
          value: "end",
        },
      ],
    })
    .then((res) => {
      mainMenu(res.choices);
    });
}

function mainMenu(choice) {
  switch (choice) {
    case "viewAllDepartments":
      viewAllDepartments();
      break;
    case "viewAllRoles":
      viewAllRoles();
      break;
    case "viewAllEmployees":
      viewAllEmployees();
      break;
    case "addDepartment":
      addDepartment();
      break;
    case "addRole":
      addRole();
      break;
    case "addEmployee":
      addEmployee();
      break;
    case "updateRole":
      updateRole();
      break;
    case "end":
      end();
  }
}

function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, res) => {
    console.table(res);
    reset();
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM role", (err, res) => {
    console.table(res);
    reset();
  });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, res) => {
    console.table(res);
    reset();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the name of the department",
        name: "name",
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO DEPARTMENT SET ?",
        {
          name: res.name,
        },
        (err, res) => {
          if (err) throw err;
        }
      );
    });
  reset();
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the new role's title",
        name: "title",
      },
      {
        type: "input",
        message: "Enter the new role's salary",
        name: "salary",
      },
      {
        type: "list",
        message: "Choose the new role's department",
        name: "id",
        choices: departments,
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO role SET ?",
        {
          title: res.title,
          salary: res.salary,
          department_id: res.id,
        },
        (err, res) => {
          if (err) throw err;
        }
      );
    });
  reset();
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "firstName",
      },
      {
        type: "input",
        message: "Enter the employee's last name",
        name: "lastName",
      },
      {
        type: "list",
        message: "Select the employee's role",
        name: "role",
        choices: roles,
      },
      {
        type: "list",
        message: "Slecet the employee's manager",
        name: "manager",
        choices: employees,
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.firstName,
          last_name: res.lastName,
          role_id: res.role,
          manager_id: res.manager,
        },
        (err, res) => {
          if (err) throw err;
        }
      );
    });
  reset();
}

function updateRole() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select the employee you want to update",
        name: "employeeID",
        choices: employees,
      },
      {
        type: "list",
        message: "Select the employee's new role",
        name: "titleID",
        choices: roles,
      },
    ])
    .then((res) => {
      db.query(
        `UPDATE employee SET role_id = ${res.titleID} WHERE id =${res.employeeID}`,
        (err, res) => {
          if (err) throw err;
        }
      );
    });
  reset();
}

function reset() {
  confirm("Would you like to continue with the database?").then(
    function confirmed() {
      init();
    },
    function cancelled() {
      exit();
    }
  );
}

function exit() {
  console.log("Exiting database");
  db.end();
  process.end();
}
