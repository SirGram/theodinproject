const data = JSON.parse(localStorage.getItem("tasks"));

dummyData =[
    {},{},{
        
    }
]

const priorityColors = {
  low: "lightgreen",
  medium: "gold",
  high: "tomato",
};
class Task {
  constructor(title, description, dueDate, priority, project, star, done) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.star = star;
    this.done = done;
  }
}

const DOM = () => {
  let tasksContainer;
  let taskContainer;
  let addTaskButton;
  let projectContainer;
  function displayHome() {
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "TODO Manager";
    header.appendChild(title);
    const main = document.createElement("main");
    //left menu
    const leftNav = document.createElement("section");
    leftNav.classList = "left-nav";

    const filters = document.createElement("div");
    filters.classList = "filters";
    const projects = document.createElement("div");
    projects.classList = "projects";

    const leftNavtitle1 = document.createElement("h3");
    leftNavtitle1.textContent = "Filters";
    const leftNavtitle2 = document.createElement("h3");
    leftNavtitle2.textContent = "Projects";
    const todayButton = document.createElement("button");
    todayButton.textContent = "Today";

    const weekButton = document.createElement("button");
    weekButton.textContent = "This Week";
    const priorityButtons = document.createElement("div");
    priorityButtons.classList = "priority-buttons";
    const lowprioButton = document.createElement("button");
    const medprioButton = document.createElement("button");
    const highprioButton = document.createElement("button");
    lowprioButton.style.backgroundColor = priorityColors["low"];
    medprioButton.style.backgroundColor = priorityColors["medium"];
    highprioButton.style.backgroundColor = priorityColors["high"];
    priorityButtons.appendChild(lowprioButton);
    priorityButtons.appendChild(medprioButton);
    priorityButtons.appendChild(highprioButton);
    const starredButton = document.createElement("button");
    starredButton.innerHTML = '<i class="fas fa-star"></i>';
    const finishedButton = document.createElement("button");
    finishedButton.innerHTML = '<i class="fas fa-check"></i>';
    projectContainer = document.createElement("div");
    projectContainer.classList = "project-container";

    filters.appendChild(leftNavtitle1);
    filters.appendChild(todayButton);
    filters.appendChild(weekButton);
    filters.appendChild(starredButton);
    filters.appendChild(finishedButton);
    filters.appendChild(priorityButtons);
    projects.appendChild(leftNavtitle2);

    projects.appendChild(projectContainer);
    leftNav.appendChild(filters);
    leftNav.appendChild(projects);
    //task menu
    tasksContainer = document.createElement("section");
    tasksContainer.classList = "tasks-container";
    const tasksContainerHeader = document.createElement("div");
    const tasksContainerHeaderTitle = document.createElement("h1");
    tasksContainerHeaderTitle.textContent = "Tasks";
    addTaskButton = document.createElement("button");
    addTaskButton.textContent = "+";

    tasksContainerHeader.appendChild(addTaskButton);
    tasksContainerHeader.appendChild(tasksContainerHeaderTitle);
    tasksContainerHeader.classList = "task-container-header";
    taskContainer = document.createElement("div");
    taskContainer.classList = "task-container";
    tasksContainer.appendChild(tasksContainerHeader);
    tasksContainer.appendChild(taskContainer);
    main.appendChild(leftNav);
    main.appendChild(tasksContainer);

    const footer = document.createElement("footer");
    footer.innerHTML = `<p>
    
    <a href="https://github.com/SirGram" target="_blank">SirGram</a> 2024
  </p>`;

    document.body.appendChild(header);
    document.body.appendChild(main);
    document.body.appendChild(footer);
    return {
      addTaskButton,
      todayButton,
      starredButton,
      weekButton,
      lowprioButton,
      medprioButton,
      highprioButton,
      finishedButton,
    };
  }
  function displayTasks(taskList) {
    let starButtons = [];
    let editButtons = [];
    let deleteButtons = [];
    let doneButtons = [];
    let moreinfoButtons = [];
    let moreinfoDivs = [];

    taskContainer.innerHTML = "";
    taskList.forEach((task) => {
      const taskDivContainer = document.createElement("div");
      taskDivContainer.classList = "task-and-buttons";
      const taskDiv = document.createElement("div");
      taskDiv.classList = "main-info";

      const starButton = document.createElement("button");
      starButton.classList = "star-button";
      if (task.star) {
        starButton.classList.add("checked");
      } else {
        starButton.classList.remove("checked");
      }
      starButton.innerHTML = '<i class="fas fa-star"></i>';

      const moreinfoButton = document.createElement("button");
      moreinfoButton.classList = "more-button";
      moreinfoButton.innerHTML = '<i class="fas fa-arrow-right"></i>';

      const moreinfoDiv = document.createElement("div");
      moreinfoDiv.classList = "task-description";
      const moreinfoDivLeft = document.createElement("div");
      const moreinfoDivRight = document.createElement("div");

      moreinfoDivRight.classList = "edit-delete";
      moreinfoDivLeft.innerHTML = `
      <p><b>Due Date: </b>${task.dueDate}</p><p><b>Description: </b>${task.description}</p>`;

      const taskSubDiv1 = document.createElement("p");
      taskSubDiv1.classList = "task-title";
      taskSubDiv1.innerHTML = ` ${task.title} `;

      const editButton = document.createElement("button");
      editButton.classList = "edit-button";
      editButton.innerHTML = '<i class="fas fa-edit"></i>';
      if (task.done) {
        taskSubDiv1.classList.add("crossed");
      } else {
        taskSubDiv1.classList.remove("crossed");

        taskDiv.style.backgroundColor =
          priorityColors[task.priority.toLowerCase()];
      }

      const deleteButton = document.createElement("button");
      deleteButton.classList = "delete-button";
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

      const taskLeftDiv = document.createElement("div");
      taskLeftDiv.classList = "task-left";
      taskLeftDiv.appendChild(moreinfoButton);
      taskLeftDiv.appendChild(taskSubDiv1);

      const taskRightDiv = document.createElement("div");
      taskRightDiv.classList = "task-right";
      taskRightDiv.appendChild(starButton);
      moreinfoDivRight.appendChild(editButton);
      moreinfoDivRight.appendChild(deleteButton);
      moreinfoDiv.appendChild(moreinfoDivLeft);
      moreinfoDiv.appendChild(moreinfoDivRight);

      taskDiv.appendChild(taskLeftDiv);
      taskDiv.appendChild(taskRightDiv);

      taskDivContainer.appendChild(taskDiv);
      taskDivContainer.appendChild(moreinfoDiv);
      taskContainer.appendChild(taskDivContainer);

      starButtons.push(starButton);
      editButtons.push(editButton);
      deleteButtons.push(deleteButton);
      doneButtons.push(taskSubDiv1);
      moreinfoButtons.push(moreinfoButton);
      moreinfoDivs.push(moreinfoDiv);
    });

    return {
      starButtons,
      editButtons,
      deleteButtons,
      doneButtons,
      moreinfoButtons,
      moreinfoDivs,
    };
  }
  function displayProjects(projectList) {
    let projectButtons = [];
    projectContainer.innerHTML = "";
    projectList.forEach((project) => {
      const projectButton = document.createElement("button");
      projectButton.textContent = project;
      projectContainer.appendChild(projectButton);
      projectButtons.push(projectButton);
    });
    return projectButtons;
  }
  function displayAddTask(editMode, tasks, index) {
    const addTaskMenu = document.createElement("div");
    addTaskMenu.classList.add("add-task-menu");
    addTaskMenu.classList.add("visible");

    const addTaskMenuTop = document.createElement("div");
    addTaskMenuTop.classList.add("add-task-menu-top");
    const addTaskMenuLeft = document.createElement("div");

    addTaskMenuLeft.classList.add("add-task-menu-left");
    const addTaskMenuRight = document.createElement("div");

    addTaskMenuRight.classList.add("add-task-menu-right");
    const titleHeading = document.createElement("h1");
    titleHeading.textContent = "Add new task";
    addTaskMenu.appendChild(titleHeading);

    const titleText = document.createElement("h4");
    titleText.textContent = "Title";
    const descriptionText = document.createElement("h4");
    descriptionText.textContent = "Description";
    const dateText = document.createElement("h4");
    dateText.textContent = "Date";
    const projectText = document.createElement("h4");
    projectText.textContent = "Project";
    const priorityText = document.createElement("h4");
    priorityText.textContent = "Priority";

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Task Title");

    addTaskMenuLeft.appendChild(titleText);
    addTaskMenuLeft.appendChild(titleInput);

    const descriptionInput = document.createElement("textarea");
    descriptionInput.setAttribute("type", "text");
    descriptionInput.setAttribute("placeholder", "Task Description");

    addTaskMenuLeft.appendChild(descriptionText);
    addTaskMenuLeft.appendChild(descriptionInput);

    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");

    addTaskMenuRight.appendChild(dateText);
    addTaskMenuRight.appendChild(dateInput);

    const projectInput = document.createElement("input");
    projectInput.setAttribute("type", "text");
    projectInput.setAttribute("placeholder", "Task Project");

    addTaskMenuRight.appendChild(projectText);
    addTaskMenuRight.appendChild(projectInput);

    const priorityInput = document.createElement("select");
    const priorityOptions = ["Low", "Medium", "High"];
    priorityOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.text = option;
      priorityInput.appendChild(optionElement);
    });

    addTaskMenuRight.appendChild(priorityText);
    addTaskMenuRight.appendChild(priorityInput);

    const addTaskMenuButtons = document.createElement("div");
    addTaskMenuButtons.classList = "add-task-buttons";
    const createButton = document.createElement("button");
    createButton.textContent = "Create";

    const returnButton = document.createElement("button");
    returnButton.textContent = "Return";
    addTaskMenuButtons.appendChild(returnButton);
    addTaskMenuButtons.appendChild(createButton);

    addTaskMenuTop.appendChild(addTaskMenuLeft);
    addTaskMenuTop.appendChild(addTaskMenuRight);
    addTaskMenu.appendChild(addTaskMenuTop);
    addTaskMenu.appendChild(addTaskMenuButtons);

    document.body.appendChild(addTaskMenu);
    //Edit task
    if (editMode) {
      titleHeading.textContent = "Edit task";
      createButton.textContent = "Change";
      console.log(tasks[index]);
      titleInput.value = tasks[index].title;
      descriptionInput.value = tasks[index].description;
      dateInput.value = tasks[index].dueDate;
      projectInput.value = tasks[index].project;
      priorityInput.value = tasks[index].priority;
    }
    return {
      createButton,
      returnButton,
      titleInput,
      descriptionInput,
      dateInput,
      projectInput,
      priorityInput,
    };
  }
  function removeAddTask() {
    const addTaskMenu = document.querySelector(".add-task-menu");
    document.body.removeChild(addTaskMenu);
  }

  return {
    displayHome,
    displayTasks,
    displayAddTask,
    removeAddTask,
    displayProjects,
  };
};

const myDOM = DOM();
const {
  addTaskButton,
  todayButton,
  starredButton,
  weekButton,
  lowprioButton,
  medprioButton,
  highprioButton,
  finishedButton,
} = myDOM.displayHome();

let tasks = [];
if (data) {
  data.forEach((task) => {
    const existingTask = new Task(
      task.title,
      task.description,
      task.dueDate,
      task.priority,
      task.project,
      task.star,
      task.done
    );
    tasks.push(existingTask);
  });
}
//sort tasks by date
tasks.sort((a, b) => {
  const dateA = new Date(a.dueDate);
  const dateB = new Date(b.dueDate);
  return dateB - dateA;
});
console.log("tasks", tasks);

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const buttonController = (() => {
  let filters = [];
  let projectButtons = [];

  addTaskButton.addEventListener("click", () => {
    updateCreateReturnButtons(false, tasks);
  });
  //filters
  function isFilterActive(name) {
    const existingFilterIndex = filters.findIndex((f) => {
      return f.name === name;
    });
    return existingFilterIndex !== -1;
  }
  function introduceFilter(name, filter) {
    const existingFilterIndex = filters.findIndex((f) => f.name === name);
    if (existingFilterIndex === -1) {
      filters.push({ name, filter });
    } else {
      filters.splice(existingFilterIndex, 1);
    }
    updateTaskButtons();
  }

  todayButton.addEventListener("click", () => {
    const formattedToday = new Date().toISOString().slice(0, 10);

    const todayFilter = tasks.filter((task) => task.dueDate === formattedToday);
    introduceFilter("todayFilter", todayFilter);
    if (isFilterActive("todayFilter")) {
      console.log("on");
      todayButton.style.backgroundColor = "#2980b9";
    } else {
      console.log("off");
      todayButton.style.backgroundColor = "";
    }
  });
  weekButton.addEventListener("click", () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
    );
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() - today.getDay() + 7);
    const weekFilter = tasks.filter((task) => {
      const taskDueDate = new Date(task.dueDate);
      return taskDueDate >= startOfWeek && taskDueDate <= endOfWeek;
    });
    introduceFilter("weekFilter", weekFilter);
    if (isFilterActive("weekFilter")) {
      weekButton.style.backgroundColor = "#2980b9";
    } else {
      weekButton.style.backgroundColor = "";
    }
  });
  starredButton.addEventListener("click", () => {
    const starFilter = tasks.filter((task) => task.star === true);
    introduceFilter("starFilter", starFilter);
    if (isFilterActive("starFilter")) {
      starredButton.style.backgroundColor = "#2980b9";
    } else {
      starredButton.style.backgroundColor = "";
    }
  });
  lowprioButton.addEventListener("click", () => {
    const lowFilter = tasks.filter(
      (task) => task.priority.toLowerCase() === "low"
    );
    introduceFilter("lowFilter", lowFilter);
    if (isFilterActive("lowFilter")) {
      lowprioButton.style.backgroundColor = "#2980b9";
    } else {
      lowprioButton.style.backgroundColor = "";
    }
  });
  medprioButton.addEventListener("click", () => {
    const medFilter = tasks.filter(
      (task) => task.priority.toLowerCase() === "medium"
    );
    introduceFilter("medFilter", medFilter);
    if (isFilterActive("medFilter")) {
      medprioButton.style.backgroundColor = "#2980b9";
    } else {
      medprioButton.style.backgroundColor = "";
    }
  });
  highprioButton.addEventListener("click", () => {
    const highFilter = tasks.filter(
      (task) => task.priority.toLowerCase() === "high"
    );
    introduceFilter("highFilter", highFilter);
    if (isFilterActive("highFilter")) {
      highprioButton.style.backgroundColor = "#2980b9";
    } else {
      highprioButton.style.backgroundColor = "";
    }
  });
  finishedButton.addEventListener("click", () => {
    const finishedFilter = tasks.filter((task) => task.done === true);
    introduceFilter("finishedFilter", finishedFilter);
    if (isFilterActive("finishedFilter")) {
      finishedButton.style.backgroundColor = "#2980b9";
    } else {
      finishedButton.style.backgroundColor = "";
    }
  });

  function updateCreateReturnButtons(editMode, tasks, index) {
    const {
      createButton,
      returnButton,
      titleInput,
      descriptionInput,
      dateInput,
      projectInput,
      priorityInput,
    } = myDOM.displayAddTask(editMode, tasks, index);
    createButton.addEventListener("click", () => {
      if (
        verifyForm(
          titleInput.value,
          descriptionInput.value,
          dateInput.value,
          projectInput.value,
          priorityInput.value
        )
      ) {
        if (!editMode) {
          const newTask = new Task(
            titleInput.value,
            descriptionInput.value,
            dateInput.value,
            projectInput.value,
            priorityInput.value
          );
          tasks.push(newTask);
        } else {
          tasks[index].title = titleInput.value;
          tasks[index].description = descriptionInput.value;
          tasks[index].dueDate = dateInput.value;
          tasks[index].project = projectInput.value;
          tasks[index].priority = priorityInput.value;
        }

        console.log(tasks);
        updateProjectButtons();
        updateTaskButtons();
        myDOM.removeAddTask();
      }
    });
    returnButton.addEventListener("click", () => {
      myDOM.removeAddTask();
    });
  }
  function updateProjectButtons() {
    projectButtons = [];
    let projects = [];
    tasks.forEach((task) => {
      if (!projects.includes(task.project)) {
        projects.push(task.project);
      }
    });
    projectButtons = myDOM.displayProjects(projects);
  }
  function updateTaskButtons() {
    saveTasks(tasks);
    const filteredTasks = filters.reduce((result, currentFilter) => {
      return result.filter((task) => currentFilter.filter.includes(task));
    }, tasks);
    const {
      starButtons,
      editButtons,
      deleteButtons,
      doneButtons,
      moreinfoButtons,
      moreinfoDivs,
    } = myDOM.displayTasks(filteredTasks);

    projectButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const projectName = button.textContent.toLowerCase();
        if (isFilterActive(projectName)) {
          button.style.backgroundColor = "";
          console.log("pressed");
        } else {
          button.style.backgroundColor = "#2980b9";
          console.log("unpress");
        }
        const projectFilter = tasks.filter((task) => {
          return task.project.toLowerCase() === projectName;
        });

        introduceFilter(projectName, projectFilter);
      });
    });

    starButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const starValue = !tasks[index].star;
        tasks[index].star = starValue;
        console.log(starValue);
        updateTaskButtons();
      });
    });
    deleteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        console.log(index);
        tasks.splice(index, 1);

        updateProjectButtons();
        updateTaskButtons();
      });
    });
    editButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        updateCreateReturnButtons(true, tasks, index);
      });
    });
    doneButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const doneValue = !tasks[index].done;
        tasks[index].done = doneValue;
        console.log(doneValue);
        updateTaskButtons();
      });
    });
    moreinfoButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const moreinfoDiv = moreinfoDivs[index];
        moreinfoDiv.style.display =
          moreinfoDiv.style.display === "flex" ? "none" : "flex";
        button.style.transform =
          button.style.transform === "rotate(90deg)" ? "" : "rotate(90deg)";
      });
    });
  }

  updateProjectButtons();
  updateTaskButtons();
})();

const verifyForm = (title, description, date, project, priority) => {
  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };
  if (title.length < 3) {
    window.alert("title is too short");
    return false;
  } else if (!isValidDate(date)) {
    console.log(date);
    window.alert("invalid date");
    return false;
  }
  return true;
};
