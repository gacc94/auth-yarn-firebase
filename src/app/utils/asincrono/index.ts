Notification.requestPermission().then((res: NotificationPermission)=> {
    return (res === 'denied') ? 'Fue denegado': 'XD';
}).then((res)=> {
    console.log(res)
})
