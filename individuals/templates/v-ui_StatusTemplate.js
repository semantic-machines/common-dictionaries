import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  template.addClass("label-"+individual["v-s:tag"]);
};

export const html = `
<span about="@" class="label margin-xs-h" property="rdfs:label"></span>
`;