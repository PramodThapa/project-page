import { LitElement, html, css } from 'lit-element';

import '@polymer/iron-icons/editor-icons.js';
/**
 * Your description here..
 */
class AddOnDialog extends LitElement {
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
        paper-dialog {
          padding: 10px;
        }
        paper-button {
          padding: 5px;
          text-align: left;
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
      openDialog: { type: Boolean },
      position: { type: Object },
      handleDeleteButton: { type: Function },
    };
  }

  /**
   * Constructor for the component.
   * Binding and props initialization.
   */
  constructor() {
    super();
    this.opened = false;
    this.offsetY = 20;
    this.offsetX = 150;
  }

  /**
   * Renders the component.
   *
   * @returns {HTMLElement}
   */
  render() {
    return html`
      <paper-dialog
        style="position:fixed;
        top:${this.position.positionY + this.offsetY}px;
        left:${this.position.positionX - this.offsetX}px"
        .opened=${this.openDialog}
      >
        <div>
          <paper-button noink>
            <iron-icon class="edit-icon" icon="view-agenda"></iron-icon>SHOW
            DETAIL
          </paper-button>
        </div>

        <div>
          <paper-button noink>
            <iron-icon class="edit-icon" icon="editor:mode-edit"></iron-icon
            >EDIT
          </paper-button>
        </div>

        <div>
          <paper-button @click=${this.handleDeleteButton} noink>
            <iron-icon class="edit-icon" icon="delete"></iron-icon>DELETE
          </paper-button>
        </div>
      </paper-dialog>
    `;
  }
}

customElements.define('add-on-dialog', AddOnDialog);
