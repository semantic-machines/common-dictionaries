/**
 * Example usage:
 * <div about="@" data-template="v-ui:StatusProgressTemplate" data-rel="v-s:hasStatus" data-status="v-s:StatusImplementation v-s:StatusReview v-s:StatusAgreed v-s:StatusDraft"></div>
 */

import IndividualModel from '/js/common/individual_model.js';
import {clear} from '/js/browser/dom_helpers.js';

export const post = async function (individual, template, container, mode, extra) {
  const {status, rel = 'v-s:hasStatus'} = container.dataset;
  individual.on(rel, renderStatus);
  template.addEventListener('remove', () => individual.off(rel, renderStatus));
  const statusContainer = template.querySelector('.statuses');
  renderStatus();

  async function renderStatus () {
    clear(statusContainer);
    const current = individual[rel][0];
    const statusUris = status.split(' ');
    await statusUris.reduce(async (p, statusUri) => {
      await p;
      const status = new IndividualModel(statusUri);
      const rendered = await status.present(statusContainer, statusTemplate);
      if (status === current) {
        rendered.querySelector('.status-image').classList.add('bd-' + status['v-s:tag'][0]);
        rendered.querySelector('.status-circle').classList.add('bg-' + status['v-s:tag'][0]);
        rendered.querySelector('.status-text').classList.add('text-' + status['v-s:tag'][0]);
      }
    }, await 0);
  }
};

const statusTemplate = `
  <li about="@" class="status">
    <div class="status-content">
      <div class="status-image">
        <span class="status-circle"><span class="status-circle-text"></span></span>
      </div>
      <strong class="status-text" about="@" data-template="v-ui:LabelTemplate"></strong>
    </div>
  </li>
`;

export const html = `
  <div>
    <style>
      .statuses {
        counter-reset: Serial;
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        overflow-x: auto;
      }
      .status-content {
        box-sizing: content-box;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .status-image {
        height: 3rem;
        width: 100%;
        position: relative;
        border-color: darkgray;
      }
      .status:first-of-type .status-image::before {
        display: none;
      }
      .status:last-of-type .status-image::after {
        display: none;
      }
      .status-circle-text::before {
        font-size: 1.5rem;
        font-weight: bold;
        counter-increment: Serial;
        content: counter(Serial);
      }
      .status-circle {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3rem;
        color: darkgray;
        border-width: 2px;
        border-style: solid;
        border-color: inherit;
        border-radius: 100%;
        background-color: white;
        z-index: 1;
      }
      .status-image::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        width: 50%;
        height: 2px;
        border-width: 1px;
        border-style: solid;
        border-color: inherit;
      }
      .status-image::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        width: 50%;
        height: 2px;
        left: 50%;
        border-width: 1px;
        border-style: solid;
        border-color: inherit;
      }
      .status-text {
        color: darkgray;
        word-break: break-all;
        margin-top: 0.25em;
        padding: 0 1rem;
      }
      .status .bg-default { background-color: dimgray; color: white; }
      .status .bg-success { background-color: #5cb85c; color: white; }
      .status .bg-warning { background-color: #f0ad4e; color: white; }
      .status .bg-primary { background-color: #337ab7; color: white; }
      .status .bg-info { background-color: #5bc0de; color: white; }
      .status .bg-danger { background-color: #d9534f; color: white; }

      .status .bd-default { border-color: dimgray; }
      .status .bd-success { border-color: #5cb85c; }
      .status .bd-warning { border-color: #f0ad4e; }
      .status .bd-primary { border-color: #337ab7; }
      .status .bd-info { border-color: #5bc0de; }
      .status .bd-danger { border-color: #d9534f; }

      .status .text-default { color: dimgray; }
      .status .text-success { color: #3c763d; }
      .status .text-warning { color: #8a6d3b; }
      .status .text-primary { color: #337ab7; }
      .status .text-info { color: #31708f; }
      .status .text-danger { color: #a94442; }
    </style>
    <ul class="statuses"></ul>
  </div>
`;
