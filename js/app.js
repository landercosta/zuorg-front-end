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
  const  app = document.getElementById('app') ;
  const timeExchanger = new TimeExchanger();
  app.append(timeExchanger);
}

// Mini app to track time spent with different categories of activities
function TimeExchanger(){
  const timeExchanger = createComponent();

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

  function createComponent(){
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
    innerHTML();
    setPropertiesOfElements();
    addListeners();  
    onLoad();  

    function styleComponent(){
      container.classList.add('flex', 'items-center', 'justify-center', 'flex-col', 'border', 'p-4');
      timeDisplay.classList.add('text-4xl');
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

    function innerHTML(){
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