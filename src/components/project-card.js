import { LitElement, html, css, nothing } from 'lit-element';
import { classMap } from 'lit/directives/class-map.js';

import './add-on-dialog.js';

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

/**
 * Your description here..
 */
class ProjectCard extends LitElement {
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
        hr {
          margin-top: 10px;
        }
        ::-webkit-scrollbar {
          width: 6px;
          border-radius: 20px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #bbb;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #aaa;
        }
        .float-l {
          float: left;
        }
        .float-r {
          float: right;
        }
        .card-wrapper {
          padding: 10px;
          width: 100%;
          border: 1px solid grey;
          border-radius: 5px;
          box-shadow: 2px 2px 5px;
        }
        .card-heading {
          display: float;
        }
        .clearfix::after {
          content: '';
          clear: both;
          display: table;
        }
        .card-header-left {
          display: flex;
        }
        .card-header-right {
          margin-right: -10px;
        }
        .image-container {
          width: 40px;
          height: 40px;
        }
        h3 {
          margin-left: 10px;
        }
        .card-description {
          width: 100%;
          height: 60px;
          overflow: auto;
          margin: 20px 0px 0px 0px;
          text-align: justify;
          font-size: 14px;
          padding-right: 5px;
          color: #292828;
        }
        .card-priority-status {
          margin: 10px 0px 0px 0px;
          display: grid;
          grid-auto-flow: column;
        }

        h4 {
          color: grey;
          text-transform: uppercase;
        }
        .textRed {
          color: red;
        }
        .textGreen {
          color: green;
        }
        .textOrange {
          color: orange;
        }
        .degree {
          font-weight: 500;
        }
        .pipeline-wrapper {
          width: 100%;
          margin: 10px 0px 10px 0px;
          color: rgba(0, 0, 255, 0.6);
        }
        .pipeline-item {
          height: 60px;
          overflow: auto;
        }
        .pipeline {
          width: 48%;
          display: inline-block;
        }
        .pipeline-name {
          margin-top: 5px;
        }
        .stage {
          width: 48%;
          display: inline-block;
        }
        .pipeline-stage {
          margin-top: 5px;
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
      opened: { type: String },
      position: { type: Object },
      deleteProject: { type: Function },
    };
  }

  /**
   * Constructor for the component.
   * Binding and props initialization.
   */
  constructor() {
    super();
    this.opened = false;
    this.position = {};
  }

  getPriorityClassMap(priority) {
    return {
      textRed: priority === 'High',
      textOrange: priority === 'Medium',
      textGreen: priority === 'Low',
    };
  }

  getStatusClassMap(status) {
    return {
      textRed: status === 'Attrited',
      textOrange: status === 'In Progress',
      textGreen: status === 'Completed',
    };
  }

  openAddOn(e) {
    let xPosition = e.clientX;
    let yPosition = e.clientY;
    this.position = Object.assign(
      {},
      { positionX: xPosition, positionY: yPosition }
    );
    this.opened = !this.opened;
  }
  /**
   * Renders the component.
   *
   * @returns {HTMLElement}
   */
  render() {
    return html`
      <div class="card-wrapper">
        <div class="card-header clearfix">
          <div class="card-header-left float-l">
            <div class="image-container">
              <img
                src="../images/project.jpg"
                alt="project-image"
                width="40px"
                height="40px"
              />
            </div>
            <h3>${this.project.name}</h3>
          </div>
          <div class="card-header-right float-r">
            <paper-icon-button
              @click=${(e) => this.openAddOn(e)}
              icon="more-vert"
            >
            </paper-icon-button>

            <div>
              ${this.opened
                ? html` <add-on-dialog
                    .openDialog=${this.opened}
                    .position=${this.position}
                    .handleDeleteButton=${() =>
                      this.deleteProject(this.project.id)}
                  ></add-on-dialog>`
                : nothing}
            </div>
          </div>
        </div>
        <div class="card-description">${this.project.description}</div>
        <hr />
        <div class="card-priority-status">
          <div class="priority">
            <h4>priority</h4>
            <div
              class="degree ${classMap(
                this.getPriorityClassMap(this.project.priority)
              )}"
            >
              ${this.project.priority}
            </div>
          </div>
          <div class="status">
            <h4>Status</h4>
            <div
              class="degree ${classMap(
                this.getStatusClassMap(this.project.status)
              )}"
            >
              ${this.project.status}
            </div>
          </div>
        </div>
        <hr />
        <div class="pipeline-wrapper">
          <div class="pipeline-header">
            <h4 class="pipeline">Pipeline</h4>
            <h4 class="stage">Stage</h4>
          </div>

          <div class="pipeline-item">
            <div class="pipeline">
              ${this.project.pipeline.map(
                (pipeline) =>
                  html`<div class="pipeline-name">${pipeline.name}</div>`
              )}
            </div>
            <div class="stage">
              ${this.project.pipeline.map(
                (pipeline) =>
                  html`<div class="pipeline-stage">${pipeline.stage}</div>`
              )}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('project-card', ProjectCard);
