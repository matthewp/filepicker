var classes = require('classes'),
    domify = require('domify'),
    each = require('each'),
    html = require('./template');

/*
** Prepend an element to the parent.
 */
function prepend(parent, child) {
  parent.insertBefore(child, parent.firstChild);
}

/*
** Clear a DOM element
 */
function clear(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

/*
** Shortcut for createElement
 */
function cEl(type) {
  return document.createElement(type);
}

function FilePicker() {
  this.engines = [];
}

FilePicker.prototype.engine = function (engine) {
  this.engines.push(engine);
  return this;
};

FilePicker.prototype.show = function () {
  if (!this.el) {
    this.render();
  }

  classes(this.el).add('open');
  this.visible = true;
  return this;
};

FilePicker.prototype.hide = function () {
  classes(this.el).remove('open');
  this.visible = false;
  return this;
};

FilePicker.prototype.toggle = function () {
  if (this.visible) {
    this.hide();
  } else {
    this.show();
  }

  return this;
};

FilePicker.prototype.render = function () {
  this.el = domify(html)[0];
  this.list = this.el.getElementsByClassName('filepicker-files')[0];
  this.crumbs = this.el.getElementsByClassName('filepicker-path')[0];

  prepend(document.body, this.el);
  classes(this.el).add('trans');
};

FilePicker.prototype.setCrumbs = function (path) {
  clear(this.crumbs);
  var paths = path.split('/');
  var self = this;
  each(paths, function (p, i) {
    var li = cEl('li'), el;
    if (i == paths.length - 1) {
      el = cEl('span');
    } else {
      el = cEl('a');
      el.href = '#';
      el.onclick = function (e) {
        e.preventDefault();
        self.load(paths.slice(0, i + 1).join('/'));
      };
    }
    text(el, p || "/");
    li.appendChild(el);
    self.crumbs.appendChild(li);
  });
};

FilePicker.setList = function () {

};

module.exports = FilePicker;