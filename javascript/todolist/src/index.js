const data = JSON.parse(localStorage.getItem("tasks"));

const priorityColors = {
  low: "lightgreen",
  med: "gold",
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
  let projectContainer;
  function displayHome() {
    document.body.innerHTML = "";
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
    medprioButton.style.backgroundColor = priorityColors["med"];
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
    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "+";
    const selectionOrder = document.createElement("select");
    selectionOrder.id = "sortOrder";
    const optionAsc = document.createElement("option");
    optionAsc.value = "asc";
    optionAsc.textContent = "Date Asc";
    const optionDesc = document.createElement("option");
    optionDesc.value = "desc";
    optionDesc.textContent = "Date Desc";

    tasksContainerHeader.appendChild(addTaskButton);
    tasksContainerHeader.appendChild(tasksContainerHeaderTitle);
    tasksContainerHeader.appendChild(selectionOrder);
    selectionOrder.appendChild(optionDesc);
    selectionOrder.appendChild(optionAsc);
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
      selectionOrder,
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
      <p><b>Due Date: </b>${task.dueDate}</p><p><b>Description: </b>${task.description}</p>
      <p><b>Project: </b>${task.project}</p>`;

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
    const priorityOptions = ["Low", "med", "High"];
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
let {
  addTaskButton,
  todayButton,
  starredButton,
  weekButton,
  lowprioButton,
  medprioButton,
  highprioButton,
  finishedButton,
  selectionOrder,
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

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const buttonController = (() => {
  let filters = [];
  let projectButtons = [];
  let sortBy;
  function updateProjectButtons() {
    projectButtons = [];
    let projects = [];
    tasks.forEach((task) => {
      if (task.project !== "" && !projects.includes(task.project)) {
        projects.push(task.project);
      }
    });
    projectButtons = myDOM.displayProjects(projects);
  }
  updateProjectButtons();
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
  function updateListeners() {
    addTaskButton.addEventListener("click", () => {
      updateCreateReturnButtons(false, tasks);
    });
    selectionOrder.addEventListener("change", () => {
      sortBy = selectionOrder.value;
      console.log(sortBy);
      updateTaskButtons();
    });
    todayButton.addEventListener("click", () => {
      const formattedToday = new Date().toISOString().slice(0, 10);

      const todayFilter = tasks.filter(
        (task) => task.dueDate === formattedToday
      );
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
    function handlePriorityButtonClick(priority, button) {
      const filter = tasks.filter(
        (task) => task.priority.toLowerCase() === priority.toLowerCase()
      );

      if (
        !isFilterActive("low") &&
        !isFilterActive("med") &&
        !isFilterActive("high")
      ) {
        button.style.opacity = 1;
        introduceFilter(priority, filter);
      } else if (isFilterActive(priority)) {
        button.style.opacity = 0.5;
        introduceFilter(priority, filter);
      }

      console.log(filters);
    }
    lowprioButton.addEventListener("click", () =>
      handlePriorityButtonClick("low", lowprioButton)
    );
    medprioButton.addEventListener("click", () =>
      handlePriorityButtonClick("med", medprioButton)
    );
    highprioButton.addEventListener("click", () =>
      handlePriorityButtonClick("high", highprioButton)
    );
    finishedButton.addEventListener("click", () => {
      const finishedFilter = tasks.filter((task) => task.done === true);
      introduceFilter("finishedFilter", finishedFilter);
      if (isFilterActive("finishedFilter")) {
        finishedButton.style.backgroundColor = "#2980b9";
      } else {
        finishedButton.style.backgroundColor = "";
      }
    });
    let count = 0;
    projectButtons.forEach((button) => {
      button.addEventListener("click", () => {
        console.log(projectButtons);
        const projectName = button.textContent.toLowerCase();
        if (isFilterActive(projectName)) {
          count -= 1;
          button.style.backgroundColor = "";
          console.log("unpress");
          const projectFilter = tasks.filter(
            (task) => task.project.toLowerCase() === projectName
          );

          introduceFilter(projectName, projectFilter);
          console.log(filters);
          console.log(projectFilter);
        } else if (count === 0) {
          count += 1;
          button.style.backgroundColor = "#2980b9";
          console.log("press");
          const projectFilter = tasks.filter(
            (task) => task.project.toLowerCase() === projectName
          );

          introduceFilter(projectName, projectFilter);
          console.log(filters);
          console.log(projectFilter);
        }
      });
    });
  }
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
      if (verifyForm(titleInput.value, dateInput.value)) {
        if (!editMode) {
          const newTask = new Task(
            titleInput.value,
            descriptionInput.value,
            dateInput.value,
            priorityInput.value,
            projectInput.value,
            false,
            false
          );
          tasks.push(newTask);
        } else {
          tasks[index].title = titleInput.value;
          tasks[index].description = descriptionInput.value;
          tasks[index].dueDate = dateInput.value;
          tasks[index].project = projectInput.value;
          tasks[index].priority = priorityInput.value;
        }

        ({
          addTaskButton,
          todayButton,
          starredButton,
          weekButton,
          lowprioButton,
          medprioButton,
          highprioButton,
          finishedButton,
          selectionOrder,
        } = myDOM.displayHome());

        console.log(tasks);
        updateProjectButtons();
        updateTaskButtons();
        updateListeners();
      }
    });
    returnButton.addEventListener("click", () => {
      myDOM.removeAddTask();
    });
  }

  function updateTaskButtons() {
    saveTasks(tasks);
    let filteredTasks = filters.reduce((result, currentFilter) => {
      return result.filter((task) => currentFilter.filter.includes(task));
    }, tasks);
    //sort tasks by date
    filteredTasks = filteredTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      if (sortBy === "asc") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
    console.log("tasks", tasks);
    const {
      starButtons,
      editButtons,
      deleteButtons,
      doneButtons,
      moreinfoButtons,
      moreinfoDivs,
    } = myDOM.displayTasks(filteredTasks);

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
  updateTaskButtons();
  updateListeners();
})();

const verifyForm = (title, date) => {
  const isValidDate = (dateString) => {
    console.log(dateString);
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
