Hooks.on("ready", () => {
    // Получаем значение из настроек модуля
    const playersIDsToHide = game.settings.get("fvtt-hide-camera", "playerUUIDs");

    // Функция для открепления и скрытия камеры указанного пользователя
    function hidePlayerCamera() {
        if (!playersIDsToHide) return; // Если имя не указано, ничего не делать

        const playersUUIDsArray = playersIDsToHide.split(',').map(name => name.trim());

        // Ищем всех пользователей
        game.users.forEach(user => {
            if (playersUUIDsArray.includes(user.uuid)) {
                // Ищем элементы видео пользователя
                const cameraElement = document.querySelector(`.camera-view[data-user="${user.id}"]`);
                if (cameraElement) {
                    // Открепляем камеру, если она не откреплена
                    const popoutButton = cameraElement.querySelector('.av-control.toggle[data-action="toggle-popout"]');
                    if (popoutButton) {
                        // Проверяем, откреплена ли камера
                        if (!cameraElement.classList.contains('popout')) {
                            popoutButton.click(); // Эмулируем клик по кнопке "отделить в окно"
                        }
                    }

                    // Применяем стиль, чтобы скрыть элемент
                    cameraElement.style.display = "none";
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
    game.settings.register("fvtt-hide-camera", "playerUUIDs", {
        name: "Players UUID's to Hide",
        hint: "Specify the UUID's of the players whose cameras should be hidden, separated by commas without space.",
        scope: "world",
        config: true,
        type: String,
        default: "",
        requiresReload: true
    });
});
