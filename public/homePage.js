const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout((response) => {
    if(response.success) {location.reload();}
})}

ApiConnector.current((answer) => {
    if(answer) {ProfileWidget.showProfile(answer.data);}
});

const ratesBoard = new RatesBoard();
function getCourse() {
    ApiConnector.getStocks((answer) => {
        if(answer.success){
            ratesBoard.clearTable();
            ratesBoard.fillTable(answer.data);
        }
    })
}
getCourse();
setInterval(getCourse, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) =>{
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Ваш балас успешно пополнен.');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (answer) => {
        if(answer.success){
            ProfileWidget.showProfile(answer.data);
            moneyManager.setMessage(true, 'Ковертирование успешно выполнено.');
        } else {
            moneyManager.setMessage(false, answer.error);
        }
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод успешно выполнен.');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((answer) => {
    if(answer.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(answer.data);
        moneyManager.updateUsersList(answer.data);
    } 
})

favoritesWidget.addUserCallback = (date) =>{
    ApiConnector.addUserToFavorites(date, (response) => {
        if(response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(true, 'Новый пользователь для перевода средств успешно добавлен.');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
}

favoritesWidget.removeUserCallback = (date) => {
    ApiConnector.removeUserFromFavorites(date, (answer) => {
        if(answer.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(answer.data);
            moneyManager.setMessage(true, 'Пользователь, из списка для перевода средств успешно удален.');
            console.log(answer);
        } else {
            moneyManager.setMessage(false, answer.error);
        }
    })
}