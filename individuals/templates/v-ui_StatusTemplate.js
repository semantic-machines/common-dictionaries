import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (individual.hasValue('v-s:tag')) {
    template.addClass('label-' + individual['v-s:tag']);
  } else {
    template.addClass('label-tiled');
  }
};

export const html = `
  <span about="@" class="label margin-xs-h" property="rdfs:label"></span>
`;
