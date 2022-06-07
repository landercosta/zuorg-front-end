// Salvar tarefas no arquivo
// Desmembrar o objeto appConfig utilizando outros objetos com semântica apropriada

appConfig = {
  timeExchangerConfig: {
    requestLink: 'http://localhost:4000/timeExchangerConfig',
    seconds: 0,
    pace: 0,
    lastUpdate: 'lastupdate',
  },
  taskManagerConfig: {    
  },
  taskList: {
  }
}

start();
const DateTime = luxon.DateTime;

async function start(){
  await loadInfo();
  appConfig.taskManagerConfig.app = document.getElementById('app') ;
  appConfig.taskManagerConfig.timeExchanger = new TimeExchanger();
  appConfig.taskManagerConfig.addTaskForm = new AddTaskForm();
  appConfig.taskManagerConfig.nextTaskDisplay = new NextTaskDisplay();
  appConfig.taskManagerConfig.taskList = new TaskList(appConfig.taskManagerConfig.nextTaskDisplay);
  app.append(appConfig.taskManagerConfig.nextTaskDisplay, appConfig.taskManagerConfig.timeExchanger, appConfig.taskManagerConfig.addTaskForm, appConfig.taskManagerConfig.taskList);
}

function NextTaskDisplay(){
  const nextTaskDisplay = createNextTaskDisplay();
  nextTaskDisplay.setAttribute('id', 'nextTaskDisplay');
  
  function createNextTaskDisplay(){
    const nextTaskH2 = document.createElement('h2');

    styleComponent();
    addLabels();
    setPropertiesOfElements();
    addListeners();  
    onLoad();
  
    function styleComponent(){
      nextTaskH2.classList.add('text-center', 'text-4xl', 'mb-4');
    }
  
    function addLabels(){
      nextTaskH2.innerHTML = 'Nenhuma tarefa na fila';
    }
  
    function setPropertiesOfElements(){
  
    }
  
    function addListeners(){
  
    }
  
    function onLoad(){
  
    }

    return nextTaskH2;
  }
  
  return nextTaskDisplay;
}

// Mini app to track time spent with different categories of activities
function TimeExchanger(){
  const timeExchanger = createTimeExchanger();
  timeExchanger.setAttribute('id', 'timeExchanger');

  const timer = setInterval(() => {
    appConfig.timeExchangerConfig.seconds += appConfig.timeExchangerConfig.pace;
    appConfig.timeExchangerConfig.lastUpdate = DateTime.now();

    const timeDisplay = timeExchanger.querySelector('h2');
    timeDisplay.innerHTML = secondsToClock(appConfig.timeExchangerConfig.seconds);
    saveInfo();
  }, 1000);

  function secondsToClock(totalSeconds){
    let negative = false;
    let clock = '';
    if(totalSeconds < 0){
      negative = true;
      clock += '-';
    }
    totalSeconds = Math.abs(totalSeconds);

    let hours = Math.floor(totalSeconds / 3600);
    if(hours < 10){ hours = '0' + hours}
    let minutes = Math.floor((totalSeconds - hours * 3600)/60);
    if(minutes < 10){ minutes = '0' + minutes}
    let seconds = Math.floor(totalSeconds - hours * 3600 - minutes * 60);
    if(seconds < 10){ seconds = '0' + seconds}

    clock += `${hours}:${minutes}:${seconds}`;
    return clock;
  }

  function createTimeExchanger(){
    const container = document.createElement('div');
    const timeDisplay = document.createElement('h2');
    const containerButtons = document.createElement('div');
    const btnFocus = document.createElement('button');
    const btnTasks = document.createElement('button');
    const btnStop = document.createElement('button');
    const btnRest = document.createElement('button');
    const btnFun = document.createElement('button');
    const buttons = [btnFocus, btnTasks, btnStop, btnRest, btnFun];
    containerButtons.append(btnFocus, btnTasks, btnStop, btnRest, btnFun);
    container.append(timeDisplay, containerButtons);
    
    styleComponent();
    addLabels();
    setPropertiesOfElements();
    addListeners();  
    onLoad();

    function styleComponent(){
      container.classList.add('flex', 'items-center', 'justify-center', 'flex-col', 'border', 'p-4');
      timeDisplay.classList.add('text-3xl');
      for(let button of buttons){
        button.classList.add('bg-sky-600', 'border', 'p-1', 'w-24', 'rounded-md', 'text-sm', 'duration-500');
      }
    }

    function setPropertiesOfElements(){
      btnFocus.pace = 2;
      btnTasks.pace = 1;
      btnStop.pace = 0;
      btnRest.pace = -1;
      btnFun.pace = -2;
    }

    function addListeners(){
      for(let button of buttons){
        button.addEventListener('click', function(event){
          event.preventDefault();
          setAllButtonsBlue();
          button.classList.add('bg-rose-600');
          appConfig.timeExchangerConfig.pace = button.pace;
          saveInfo();
        });

        function setAllButtonsBlue(){
          for(let button of buttons){
            button.classList.add('bg-sky-600');
            button.classList.remove('bg-rose-600');
          }
        }
      }
    }

    function addLabels(){
      timeDisplay.innerHTML = secondsToClock(appConfig.timeExchangerConfig.seconds);
      btnFocus.innerHTML = 'Foco';
      btnTasks.innerHTML = 'Tarefas';
      btnStop.innerHTML = 'Parar';
      btnRest.innerHTML = 'Descanso';
      btnFun.innerHTML = 'Lazer';
    }

    function onLoad(){
      switch(appConfig.timeExchangerConfig.pace){
        case 2:
          btnFocus.click();
          break;
        case 1:
          btnTasks.click();
          break;
        case 0:
          btnStop.click();
          break;
        case -1:
          btnRest.click();
          break;
        case -2:
          btnFun.click();
          break;
      }
    }

    return container;
  }

  return timeExchanger;
}

// "Form" made to add task to the list
function AddTaskForm(){
  const addTaskForm = createAddTaskForm();
  addTaskForm.setAttribute('id', 'addTaskForm');

  function createAddTaskForm(){
    const container = document.createElement('div');
    const titleAddTaskForm = document.createElement('h2');
    const divTaskNameAndDate = document.createElement('div');
    const txtTaskName = document.createElement('input');
    const txtMinDateTime = document.createElement('input');
    const divRecurrence = document.createElement('div');
    const selectRecurrenceTime = document.createElement('select');
    const optNoRepeat = document.createElement('option');
    const optMinutes = document.createElement('option');
    const optHours = document.createElement('option');
    const optDays = document.createElement('option');
    const optWeeks = document.createElement('option');
    const optMonths = document.createElement('option');
    const optYears = document.createElement('option');
    const numberRecurrence = document.createElement('input');
    const divButtons = document.createElement('div');
    const btnClear = document.createElement('button');
    const btnAdd = document.createElement('button');

    flatpickr(txtMinDateTime, {
      enableTime: true,
      dateFormat: "d-m-Y H:i",
      time_24hr: true
    });
    
    divTaskNameAndDate.append(txtTaskName, txtMinDateTime);
    selectRecurrenceTime.append(optNoRepeat, optMinutes, optHours, optDays, optWeeks, optMonths, optYears);
    divRecurrence.append(selectRecurrenceTime, numberRecurrence)
    divButtons.append(btnClear, btnAdd);
    container.append(titleAddTaskForm, divTaskNameAndDate, divRecurrence, divButtons);

    styleComponent();
    addLabels();
    setPropertiesOfElements();
    addListeners();  
    onLoad();

    function styleComponent(){
      container.classList.add('border', 'border-blue-800', 'p-8', 'mt-12');
      titleAddTaskForm.classList.add('text-center', 'text-2xl', 'mb-4');
      txtTaskName.classList.add('border', 'border-black');
      txtMinDateTime.classList.add('border', 'border-black');
      selectRecurrenceTime.classList.add('border', 'border-black');
      numberRecurrence.classList.add('border', 'border-black');
      divButtons.classList.add('border', 'border-red-800', 'flex', 'place-content-between');
      btnClear.classList.add('border', 'border-green-800');
      btnAdd.classList.add('border', 'border-green-800');
    }

    function addLabels(){
      titleAddTaskForm.innerHTML = 'Adicionar Tarefas';
      txtTaskName.setAttribute('placeholder', 'Nome da tarefa');
      txtMinDateTime.setAttribute('placeholder', 'Data mínima');
      optNoRepeat.innerHTML = 'Sem repetir';
      optMinutes.innerHTML = 'Minutos';
      optHours.innerHTML = 'Horas';
      optDays.innerHTML = 'Dias';
      optWeeks.innerHTML = 'Semanas';
      optMonths.innerHTML = 'Meses';
      optYears.innerHTML = 'Anos';
      numberRecurrence.setAttribute('placeholder', 'Número');
      btnClear.innerHTML = 'Apagar';
      btnAdd.innerHTML = 'Adicionar';
    }

    function setPropertiesOfElements(){
      txtTaskName.setAttribute('type', 'text');
      txtMinDateTime.setAttribute('type', 'text');
      optNoRepeat.setAttribute('value', 'norepeat');
      optMinutes.setAttribute('value', 'minutes');
      optHours.setAttribute('value', 'hours');
      optDays.setAttribute('value', 'days');
      optWeeks.setAttribute('value', 'weeks');
      optMonths.setAttribute('value', 'months');
      optYears.setAttribute('value', 'years');
      numberRecurrence.setAttribute('type', 'number');
    }

    function addListeners(){
      btnClear.addEventListener('click', clearAddTaskForm);
      btnAdd.addEventListener('click', () => {
        const newTaskValues = {
          taskName: txtTaskName.value,
          taskMinDate: txtMinDateTime.value,
          recurrenceTime: selectRecurrenceTime.value,
          recurrenceNumber: numberRecurrence.value
        }
        addTaskToTaskList(newTaskValues);
        clearAddTaskForm();
      });
    }

    function onLoad(){

    }

    function clearAddTaskForm(){
      txtTaskName.value = '';
      txtMinDateTime.value = '';
      selectRecurrenceTime.value = optNoRepeat.value;
      numberRecurrence.value = null;
    }

    return container;
  }

  return addTaskForm;
}

// Task component of the task list
function Task(taskValues){
  const task = createTask();
  task.values = taskValues;
    // TaskValues items inside of object
    // taskName: txtTaskName.value,
    // taskMinDate: txtMinDateTime.value,
    // recurrenceTime: selectRecurrenceTime.value,
    // recurrenceNumber: numberRecurrence.value
  task.classList.add('task');

  function createTask(){
    const container = document.createElement('div');
    const checkComplete = document.createElement('input');
    const btnMoveUp = document.createElement('button');
    const btnMoveDown = document.createElement('button');
    const txtTaskName = document.createElement('input');
    const txtMinDateTime = document.createElement('input');
    const cleanMinDateTime = document.createElement('button');
    const selectRecurrenceTime = document.createElement('select');
    const optNoRepeat = document.createElement('option');
    const optMinutes = document.createElement('option');
    const optHours = document.createElement('option');
    const optDays = document.createElement('option');
    const optWeeks = document.createElement('option');
    const optMonths = document.createElement('option');
    const optYears = document.createElement('option');
    const numberRecurrence = document.createElement('input');
    const btnDeleteTask = document.createElement('button');

    flatpickr(txtMinDateTime, {
      enableTime: true,
      dateFormat: "d-m-Y H:i",
      time_24hr: true
    });

    selectRecurrenceTime.append(optNoRepeat, optMinutes, optHours, optDays, optWeeks, optMonths, optYears);
    container.append(checkComplete, btnMoveUp, btnMoveDown, txtTaskName, txtMinDateTime, cleanMinDateTime, selectRecurrenceTime, numberRecurrence, btnDeleteTask);

    styleComponent();
    addLabels();
    setPropertiesOfElements();
    addListeners();
    onLoad();

    function styleComponent(){
      container.classList.add('border');
      checkComplete.classList.add();
      btnMoveUp.classList.add('border', 'border-black');
      btnMoveDown.classList.add('border', 'border-black');
      txtTaskName.classList.add('border', 'border-black');
      txtMinDateTime.classList.add('border', 'border-black');
      cleanMinDateTime.classList.add('border', 'border-black');
      selectRecurrenceTime.classList.add('border', 'border-black');
      numberRecurrence.classList.add('border', 'border-black');
      btnDeleteTask.classList.add('border', 'border-black');
    }

    function addLabels(){
      btnMoveUp.innerHTML = '&uarr;';
      btnMoveDown.innerHTML = '&darr;';
      txtTaskName.setAttribute('placeholder', 'Nome da tarefa');
      cleanMinDateTime.innerHTML = '❌';
      optNoRepeat.innerHTML = 'Sem repetir';
      optMinutes.innerHTML = 'Minutos';
      optHours.innerHTML = 'Horas';
      optDays.innerHTML = 'Dias';
      optWeeks.innerHTML = 'Semanas';
      optMonths.innerHTML = 'Meses';
      optYears.innerHTML = 'Anos';
      numberRecurrence.setAttribute('placeholder', 'Número');
      btnDeleteTask.innerHTML = '🗑️';
    }

    function setPropertiesOfElements(){
      checkComplete.setAttribute('type', 'checkbox');
      txtTaskName.setAttribute('type', 'text');
      txtMinDateTime.setAttribute('type', 'text');
      optNoRepeat.setAttribute('value', 'norepeat');
      optMinutes.setAttribute('value', 'minutes');
      optHours.setAttribute('value', 'hours');
      optDays.setAttribute('value', 'days');
      optWeeks.setAttribute('value', 'weeks');
      optMonths.setAttribute('value', 'months');
      optYears.setAttribute('value', 'years');
      numberRecurrence.setAttribute('type', 'number');
    }

    function addListeners(){
      checkComplete.addEventListener('click', function(){
        appConfig.taskManagerConfig.taskList.append(this.parentElement);
        this.checked = false;
        appConfig.taskManagerConfig.taskList.displayTask();
        appConfig.taskManagerConfig.taskList.chooseNextTask();
        const taskDateLuxon = dateFlatpickrToLuxon(task.values.taskMinDate);
        switch(selectRecurrenceTime.value){
          case 'norepeat':
            break;
          case 'minutes':
            task.values.taskMinDate = dateLuxonToFlatpickr(taskDateLuxon.plus({minutes: task.values.recurrenceNumber}));
            break;
          case 'hours':
            task.values.taskMinDate = dateLuxonToFlatpickr(taskDateLuxon.plus({hours: task.values.recurrenceNumber}));
            break;
          case 'days':
            task.values.taskMinDate = dateLuxonToFlatpickr(taskDateLuxon.plus({days: task.values.recurrenceNumber}));
            break;
          case 'weeks':
            task.values.taskMinDate = dateLuxonToFlatpickr(taskDateLuxon.plus({weeks: task.values.recurrenceNumber}));
            break;
          case 'months':
            task.values.taskMinDate = dateLuxonToFlatpickr(taskDateLuxon.plus({months: task.values.recurrenceNumber}));
            break;
          case 'years':
            task.values.taskMinDate = dateLuxonToFlatpickr(taskDateLuxon.plus({years: task.values.recurrenceNumber}));
            break;
        }
        txtMinDateTime.value = task.values.taskMinDate;
        saveInfoTasks();
      });
      btnMoveUp.addEventListener('click', function(){
        const taskDiv = this.parentElement;
        const taskList = document.getElementById('taskList').querySelectorAll('div');
        const taskPosition = Array.from(taskList).indexOf(taskDiv);
        if(taskPosition > 0){
          Array.from(taskList)[taskPosition-1].before(taskDiv);
        }
        appConfig.taskManagerConfig.taskList.displayTask();
        saveInfoTasks();
      });
      btnMoveDown.addEventListener('click', function(){
        const taskDiv = this.parentElement;
        const taskList = document.getElementById('taskList').querySelectorAll('div');
        const taskPosition = Array.from(taskList).indexOf(taskDiv);
        Array.from(taskList)[taskPosition+1].after(taskDiv);
        appConfig.taskManagerConfig.taskList.displayTask();
        saveInfoTasks();
      });
      txtTaskName.addEventListener('keyup', function(){
        this.parentElement.values.taskName = this.value;
        saveInfoTasks();
      });
      txtMinDateTime.addEventListener('change', function(){
        this.parentElement.values.taskMinDate = this.value;
        saveInfoTasks();
      });
      cleanMinDateTime.addEventListener('click', function(){
        txtMinDateTime.value = null;
        task.values.taskMinDate = null;
        saveInfoTasks();
      });
      selectRecurrenceTime.addEventListener('change', function(){
        this.parentElement.values.recurrenceTime = this.value;
        saveInfoTasks();
      });
      numberRecurrence.addEventListener('change', function(){
        this.parentElement.values.recurrenceNumber = this.value;
        saveInfoTasks();
      });
      numberRecurrence.addEventListener('keyup', function(){
        this.parentElement.values.recurrenceNumber = this.value;
        saveInfoTasks();
      });
      btnDeleteTask.addEventListener('click', function() {
        this.parentElement.remove();
        appConfig.taskManagerConfig.taskList.displayTask();
        saveInfoTasks();
      });
    }

    function onLoad(){
      txtTaskName.value = taskValues.taskName;
      txtMinDateTime.value = taskValues.taskMinDate;
      selectRecurrenceTime.value = taskValues.recurrenceTime;
      numberRecurrence.value = taskValues.recurrenceNumber;
    }

    return container;
  }

  return task;
}

// TaskList component
function TaskList(nextTaskDisplay){
  const taskList = createTaskList();
  taskList.setAttribute('id', 'taskList');
  taskList.displayTask = displayTask;
  taskList.chooseNextTask = chooseNextTask;

  function createTaskList(){
    const container = document.createElement('div');
    const titleTaskList = document.createElement('h2');

    container.append(titleTaskList);

    styleComponent();
    addLabels();
    setPropertiesOfElements();
    addListeners();  
    onLoad();

    function styleComponent(){
      container.classList.add('border', 'border-blue-800', 'p-8', 'mt-12');
      titleTaskList.classList.add('text-center', 'text-2xl', 'mb-4');
    }

    function addLabels(){
      titleTaskList.innerHTML = 'Lista de Tarefas';
    }
    function setPropertiesOfElements(){}
    function addListeners(){}
    function onLoad(){
      loadInfoTasks();
    }

    return container;
  }

  function displayTask(){
    const nextTask = taskList.querySelectorAll('div')[0];
    const nextTaskName = nextTask ? nextTask.values.taskName : 'Nenhuma tarefa na fila';
    nextTaskDisplay.innerHTML = nextTaskName;
  }

  function chooseNextTask(){
    const tasks = appConfig.taskManagerConfig.taskList.querySelectorAll('div');
    for(task of tasks){
      const taskMinDate = DateTime.fromFormat(task.values.taskMinDate, 'dd-MM-yyyy HH:mm');
      const now = DateTime.now();
      if(taskMinDate < now || !task.values.taskMinDate){
        Array.from(tasks)[0].before(task);
        return;
      }
    }
    // Se não achar nenhuma tarefa, adiciona uma tarefa para a posição 1 chamada "Tarefa de espera. Todas as tarefas da lista estão indisponíveis."
    // Essa nova tarefa verifica a cada minuto se existe uma tarefa disponível
  }

  return taskList;
}

async function loadInfo(){
  const response = await axios.get('http://localhost:4000/timeExchangerConfig');

  const diffTimeNowAndResponse = DateTime.now().diff(DateTime.fromISO(response.data.lastUpdate), 'seconds');
  const diffTimeSeconds = diffTimeNowAndResponse.values.seconds;
  const totalSecondsToAdd = diffTimeSeconds * response.data.pace;

  appConfig.timeExchangerConfig = response.data;
  appConfig.timeExchangerConfig.seconds += Math.floor(totalSecondsToAdd);
}

async function loadInfoTasks(){
  const response = await axios.get('http://localhost:4000/taskList');
  
  appConfig.taskList = response.data;
  const tasks = appConfig.taskList;
  for(task of Object.values(tasks)){
    addTaskToTaskList(task.values);
  }
}

async function saveInfo(){
  await axios.post(appConfig.timeExchangerConfig.requestLink, appConfig.timeExchangerConfig);
}

async function saveInfoTasks(){
  const tasks = document.getElementById('taskList').querySelectorAll('div');
  appConfig.taskList = tasks;
  await axios.post('http://localhost:4000/taskList', appConfig.taskList);
}

function dateLuxonToFlatpickr(dateLuxon){
  return dateLuxon.toFormat("dd'-'LL'-'yyyy HH':'mm");
}

function dateFlatpickrToLuxon(dateFlatpickr){
  return DateTime.fromFormat(dateFlatpickr, 'dd-MM-yyyy HH:mm');
}

function addTaskToTaskList(taskValues){
  const newTask = new Task(taskValues);
  const taskList = document.getElementById('taskList');
  taskList.append(newTask);
  taskList.displayTask();
  saveInfoTasks(); 
}