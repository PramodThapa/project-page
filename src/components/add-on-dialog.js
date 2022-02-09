import { LitElement, html, css } from 'lit-element';

import { isStringEmpty } from '../utils/util-file';

import '@polymer/iron-icons/editor-icons.js';

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
          max-width: 150px;
          position: relative;
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
      /**
       * The Boolean value that opens or close dialog.
       *
       * Passed from parent component
       *
       * @type {Boolean}
       */
      opened: { type: Boolean },

      /**
       * Project ID
       *
       * Passsed from parent component
       *
       * @type {String}
       */
      projectID: { type: String },

      /**
       * Position of the dialog box.
       *
       * Passsed from parent component
       *
       * @type {Object}
       */
      dialogPosition: { type: Object },

      /**
       * Funtion to handle edit button
       *
       * Passsed from parent component
       *
       * @type {Function}
       */
      handleEditButton: { type: Function },

      /**
       * Funtion to handle close dialog
       *
       * Passsed from parent component
       *
       * @type {Function}
       */
      handleCloseDialog: { type: Function },

      /**
       * Funtion to handle delete button
       *
       * Passsed from parent component
       *
       * @type {Function}
       */
      handleDeleteButton: { type: Function },
    };
  }

  /**
   * Constructor for the component.
   * Binding and props initialization.
   */
  constructor() {
    super();
    this.projectID = '';
    this.dialogPosition = {};
  }

  updated() {
    // console.log(this.dialogPosition);
    // if (!isStringEmpty(this.projectID)) {
    //   let paperDialog = this.shadowRoot.getElementById(`${this.projectID}`);
    //   paperDialog.style.position = 'absolute';
    //   paperDialog.style.top = `${this.dialogPosition.yPosition}px`;
    //   paperDialog.style.left = `${this.dialogPosition.xPosition}px`;
    // }
  }
  /**
   * Renders the component.
   *
   * @returns {HTMLElement}
   */
  render() {
    return html`
      <paper-dialog id=${this.projectID} .opened=${this.opened}>
        <div>
          <paper-button noink>
            <iron-icon class="edit-icon" icon="view-agenda"></iron-icon>SHOW
            DETAIL
          </paper-button>
        </div>

        <div>
          <paper-button @click=${() => this.handleEditButton('edit')} noink>
            <iron-icon class="edit-icon" icon="editor:mode-edit"></iron-icon
            >EDIT
          </paper-button>
        </div>

        <div>
          <paper-button
            @click=${() => this.handleDeleteButton(this.projectID)}
            noink
          >
            <iron-icon class="edit-icon" icon="delete"></iron-icon>DELETE
          </paper-button>
        </div>
      </paper-dialog>
    `;
  }
}

/**
 * Defining and registration of component as 'add-on-dialog'
 *
 */
customElements.define('add-on-dialog', AddOnDialog);
