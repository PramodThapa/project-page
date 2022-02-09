import { LitElement, html, css, nothing, render } from 'lit-element';

import './commons/error-message.js';


/**
 * Pipeline Name Dropdown Items
*/
const pipelineName = ['ASP Pipeline', 'Antibody Pipeline'];

/**
 * Pipeline Name Dropdown Items
*/
const pipelineStage = ['Lead Validation', 'Lead Identification'];


class ProjectPipeline extends LitElement {
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

        .wrapper {
          background-color: #d3d3d3;
          padding: 15px;
        }

        .pipeline {
          display: flex;
        }
        .pipeline-name {
          width: 49%;
        }
        .pipeline-stage {
          width: 49%;
        }

        paper-dropdown-menu {
          padding-right: 15px;
        }
        .delete-icon {
          position: realtive;
          top: 20px;
        }
        paper-fab {
          background-color: blue;
          height: 20px;
          width: 20px;
        }
        button {
          outline: none;
          border: none;
          background-color: #d3d3d3;
        }
        button:hover {
          cursor: pointer;
        }
        .button-content {
          display: flex;
          color: blue;
        }
        .button-text {
          position: relative;
          margin-left: 10px;
          top: 2px;
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
       * Array of pipeline object.
       * 
       * Passsed from parent component
       * 
       * @type {Array} 
      */
      pipeline: { type: Array },

      /**
       * Array of pipeline error object with their respective validation status.
       * 
       * Passsed from parent component
       * 
       * @type {Array} 
      */
      pipelineError: { type: Array },

      /**
       * Function that adds pipeline to the pileline array.
       * 
       * Passsed from parent component
       * 
       * @type {Function} 
      */
      addPipeline: { type: Function },

      /**
       * Function that delete pipeline from the pileline array.
       * 
       * Passsed from parent component
       * 
       * @type {Function} 
      */
      deletePipeline: { type: Function },

      /**
       * Function that adds pipeline name to the pileline array to respective pipeline id.
       * 
       * Passsed from parent component
       * 
       * @type {Function} 
      */
      addPipelineName: { type: Function },

      /**
       * Function that adds pipeline stage to the pileline array to respective pipeline id.
       * 
       * Passsed from parent component
       * 
       * @type {Function} 
      */
      addPipelineStage: { type: Function },
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
      <div class="wrapper">
        <h4>Pipeline(s)</h4>
        ${this.pipeline.map(
          (pipeline) => html`
            <div class="pipeline">
              <div class="pipeline-name">
                <paper-dropdown-menu
                  always-float-label
                  horizontal-align="right"
                  vertical-offset="50"
                  no-animations
                  allowOutsideScroll
                  label="Pipeline Name *"
                  @value-changed=${(e) => this.addPipelineName(e, pipeline.id)}
                >
                  <paper-listbox slot="dropdown-content">
                    ${pipelineName.map(
                      (name) => html`<paper-item>${name}</paper-item>`
                    )}
                  </paper-listbox>
                </paper-dropdown-menu>
                <div>
                  ${this.pipelineError.map((error) => {
                    if (error.id === pipeline.id) {
                      if (error.name.isValid) {
                        return nothing;
                      } else {
                        return html`<error-message
                          .error=${error.name.message}
                        ></error-message>`;
                      }
                    }
                  })}
                </div>
              </div>
              <div class="pipeline-stage">
                <paper-dropdown-menu
                  always-float-label
                  horizontal-align="right"
                  vertical-offset="50"
                  no-animations
                  allowOutsideScroll
                  label="Pipeline Stage *"
                  @value-changed=${(e) => this.addPipelineStage(e, pipeline.id)}
                >
                  <paper-listbox slot="dropdown-content">
                    ${pipelineStage.map(
                      (stage) => html`<paper-item>${stage}</paper-item>`
                    )}
                  </paper-listbox>
                </paper-dropdown-menu>
                <div>
                  ${this.pipelineError.map((error) => {
                    if (error.id === pipeline.id) {
                      if (error.stage.isValid) {
                        return nothing;
                      } else {
                        return html`<error-message
                          .error=${error.stage.message}
                        ></error-message>`;
                      }
                    }
                  })}
                </div>
              </div>
              ${pipeline.id != 0
                ? html`<paper-icon-button-light
                    @click=${this.deletePipeline}
                    class="delete-icon"
                  >
                    <button>
                      <iron-icon id=${pipeline.id} icon="delete"></iron-icon>
                    </button>
                  </paper-icon-button-light>`
                : nothing}
            </div>
          `
        )}

        <button @click=${this.addPipeline}>
          <div class="button-content">
            <paper-fab noink icon="add"> </paper-fab>
            <div class="button-text">Add Pipeline</div>
          </div>
        </button>

        <div></div>
      </div>
    `;
  }
}


/**
 * Defining and registration of component as 'project-pipeline'
 * 
*/
customElements.define('project-pipeline', ProjectPipeline);
