import { LitElement, html, css, nothing } from 'lit-element';

import './commons/error-message.js';
import './project-pipeline.js';
import { isStringEmpty, idGenerator } from '../utils/util-file.js';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';

import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-icon-button/paper-icon-button-light.js';
/**
 * Your description here..
 */

const priority = ['Low', 'Medium', 'High'];
const projectType = ['Internal Project', 'External Project'];
const status = ['In Progress', 'Completed', 'Attrited'];

class AddProject extends LitElement {
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

        .addProject {
          width: 40%;
          top: 5px;
          padding: 15px;
        }
        .header {
          position: relative;
          margin-bottom: 10px;
        }

        .cancel-dialog {
          position: absolute;
          top: 0px;
          right: 0px;
        }
        paper-dropdown-menu {
          width: 100%;
        }
        paper-listbox {
          width: 150px;
          padding: 5px;
        }
        .form-footer {
          margin-top: 15px;
          display: flex;
        }
        paper-button.cancel {
          margin-left: 10px;
          padding: 10px;
          color: grey;
          font-weight: 400;
        }
        paper-button.add-project {
          background: var(--paper-fab-background, var(--accent-color));
          padding: 10px;
          color: #ffffff;
          font-weight: 400;
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
      formData: { type: Object },
      handleCloseDialog: { type: Function },
      error: { type: Object },
      pipeline: { type: Array },
      add: { type: Function },
    };
  }

  /**
   * Constructor for the component.
   * Binding and props initialization.
   */
  constructor() {
    super();
    this.formData = {};
    this.error = {
      name: {
        isValid: true,
        touched: false,
        message: 'Project name cannot be empty !',
      },
      description: {
        isValid: true,
        touched: false,
        message: 'Project description cannot be empty !',
      },
      statusdDescription: {
        isValid: true,
        touched: false,
        message: 'Status description cannot be empty !',
      },
      priority: {
        isValid: true,
        touched: false,
        message: 'Priority cannot be empty !',
      },
      type: {
        isValid: true,
        touched: false,
        message: 'Project type cannot be empty !',
      },
      status: {
        isValid: true,
        touched: false,
        message: 'Project status cannot be empty !',
      },
    };
    this.pipeline = [
      {
        id: 0,
        name: '',
        stage: '',
      },
    ];

    this.pipelineError = [
      {
        id: 0,
        name: {
          isValid: true,
          touched: false,
          message: 'Pipeline name cannot be empty !',
        },
        stage: {
          isValid: true,
          touched: false,
          message: 'Pipeline stage cannot be empty !',
        },
      },
    ];

    this.validated = false;

    this.addPipeline = this.addPipeline.bind(this);
    this.deletePipeline = this.deletePipeline.bind(this);
    this.addPipelineName = this.addPipelineName.bind(this);
    this.addPipelineStage = this.addPipelineStage.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.formData = { ...this.formData, [name]: value };
    this.validateInput(name, value);
  }

  validateInput(name, value) {
    if (isStringEmpty(value)) {
      this.error[name].isValid = false;
    } else {
      this.error[name].isValid = true;
      this.error[name].touched = true;
    }
    this.error = Object.assign({}, this.error);
  }

  handleDropdownChange(dropdownName, value) {
    this.formData = { ...this.formData, [dropdownName]: value };
    this.error[dropdownName].touched = true;
    this.error[dropdownName].isValid = true;
    this.error = Object.assign({}, this.error);
  }

  addPipelineError(pipelineID) {
    this.pipelineError = [
      ...this.pipelineError,
      {
        id: pipelineID,
        name: {
          isValid: true,
          touched: false,
          message: 'Pipeline name cannot be empty !',
        },
        stage: {
          isValid: true,
          touched: false,
          message: 'Pipeline stage cannot be empty !',
        },
      },
    ];
  }

  addPipeline() {
    const pipelineID = idGenerator();
    this.pipeline = [...this.pipeline, { id: pipelineID, name: '', stage: '' }];
    this.addPipelineError(pipelineID);
  }

  deletePipeline(e) {
    const pipelineID = e.target.id;
    this.pipeline = this.pipeline.filter(
      (pipeline) => pipeline.id != pipelineID
    );
  }

  addPipelineName(e, pipelineID) {
    const pipelineName = e.detail.value;

    this.pipeline = this.pipeline.map((pipeline) => {
      if (pipelineID === pipeline.id) {
        pipeline.name = pipelineName;
      }
      return pipeline;
    });

    this.pipelineError = this.pipelineError.map((error) => {
      if (pipelineID === error.id) {
        error.name.touched = true;
        error.name.isValid = true;
      }
      return error;
    });
  }

  addPipelineStage(e, pipelineID) {
    const pipelineStage = e.detail.value;

    this.pipeline = this.pipeline.map((pipeline) => {
      if (pipelineID === pipeline.id) {
        pipeline.stage = pipelineStage;
      }
      return pipeline;
    });

    this.pipelineError = this.pipelineError.map((error) => {
      if (pipelineID === error.id) {
        error.stage.touched = true;
        error.stage.isValid = true;
      }
      return error;
    });
  }

  checkPipelineValidation() {
    this.pipelineError = this.pipelineError.map((error) => {
      if (error.name.touched === false) {
        error.name.isValid = false;
      }
      return error;
    });
    this.pipelineError = this.pipelineError.map((error) => {
      if (error.stage.touched === false) {
        error.stage.isValid = false;
      }
      return error;
    });

    let validationFlags = [];
    this.pipelineError.map((error) => {
      validationFlags.push(error.name.isValid);
      validationFlags.push(error.name.touched);
      validationFlags.push(error.stage.isValid);
      validationFlags.push(error.stage.touched);
    });

    if (validationFlags.includes(false)) {
      return false;
    } else {
      return true;
    }
  }

  checkValidation() {
    Object.keys(this.error).map((key) => {
      if (this.error[key].touched === false) {
        this.error[key].isValid = false;
      }
    });
    this.error = Object.assign({}, this.error);

    if (
      this.error.name.touched &&
      this.error.name.isValid &&
      this.error.status.touched &&
      this.error.status.isValid &&
      this.error.priority.touched &&
      this.error.priority.isValid &&
      this.error.statusdDescription.touched &&
      this.error.statusdDescription.isValid &&
      this.error.type.touched &&
      this.error.type.isValid &&
      this.error.description.touched &&
      this.error.description.isValid
    ) {
      return true;
    }
  }

  addProject(e) {
    let validation = this.checkValidation();
    let pipelineValidation = this.checkPipelineValidation();

    if (validation && pipelineValidation) {
      this.formData.pipeline = this.pipeline;
      this.formData.id = idGenerator();
      this.formData = Object.assign({}, this.formData);
      this.add(this.formData);
    }
  }

  /**
   * Renders the component.
   *
   * @returns {HTMLElement}
   */
  render() {
    return html`
      <paper-dialog class="addProject" modal .opened=${this.openDialog}>
        <div class="wrapper">
          <div class="header ">
            <h2>ADD PROJECT</h2>
            <div class="cancel-dialog">
              <paper-icon-button-light @click="${this.handleCloseDialog}">
                <button>
                  <iron-icon icon="close"></iron-icon>
                </button>
              </paper-icon-button-light>
            </div>
          </div>

          <paper-input
            class="custom"
            name="name"
            label="Name *"
            always-float-label
            @input=${this.handleInputChange}
          >
          </paper-input>

          ${this.error.name.isValid
            ? nothing
            : html`<error-message
                .error=${this.error.name.message}
              ></error-message>`}

          <project-pipeline
            .pipeline=${this.pipeline}
            .addPipeline=${this.addPipeline}
            .pipelineError=${this.pipelineError}
            .deletePipeline=${this.deletePipeline}
            .addPipelineName=${this.addPipelineName}
            .addPipelineStage=${this.addPipelineStage}
          ></project-pipeline>

          <paper-textarea
            class="custom"
            rows="2"
            name="description"
            always-float-label
            required
            @input=${this.handleInputChange}
            label="Project Description *"
          >
          </paper-textarea>

          ${this.error.description.isValid
            ? nothing
            : html`<error-message
                .error=${this.error.description.message}
              ></error-message>`}

          <paper-dropdown-menu
            always-float-label
            horizontal-align="right"
            vertical-offset="60"
            no-animations
            allowOutsideScroll
            name="priority"
            label="Priority *"
            @value-changed=${(e) =>
              this.handleDropdownChange('priority', e.detail.value)}
          >
            <paper-listbox slot="dropdown-content">
              ${priority.map(
                (priority) => html`<paper-item>${priority}</paper-item>`
              )}
            </paper-listbox>
          </paper-dropdown-menu>

          ${this.error.priority.isValid
            ? nothing
            : html`<error-message
                .error=${this.error.priority.message}
              ></error-message>`}

          <paper-dropdown-menu
            always-float-label
            horizontal-align="right"
            vertical-offset="60"
            no-animations
            allowOutsideScroll
            label="Project Type"
            @value-changed=${(e) =>
              this.handleDropdownChange('type', e.detail.value)}
          >
            <paper-listbox slot="dropdown-content">
              ${projectType.map(
                (type) => html`<paper-item>${type}</paper-item>`
              )}
            </paper-listbox>
          </paper-dropdown-menu>

          ${this.error.type.isValid
            ? nothing
            : html`<error-message
                .error=${this.error.type.message}
              ></error-message>`}

          <paper-dropdown-menu
            always-float-label
            horizontal-align="right"
            vertical-offset="50"
            no-animations
            allowOutsideScroll
            label="Status"
            @value-changed=${(e) =>
              this.handleDropdownChange('status', e.detail.value)}
          >
            <paper-listbox slot="dropdown-content">
              ${status.map(
                (status) => html`<paper-item>${status}</paper-item>`
              )}
            </paper-listbox>
          </paper-dropdown-menu>

          ${this.error.status.isValid
            ? nothing
            : html`<error-message
                .error=${this.error.status.message}
              ></error-message>`}

          <paper-textarea
            class="custom"
            rows="2"
            name="statusdDescription"
            always-float-label
            required
            @input=${this.handleInputChange}
            label="Status Description "
          >
          </paper-textarea>

          ${this.error.statusdDescription.isValid
            ? nothing
            : html`<error-message
                .error=${this.error.statusdDescription.message}
              ></error-message>`}

          <div class="form-footer">
            <paper-button raised @click=${this.addProject} class="add-project"
              >ADD</paper-button
            >
            <paper-button dialog-dismiss class="cancel">CANCEL </paper-button>
          </div>
        </div>
      </paper-dialog>
    `;
  }
}

customElements.define('add-project', AddProject);
