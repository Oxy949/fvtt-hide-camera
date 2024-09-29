Hooks.on("ready", () => {
    // Получаем значение из настроек модуля
    const playerNameToHide = game.settings.get("fvtt-hide-camera", "playerName");

    // Функция для скрытия камеры указанного пользователя
    function hidePlayerCamera() {
        if (!playerNameToHide) return; // Если имя не указано, ничего не делать

        // Ищем всех пользователей
        game.users.forEach(user => {
        if (user.name === playerNameToHide) {
            // Ищем элементы видео пользователя
            const videoElement = document.querySelector(`[data-user="${user.id}"] camera-view`);
            if (videoElement) {
            // Применяем стиль, чтобы скрыть элемент
            videoElement.style.display = "none";
            console.log(`Камера пользователя ${user.name} скрыта.`);
            }
        }
        });
    }

    // Запускаем проверку при загрузке страницы
    hidePlayerCamera();

    // Дополнительно проверяем каждый раз, когда меняется статус пользователя
    Hooks.on("renderPlayerList", hidePlayerCamera);
});

// Регистрируем настройку модуля
Hooks.once("init", () => {
    game.settings.register("fvtt-hide-camera", "playerName", {
        name: "Player Name to Hide",
        hint: "Specify the exact name of the player whose camera should be hidden.",
        scope: "world",
        config: true,
        type: String,
        default: ""
    });
});