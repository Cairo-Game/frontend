# Рекомендации по написанию кода

Все хранится в папке src.

ВЕЗДЕ Typescript без any.

Медиа лежат в папке assets (картинки, шрифты, svg и тд в соответствующих папках).

Глобальные компоненты лежат в папке src/components.

Компоненты, использующиеся только в одном месте (страница, другой компонент) лежат в папке components текущей структуры (Пример: pages/home/components/homeItem). (ТОЖЕ САМОЕ с типами, интерфейсами, хуками и тд.).

API хранится в папке api

Все типы и css отделены от view (используем папки и файлы соответствующие им).

Стиль написания компонента:

Все с маленькой буквы

В основной директории 3 файла: Пример (separator.tsx, separator.types.ts, styles.ts)

Запуск (start) производится на dev сервере.

Билд (build) закидывает все в папку dist.

Линт проверяет все по правилам, описанным в файле .eslintrc и запускается (yarn lint).