var classes = require('classes'),
    domify = require('domify'),
    html = require('./template');

function prepend(parent, child) {
  parent.insertBefore(child, parent.firstChild);
}

function FilePicker() {

}

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

  prepend(document.body, this.el);
  classes(this.el).add('trans');
};

module.exports = FilePicker;