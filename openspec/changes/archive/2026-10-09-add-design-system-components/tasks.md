## 1. Подготовка по Figma и текущей UI-базе

- [x] 1.1 Изучить Figma-фрейм `1970-5263` и выписать для каждого компонента варианты, состояния, размеры, spacing, цвета и примеры контента.
- [x] 1.2 Сопоставить макеты с текущими компонентами `frontend/components/ui` и определить, какие части переиспользуют `AppButton`, `AppTextField`, `SegmentedTabs` и `theme.ts`.
- [x] 1.3 Зафиксировать MUI primitives для каждого компонента: Stepper, TextField/InputAdornment, ButtonBase/ToggleButton, Select/Autocomplete, Switch/FormControlLabel, Chip/Autocomplete.
- [x] 1.4 Определить публичные props для динамических hex-цветов и URL-изображений, не добавляя обязательные локальные image imports.

## 2. Общие UI-утилиты и theme-интеграция

- [x] 2.1 Добавить общую утилиту или локальный helper для безопасной проверки hex-цветов с fallback на дефолтные theme tokens.
- [x] 2.2 Обновить `frontend/lib/theme.ts` только для статичных проектных токенов и MUI variants, которые повторяются между компонентами.
- [x] 2.3 Проверить, что динамические цвета компонентов передаются через явные props вроде `colorHex`, `backgroundHex`, `selectedColorHex` или `accentColorHex`.
- [x] 2.4 Проверить, что компоненты с изображениями принимают URL props вроде `imageUrl`, `logoUrl` или `iconUrl` и имеют fallback для отсутствующего изображения.

## 3. Button и input-компоненты

- [x] 3.1 Расширить существующий `AppButton` новым стилем или variant по Figma, сохранив совместимость с MUI `ButtonProps`.
- [x] 3.2 Обновить MUI `MuiButton` theme variant/style overrides при необходимости, не создавая отдельный конкурирующий компонент `Button`.
- [x] 3.3 Реализовать Search input поверх `AppTextField` или MUI `TextField` с `InputAdornment`, состояниями из Figma и управляемым значением.
- [x] 3.4 Реализовать Grade select поверх MUI `Select`/`MenuItem` или `Autocomplete`, если Figma требует поиск или подсказки.

## 4. Компоненты выбора и переключения

- [x] 4.1 Реализовать Stepper поверх MUI `Stepper`/`Step`/`StepLabel` или MUI layout primitives, сохранив visual match с Figma.
- [x] 4.2 Реализовать Company buttons на базе MUI `ButtonBase`, `ToggleButton` или `ToggleButtonGroup` с URL-логотипами, fallback и управляемым выбором.
- [x] 4.3 Реализовать Switch buttons на базе MUI `ToggleButtonGroup` или существующего паттерна `SegmentedTabs`, с управляемым selected value.
- [x] 4.4 Реализовать Speciality buttons с поддержкой hex-цветов, selected/disabled состояний и управляемого callback.
- [x] 4.5 Реализовать Toggle with label поверх MUI `Switch` и `FormControlLabel`, включая disabled/focus состояния из Figma.

## 5. Chip-компоненты

- [x] 5.1 Реализовать Chip поверх MUI `Chip` с вариантами, состояниями и опциональными hex-цветами из Figma.
- [x] 5.2 Реализовать Chip input поверх MUI `Autocomplete`/`TextField` или композиции MUI primitives с управляемым списком chips.
- [x] 5.3 Реализовать Chip suggestion с поддержкой выбора, URL-изображения при наличии и fallback без изображения.
- [x] 5.4 Проверить, что chip-компоненты не зависят от backend API и полностью управляются props.

## 6. Storybook-документация

- [x] 6.1 Добавить или обновить stories для Stepper, AppButton с новым стилем, Search input, Company buttons, Switch buttons, Speciality buttons, Grade select, Toggle with label, Chip, Chip input и Chip suggestion.
- [x] 6.2 Для каждого компонента показать базовое, selected/active, disabled и другие релевантные состояния из Figma.
- [x] 6.3 Добавить Storybook-примеры с hex-цветами для компонентов, у которых есть динамические color props.
- [x] 6.4 Добавить Storybook-примеры с URL-изображениями и fallback-состоянием для компонентов, которые отображают картинки.
- [x] 6.5 Сверить Storybook stories с Figma-фреймом `1970-5263` перед завершением задач.

## 7. Проверка качества

- [x] 7.1 Запустить lint/typecheck для frontend и исправить ошибки, связанные с новыми компонентами.
- [x] 7.2 Запустить сборку Storybook или локальную проверку stories и убедиться, что все новые stories открываются без runtime-ошибок.
- [x] 7.3 Проверить keyboard/focus-поведение интерактивных компонентов, особенно buttons, select, switch, chip input и stepper.
- [x] 7.4 Проверить, что каждый requirement из `specs/design-system-components/spec.md` покрыт реализацией или Storybook-примером.




## 8. Доработки после первоначальной реализации

- [x] 8.1 Расширить SearchInput: вертикальное центрирование текста, адаптивная ширина, опциональная очистка и список результатов.
- [x] 8.2 Добавить FieldInput с prefix image, conditional postfix/divider и числовым примером без browser spinners.
- [x] 8.3 Добавить CityButtons и Storybook-документацию по Figma.
- [x] 8.4 Расширить ChipInput active search: фильтрация, checkbox-синхронизация, blur-hide и корректные скругления unfocused-состояния.
- [x] 8.5 Реализовать нативную стилизованную прокрутку для переполнения chips и результатов active search; проверить Playwright-тестом синхронизацию в обоих направлениях.
