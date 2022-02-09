import { LitElement, html, css } from 'lit';

export class ConfirmDialog extends LitElement {
  /**
   * Gets style.
   *
   * @returns {Array}
   */
  static get styles() {
    return [
      css`
        * {
          box-sizing: border-box;
          margin: 0px;
          padding: 0px;
          font-family: Ubuntu;
        }

        paper-dialog {
          position: relative;
          top: 10px;
          width: 30%;
        }
        .wrapper {
          padding: 15px;
        }
        h2 {
          padding: 15px 0px 15px 0px;
        }
        paper-button.cancel {
          margin-left: 10px;
          padding: 10px;
          color: grey;
          font-weight: 400;
        }
        paper-button.close {
          background: var(--paper-fab-background, var(--accent-color));
          padding: 10px;
          color: #ffffff;
          font-weight: 400;
        }
      `,
    ];
  }

  static get properties() {
    return {
      handleCancel: { type: Function },
    };
  }
  constructor() {
    super();
  }

  render() {
    return html`
      <paper-dialog with-backdrop>
        <div class="wrapper">
          <h2>Are you sure you want to cancel?</h2>
          <paper-button dialog-dismiss raised class="close"
            >CANCEL</paper-button
          >
          <paper-button class="cancel">NO</paper-button>
        </div>
      </paper-dialog>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
