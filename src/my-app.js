import { LitElement, html, css, nothing } from 'lit-element';

import {
  initialProjects,
  addInitialProject,
  getProject,
} from './services/project-data.js';

import './components/project-filter.js';
import './components/project-card.js';
import './components/add-project.js';
import './components/commons/confirm-dialog.js';

import '@polymer/paper-fab/paper-fab.js';

/**
 * Your description here..
 */
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
      project: { type: Array },
      searchText: { type: String },
      filteredProject: { type: Array },
      openAddDialog: { type: String },
    };
  }

  /**
   * Constructor for the component.
   * Binding and props initialization.
   */
  constructor() {
    super();

    this.searchText = '';
    this.openAddDialog = false;

    this.handleOpenAddDialog = this.handleOpenAddDialog.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.addProject = this.addProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    addInitialProject(initialProjects);
    this.project = getProject();
    this.filteredProject = this.project;
  }

  onSearchTextChange(e) {
    let filterProject = [];
    this.searchText = e.target.value.toLowerCase();
    this.project.map((project) => {
      if (project.name.toLowerCase().startsWith(this.searchText)) {
        filterProject.push(project);
      }
    });

    this.filteredProject = [...filterProject];

    // this.searchText= e.target.value.toLowerCase();
    // this.filteredProject = this.project.map((project)=>{
    //   console.log(project.name.toLowerCase().startsWith(this.searchText))
    //   if(project.name.toLowerCase().startsWith(this.searchText)){
    //     console.log(project)
    //     return project
    //   }
    // })
    // console.log(this.filteredProject)
  }

  addProject(project) {
    this.project = [...this.project, project];
    this.filteredProject = this.project;
    console.log(this.project);
  }

  deleteProject(projectID) {
    this.project = this.project.filter((project) => projectID != project.id);
    this.filteredProject = this.project;
    console.log(this.filteredProject);
  }

  handleOpenAddDialog() {
    this.openAddDialog = !this.openAddDialog;
  }

  /**
   * Renders the component.
   *
   * @returns {HTMLElement}
   */
  render() {
    console.log('renderd')
    return html`
      <div class="wrapper">
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
                    .deleteProject=${this.deleteProject}
                  ></project-card>
                `
            )}
          </div>
        </div>
        <div class="add-button">
          <paper-fab noink @click="${this.handleOpenAddDialog}" icon="add">
          </paper-fab>
          <add-project
            .openDialog=${this.openAddDialog}
            .handleCloseDialog=${this.handleOpenAddDialog}
            .add=${this.addProject}
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
