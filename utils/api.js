import { AsyncStorage } from 'react-native';
import { Notifications, Permissions} from 'expo';
import { DECK_STORAGE_KEY } from "./_decks";

export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((result) => {
        return JSON.parse(result)

    });
}

export function getDeck(name) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((result) => {
        const data = JSON.parse(result);
        return data[name];
    });
}

export function saveDeckTitle({ deck }) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [deck]: {
            title: deck,
            questions: [],
        }
    }))
}

export function addCardToDeck({ card, deck }) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((result) => {
        const data = JSON.parse(result);
        data[deck].questions.push(card);
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    });
}


// Notification logic

export const NOTIFICATION_STORAGE_KEY = 'UdaciCards:notifications';


export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification(){
    return {
        title: "Do a quiz!",
        body: "Don't forget to do a quiz today!",
        ios:{
            sound: true,
        },
        android:{
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY)
        .then(JSON.parse)
        .then((data) =>{
            if(data === null){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted'){
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(true))
                        }
                    })
            }
        }
        )
}
