import { LitElement, html, css } from 'lit-element';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

class ProjectFilter extends LitElement {
  /**
   * The styles for the component.
   *
   * @returns {Array}
   */
  static get styles() {
    return [
      css`
        * {
          box-sizing: border-box;
          padding: 0px;
          margin: 0px;
          font-family: Ubuntu;
        }
        .filter {
          padding: 5px;
          border: 2px solid grey;
          border-radius: 5px;
        }
        iron-icon {
          height: 16px;
        }

        input {
          border: none;
          outline: none;
        }
      `,
    ];
  }

  /**
   * Static getter properties.
   *
   * @returns {Object}
   */
  static get properties() {
    return {
      /**
       * Function that executes when paper-input value changes.
       *
       * Passed from parent component
       *
       * @type {Function}
       */
      handleSearchInput: { type: Function },
    };
  }

  /**
   * Constructor for the component.
   * Binding and props initialization.
   */
  constructor() {
    super();
  }

  /**
   * Renders the component.
   *
   * @returns {HTMLElement}
   */
  render() {
    return html`
      <div class="filter">
        <iron-icon icon="search"></iron-icon>
        <input
          placeholder="Search Projects"
          @input=${(e) => this.handleSearchInput(e)}
        />
      </div>
    `;
  }
}

/**
 * Defining and registration of component as 'project-filter'
 *
 */
customElements.define('project-filter', ProjectFilter);
