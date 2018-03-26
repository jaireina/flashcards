import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';
import {FLASHCARDS_NOTIFICATION_KEY} from './settings';

export function clearLocalNotifications(){
  return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATION_KEY)
    .then( Notifications.cancelAllScheduledNotificationsAsync )
}

function createNotification(){
  return {
    title: 'Do your QUIZ!',
    body: "👋 Don't forget to do your QUIZ",
    ios: {
      sound: true
    },
    android:{
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}


export function setLocalNotification(){
  AsyncStorage.getItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      
      if(data===null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then( ({status}) => {
            
            if(status==='granted'){
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date(); 
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0); 

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(FLASHCARDS_NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    })
}