
const messageCallbacks = {
    'setup': setupPage,
    'log': console.log,
    'note object': displayTodayshNotes,
    'daily_data': onDailyDataRecieved,
    'templates loaded': onTemplatesLoaded
}


const clickCallbacks = {
    'date cell': setActiveDate
}

