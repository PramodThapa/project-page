import { LitElement, html, css, nothing } from 'lit-element';

import {
  initialProjects,
  addInitialProject,
  getProject,
} from './services/project-data.js';

import './components/add-project.js';
import './components/project-card.js';
import './components/project-filter.js';
import '@polymer/paper-fab/paper-fab.js';
import './components/commons/confirm-dialog.js';

class MyApp extends LitElement {
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

        .float-r {
          float: right;
        }
        .float-l {
          float: left;
        }
        .clearfix {
          content: '';
          clear: both;
          display: table;
        }
        .container {
          position: relative;
        }
        .nav {
          width: 100%;
          border-bottom: 1px solid grey;
          box-shadow: 1px 1px 5px;
        }
        .nav-container {
          display: float;
        }
        h4 {
          text-transform: uppercase;
          padding: 20px;
        }
        .project-filter {
          padding: 20px;
        }
        .card-container {
          padding: 20px;
          display: grid;
          grid-auto-flow: column;
          gap: 1em;
          position: relative;
        }
        .add-button {
          position: absolute;
          bottom: 20px;
          right: 10px;
        }
        .confirm-dialog {
          position: absolute;
          top: 40%;
          left: 35%;
          width: 100%;
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
       * List of Project
       *
       * @type {Array}
       */
      project: { type: Array },

      /**
       * Mode on with form is opened.
       *
       * If true form is opened in edit mode to edit respective project with project ID.
       *
       * @type {String}
       */
      editMode: { type: String },

      /**
       * Project ID of the selected project
       *
       * @type {String}
       */
      projectID: { type: String },

      /**
       * Search text from paper-input
       *
       * @type {String}
       */
      searchText: { type: String },

      /**
       * Project data of projct with respective project ID
       *
       * @type {Object}
       */
      projectData: { type: Object },

      /**
       * Function that opens/close the form to edit/add project.
       *
       * @type {String}
       */
      openAddDialog: { type: Function },

      /**
       * Dialog position for add-on component open.
       *
       * @type {Object}
       */
      dialogPosition: { type: Object },

      /**
       * Filtered Project
       *
       * @type {Array}
       */
      filteredProject: { type: Array },

      /**
       * True if form is opened
       *
       * @type {Array}
       */
      addOnDialogOpened: { type: String },
    };
  }

  /**
   * Constructor for the component.
   * Binding and props initialization.
   */
  constructor() {
    super();

    this.offsetX = 120;
    this.offsetY = 20;
    this.projectID = '';
    this.searchText = '';
    this.projectData = {};
    this.editMode = false;
    this.dialogPosition = {};
    this.openAddDialog = false;
    this.addOnDialogOpened = false;

    this.addProject = this.addProject.bind(this);
    this.setProjectId = this.setProjectId.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.openAddOnDialog = this.openAddOnDialog.bind(this);
    this.setDialogPosition = this.setDialogPosition.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.handleOpenAddDialog = this.handleOpenAddDialog.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    addInitialProject(initialProjects);
    this.project = getProject();
    this.filteredProject = this.project;
  }

  /**
   * Function to update filter project on search text is changed in project-filter component.
   *
   * @param {*} e || event
   */
  onSearchTextChange(e) {
    this.searchText = e.target.value.toLowerCase();
    this.filteredProject = this.project.filter((project) => {
      if (project.name.toLowerCase().startsWith(this.searchText)) {
        return project;
      }
    });
  }

  /**
   * Function to add project
   *
   * @param {*} project || form data as object
   */
  addProject(project) {
    this.project = [...this.project, project];
    this.filteredProject = this.project;
  }

  /**
   * Function to delete project with respective projectID
   *
   * @param {*} projectID || project ID of project
   */
  deleteProject(projectID) {
    this.project = this.project.filter((project) => projectID != project.id);
    this.filteredProject = this.project;
    this.addOnDialogOpened = false;
  }

  /**
   * Open/close form for edit/add mode
   *
   * @param {*} mode || mode in which form is opened
   */
  handleOpenAddDialog(mode) {
    this.openAddDialog = !this.openAddDialog;
    if (mode === 'edit') {
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  /**
   * Function to set the project ID
   *
   * @param {*} projectID || project ID of project
   */
  setProjectId(projectID) {
    this.projectID = projectID;
    this.setProjectData(projectID);
  }

  /**
   * Function to set the dialog position
   *
   * @param {*} position
   */
  setDialogPosition(position) {
    this.dialogPosition = {
      ...this.dialogPosition,
      xPosition: position.xPosition,
      yPosition: position.yPosition,
    };

    let paperDialog = this.shadowRoot.getElementById('add-on-dialog');
    paperDialog.style.position = 'absolute';
    paperDialog.style.top = `${this.dialogPosition.yPosition + this.offsetY}px`;
    paperDialog.style.left = `${
      this.dialogPosition.xPosition - this.offsetX
    }px`;
  }

  openAddOnDialog() {
    this.addOnDialogOpened = !this.addOnDialogOpened;
  }

  setProjectData(projectID) {
    this.projectData = this.filteredProject.filter((project) => {
      if (project.id === projectID) {
        return project;
      }
    });
  }
  /**
   * Renders the component.
   *
   * @returns {HTMLElement}
   */
  render() {
    return html`
      <div class="wrapper">
        <add-on-dialog
          id="add-on-dialog"
          .projectID=${this.projectID}
          .opened=${this.addOnDialogOpened}
          .dialogPosition=${this.dialogPosition}
          .handleCloseDialog=${this.openAddOnDialog}
          .handleEditButton=${this.handleOpenAddDialog}
          .handleDeleteButton=${() => this.deleteProject(this.projectID)}
        ></add-on-dialog>
        <div class="container">
          <div class="nav clearfix">
            <div class="nav-container ">
              <h4 class="logo-text float-l">Project</h4>
              <project-filter
                class="project-filter float-r"
                .handleSearchInput=${this.onSearchTextChange}
              ></project-filter>
            </div>
          </div>

          <div class="card-container">
            ${this.filteredProject.map(
              (project) =>
                html`
                  <project-card
                    .project=${project}
                    .setProjectID=${this.setProjectId}
                    .setDialogPosition=${this.setDialogPosition}
                    .onAddOnIconClick=${this.openAddOnDialog}
                    .deleteProject=${() => this.deleteProject()}
                  ></project-card>
                `
            )}
          </div>
        </div>

        <div class="add-button">
          <paper-fab noink @click="${this.handleOpenAddDialog}" icon="add">
          </paper-fab>
          <add-project
            .add=${this.addProject}
            .editMode=${this.editMode}
            .openDialog=${this.openAddDialog}
            .projectData=${this.projectData}
            .handleCloseDialog=${this.handleOpenAddDialog}
          ></add-project>
        </div>
        <div class="confirm-dialog">
          <!-- <confirm-dialog></confirm-dialog> -->
        </div>
      </div>
    `;
  }
}

customElements.define('my-app', MyApp);
