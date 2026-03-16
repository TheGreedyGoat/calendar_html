const messageCallbacks = {
    'setup': switchToDate,
    'log': console.log,
    'send_daily_data': sendDataToDayView,
    'new_schedule_data': saveNewSchedule
}


const clickCallbacks = {
    'date cell': onDateClicked,
    'month scroll': addMonth,
    'add note': addNote,
    'to day view': swipeToDay,
    'to month view': swipeToMonth,
    'day scroll': addDay
}


