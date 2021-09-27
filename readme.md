# Шаблон для сборки фронтенда на основе [Symfony Webpack Encore](https://symfony.com/doc/current/frontend.html)

## Предустановленно

- Bootstrap
- jQuery
- Fancybox
- Swiper

## Команды

- `yarn build` - Сборка для продакшена
- `yarn watch` - Запуск webpack с параметром --watch
- `yarn dev` - Запуск webpack-dev-server на порт 9000
- `yarn hot` - Запуск webpack-dev-server с поддержкой [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)


## VueJS

- [VueJS](https://symfony.com/doc/current/frontend/encore/vuejs.html)

## Глобальные переменные
Если необходимо обратиться к переменной BX необходимо добавить следующее.
```js
Encore.autoProvideVariables({
    BX: 'BX',
    'window.BX': 'BX'
})
```

## TODO
- Описать процесс подключения VueJS
- Протестировать полифилы и corejs
- Настроить работу watch в VM на Windows
