import { LitElement, html, css } from 'lit-element';

/**
 * Your description here..
 */
class ErrorMessage extends LitElement {
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
          color: red;
          font-size: 12px;
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
       * Error message
       *
       * Passed from parent component.
       *
       * @type {String}
       */
      error: { type: String },
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
    return html` <div class="error-message">${this.error}</div> `;
  }
}

/**
 * Defining and registration of component as 'error-message'
 *
 */
customElements.define('error-message', ErrorMessage);
