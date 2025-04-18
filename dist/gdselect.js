class GDSelect {
    constructor(selector, config = {}) {
      this.select = typeof selector === 'string' ? document.querySelector(selector) : selector;
      this.config = Object.assign({
        search: true,
        placeholder: 'Seleccione...',
        multiple: this.select.hasAttribute('multiple'),
        multipleSelectedText: 'opciones seleccionadas'
      }, config);
  
      this.multiple = this.config.multiple;
      this.selectedValues = new Set();
  
      this.build();
      this.bindEvents();
    }
  
    build() {
      this.select.style.display = 'none';
  
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('gdselect-wrapper');
      this.wrapper.tabIndex = 0;
  
      // Header
      this.header = document.createElement('div');
      this.header.classList.add('gdselect-header');
      this.header.textContent = this.config.placeholder;
      this.wrapper.appendChild(this.header);
  
      // Dropdown
      this.dropdown = document.createElement('div');
      this.dropdown.classList.add('gdselect-dropdown');
  
      // Input búsqueda
      if (this.config.search) {
        this.searchInput = document.createElement('input');
        this.searchInput.type = 'text';
        this.searchInput.classList.add('gdselect-search');
        this.searchInput.placeholder = '';
        this.dropdown.appendChild(this.searchInput);
      }
  
      // Opciones
      Array.from(this.select.options).forEach(opt => {
        const item = document.createElement('div');
        item.classList.add('gdselect-option');
        item.dataset.value = opt.value;
        item.textContent = opt.textContent;
        if (opt.disabled) item.classList.add('disabled');
        if (opt.selected) {
          item.classList.add('selected');
          this.selectedValues.add(opt.value);
        }
        this.dropdown.appendChild(item);
      });
  
      this.wrapper.appendChild(this.dropdown);
      this.select.parentNode.insertBefore(this.wrapper, this.select.nextSibling);
      
      // Actualizar el header con los valores seleccionados inicialmente
      this.updateHeader();
    }
  
    bindEvents() {
      this.wrapper.addEventListener('click', e => {
        if (e.target.classList.contains('gdselect-option') && !e.target.classList.contains('disabled')) {
          this.toggleOption(e.target);
        } else {
          this.dropdown.classList.toggle('open');
          if (this.config.search && this.dropdown.classList.contains('open')) {
            this.searchInput.style.display = 'block';
            this.searchInput.focus();
          } else if (this.config.search) {
            this.searchInput.style.display = 'none';
            this.searchInput.value = '';
            this.filterOptions('');
          }
        }
      });
  
      if (this.config.search) {
        this.searchInput.addEventListener('input', () => {
          this.filterOptions(this.searchInput.value.toLowerCase());
        });
      }
  
      document.addEventListener('click', e => {
        if (!this.wrapper.contains(e.target)) {
          this.dropdown.classList.remove('open');
          if (this.config.search) {
            this.searchInput.style.display = 'none';
            this.searchInput.value = '';
            this.filterOptions('');
          }
        }
      });
    }
  
    filterOptions(search) {
      this.dropdown.querySelectorAll('.gdselect-option').forEach(opt => {
        const text = opt.textContent.toLowerCase();
        opt.style.display = text.includes(search) ? 'block' : 'none';
      });
    }
  
    toggleOption(optionEl) {
      const value = optionEl.dataset.value;
  
      if (this.multiple) {
        if (this.selectedValues.has(value)) {
          this.selectedValues.delete(value);
          optionEl.classList.remove('selected');
        } else {
          this.selectedValues.add(value);
          optionEl.classList.add('selected');
        }
      } else {
        this.selectedValues.clear();
        this.selectedValues.add(value);
        this.dropdown.querySelectorAll('.gdselect-option').forEach(opt => opt.classList.remove('selected'));
        optionEl.classList.add('selected');
        this.dropdown.classList.remove('open');
      }
  
      this.updateHeader();
      this.syncSelect();
    }
  
    updateHeader() {
      if (this.selectedValues.size === 0) {
        this.header.textContent = this.config.placeholder;
      } else if (this.multiple) {
        this.header.textContent = `${this.selectedValues.size} ${this.config.multipleSelectedText}`;
      } else {
        const selectedVal = [...this.selectedValues][0];
        const selectedOption = Array.from(this.select.options).find(opt => opt.value === selectedVal);
        this.header.textContent = selectedOption ? selectedOption.textContent : this.config.placeholder;
      }
    }
  
    syncSelect() {
      Array.from(this.select.options).forEach(opt => {
        opt.selected = this.selectedValues.has(opt.value);
      });
  
      const event = new Event('change', { bubbles: true });
      this.select.dispatchEvent(event);
    }
  
    setValue(values) {
      if (!Array.isArray(values)) values = [values];
      this.selectedValues = new Set(values.map(String));
      this.dropdown.querySelectorAll('.gdselect-option').forEach(opt => {
        opt.classList.toggle('selected', this.selectedValues.has(opt.dataset.value));
      });
      this.updateHeader();
      this.syncSelect();
    }
  
    getValue() {
      return this.multiple ? [...this.selectedValues] : [...this.selectedValues][0] || null;
    }
} 