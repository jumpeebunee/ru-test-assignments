# Тестовое задание: frontend AppBooster
SPA application for currency conversion. An open API was used to get the current rates. <br>
The application consists of two pages: <br>

1. A converter from one currency to another. There are two inputs on this page where you can enter text in the form of 15 usd in rub and get the result..
2. A page with current exchange rates. On this page, the user sees the "fresh" exchange rates relative to the base currency — for example, if the base currency is the ruble, then the user sees that 1 USD = 63.49 RUB, and 1 EUR = 72.20

By default, the user should have a "base" currency that he can configure. The base currency is changed when the conversion is selected and stored in localstorage.

## Stack
- Vite, React, Redux, React-router,
- SCSS,
- Typescript,
- React-testing-librar;