# GDSelect

Un select personalizado que permite realizar búsquedas y seleccionar múltiples o solo una opción.

## Características

- Búsqueda integrada de opciones
- Soporte para selección única y múltiple
- Personalizable mediante CSS
- Fácil de implementar
- Ligero y sin dependencias

## Instalación

### Opción 1: Usando el archivo `gdselect.js`

1. Descarga el archivo `gdselect.js` desde el directorio `src/`
2. Agrega el archivo JavaScript en tu página HTML

### Opción 2: Usando el archivo minificado

Si prefieres la versión minificada, descarga `gdselect.min.js` desde el directorio `dist/`

## Uso Básico

1. Incluye los archivos necesarios en tu HTML:

```html
<link rel="stylesheet" href="styles/gdselect.css">
<script src="src/gdselect.js"></script>
```

2. Crea un elemento select en tu HTML:

```html
<select id="mi-select">
  <option value="1" selected>Opción 1</option>
  <option value="2">Opción 2</option>
  <option value="3">Opción 3</option>
</select>
```

3. Inicializa GDSelect en JavaScript:

```javascript
const gdSelect = new GDSelect('#mi-select', {
  placeholder: 'Seleccionar...',
  search: true
});
```

## Selección Múltiple

Para implementar un select con selección múltiple:

```html
<select id="mi-select-multiple" multiple>
  <option value="1">Opción A</option>
  <option value="2">Opción B</option>
  <option value="3">Opción C</option>
</select>
```

```javascript
const gdMultiple = new GDSelect('#mi-select-multiple', {
  search: true,
  placeholder: 'Buscar múltiples opciones...'
});
```

## API

### Métodos

#### `setValue(values)`
Establece el valor seleccionado. Para selección múltiple, acepta un arreglo de valores.

```javascript
gdSelect.setValue([1, 3]);
```

#### `getValue()`
Obtiene el valor seleccionado. Retorna un arreglo para selección múltiple o un único valor.

```javascript
const selectedValues = gdSelect.getValue();
```

### Opciones de Configuración

| Opción | Tipo | Por defecto | Descripción |
|--------|------|-------------|-------------|
| placeholder | string | "Seleccione..." | Texto mostrado cuando no hay selección |
| search | boolean | true | Activa/desactiva la búsqueda |
| multiple | boolean | false | Permite selección múltiple |
| multipleSelectedText | string | "opciones seleccionadas" | Texto para múltiples selecciones |

## Personalización

### Clases CSS Disponibles

- `.gdselect-wrapper`: Contenedor principal
- `.gdselect-header`: Área del placeholder/selección
- `.gdselect-search`: Campo de búsqueda
- `.gdselect-dropdown`: Contenedor de opciones
- `.gdselect-option`: Opciones individuales
- `.gdselect-option.selected`: Opción seleccionada
- `.gdselect-option.disabled`: Opciones deshabilitadas

## Contribuir

1. Fork del repositorio
2. Crear rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.