// Ordenar as tarefas
// Exibir próxima tarefa no display

appConfig = {
  timeExchangerConfig: {
    seconds: 0,
    pace: 0,
    lastUpdate: 'lastupdate',
    requestLink: 'http://localhost:4000/timeExchangerConfig'
  }
}

start();
const DateTime = luxon.DateTime;

async function start(){
  await loadInfo();
  const app = document.getElementById('app') ;
  const nextTaskDisplay = new NextTaskDisplay()
  const timeExchanger = new TimeExchanger();
  const addTaskForm = new AddTaskForm();
  const taskList = new TaskList();
  app.append(nextTaskDisplay, timeExchanger, addTaskForm, taskList);
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
    const datetimeMin = document.createElement('input');
    const divRecurrence = document.createElement('div');
    const selectRecurrenceTime = document.createElement('select');
    const optNoRepeat = document.createElement('option');
    const optHours = document.createElement('option');
    const optDays = document.createElement('option');
    const optWeeks = document.createElement('option');
    const optMonths = document.createElement('option');
    const optYears = document.createElement('option');
    const numberRecurrence = document.createElement('input');
    const divButtons = document.createElement('div');
    const btnClear = document.createElement('button');
    const btnAdd = document.createElement('button');
    
    divTaskNameAndDate.append(txtTaskName, datetimeMin);
    selectRecurrenceTime.append(optNoRepeat, optHours, optDays, optWeeks, optMonths, optYears);
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
      datetimeMin.classList.add('border', 'border-black');
      selectRecurrenceTime.classList.add('border', 'border-black');
      numberRecurrence.classList.add('border', 'border-black');
      divButtons.classList.add('border', 'border-red-800', 'flex', 'place-content-between');
      btnClear.classList.add('border', 'border-green-800');
      btnAdd.classList.add('border', 'border-green-800');
    }

    function addLabels(){
      titleAddTaskForm.innerHTML = 'Adicionar Tarefas';
      txtTaskName.setAttribute('placeholder', 'Nome da tarefa');
      optNoRepeat.innerHTML = 'Sem repetir';
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
      datetimeMin.setAttribute('type', 'datetime-local');
      optNoRepeat.setAttribute('value', 'norepeat');
      optHours.setAttribute('value', 'hours');
      optDays.setAttribute('value', 'days');
      optWeeks.setAttribute('value', 'weeks');
      optMonths.setAttribute('value', 'months');
      optYears.setAttribute('value', 'years');
      numberRecurrence.setAttribute('type', 'number');
    }

    function addListeners(){
      btnClear.addEventListener('click', clearaddTaskForm);
      btnAdd.addEventListener('click', () => {
        const newTaskValues = {
          taskName: txtTaskName.value,
          taskMinDate: datetimeMin. value,
          recurrenceTime: selectRecurrenceTime.value,
          recurrenceNumber: numberRecurrence.value
        }
        const newTask = new Task(newTaskValues);
        const taskList = document.getElementById('taskList');
        taskList.append(newTask);
        clearaddTaskForm();
      });
    }

    function onLoad(){

    }

    function clearaddTaskForm(){
      txtTaskName.value = '';
      datetimeMin.value = '';
      selectRecurrenceTime.value = optNoRepeat.value;
      numberRecurrence.value = null;
    }

    return container;
  }

  return addTaskForm;
}

// Task component of the task list
function Task(taskValues = {}){
  const task = createTask();
  task.classList.add('task');

  function createTask(){
    const container = document.createElement('div');
    const checkComplete = document.createElement('input');
    const btnMoveUp = document.createElement('button');
    const btnMoveDown = document.createElement('button');
    const txtTaskName = document.createElement('input');
    const datetimeMin = document.createElement('input');
    const selectRecurrenceTime = document.createElement('select');
    const optNoRepeat = document.createElement('option');
    const optHours = document.createElement('option');
    const optDays = document.createElement('option');
    const optWeeks = document.createElement('option');
    const optMonths = document.createElement('option');
    const optYears = document.createElement('option');
    const numberRecurrence = document.createElement('input');
    const btnDeleteTask = document.createElement('button');

    selectRecurrenceTime.append(optNoRepeat, optHours, optDays, optWeeks, optMonths, optYears);
    container.append(checkComplete, btnMoveUp, btnMoveDown, txtTaskName, datetimeMin, selectRecurrenceTime, numberRecurrence, btnDeleteTask);

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
      datetimeMin.classList.add('border', 'border-black');
      selectRecurrenceTime.classList.add('border', 'border-black');
      numberRecurrence.classList.add('border', 'border-black');
      btnDeleteTask.classList.add('border', 'border-black');
    }

    function addLabels(){
      btnMoveUp.innerHTML = '&uarr;';
      btnMoveDown.innerHTML = '&darr;';
      txtTaskName.setAttribute('placeholder', 'Nome da tarefa');
      optNoRepeat.innerHTML = 'Sem repetir';
      optHours.innerHTML = 'Horas';
      optDays.innerHTML = 'Dias';
      optWeeks.innerHTML = 'Semanas';
      optMonths.innerHTML = 'Meses';
      optYears.innerHTML = 'Anos';
      numberRecurrence.setAttribute('placeholder', 'Número');
      btnDeleteTask.innerHTML = '❌';
    }

    function setPropertiesOfElements(){
      checkComplete.setAttribute('type', 'checkbox');
      txtTaskName.setAttribute('type', 'text');
      datetimeMin.setAttribute('type', 'datetime-local');
      optNoRepeat.setAttribute('value', 'norepeat');
      optHours.setAttribute('value', 'hours');
      optDays.setAttribute('value', 'days');
      optWeeks.setAttribute('value', 'weeks');
      optMonths.setAttribute('value', 'months');
      optYears.setAttribute('value', 'years');
      numberRecurrence.setAttribute('type', 'number');
    }

    function addListeners(){
      btnMoveUp.addEventListener('click', function(){
        const taskDiv = this.parentElement;
        const taskList = document.getElementById('taskList').querySelectorAll('div');
        const taskPosition = Array.from(taskList).indexOf(taskDiv);
        Array.from(taskList)[taskPosition-1].before(taskDiv);
      });
      btnMoveDown.addEventListener('click', function(){
        const taskDiv = this.parentElement;
        const taskList = document.getElementById('taskList').querySelectorAll('div');
        const taskPosition = Array.from(taskList).indexOf(taskDiv);
        Array.from(taskList)[taskPosition+1].after(taskDiv);
      });
      btnDeleteTask.addEventListener('click', function() {
        this.parentElement.remove();
      });
    }

    function onLoad(){
      txtTaskName.value = taskValues.taskName;
      datetimeMin.value = taskValues.taskMinDate;
      selectRecurrenceTime.value = taskValues.recurrenceTime;
      numberRecurrence.value = taskValues.recurrenceNumber;
    }

    return container;
  }

  return task;
}

// TaskList component
function TaskList(){
  const taskList = createTaskList();
  taskList.setAttribute('id', 'taskList');
  
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
    function onLoad(){}

    return container;
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

async function saveInfo(){
  await axios.post(appConfig.timeExchangerConfig.requestLink, appConfig.timeExchangerConfig);
}