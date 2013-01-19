var classes = require('classes'),
    domify = require('domify'),
    each = require('each'),
    Emitter = require('emitter'),
    html = require('./template'),
    text = require('text');

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

Emitter(FilePicker.prototype);

FilePicker.prototype.engine = function (engine) {
  var self = this;
  engine.on('progress', function(info) {
    self.emit('progress', info);
  });

  this.engines.push(engine);
  return this;
};

FilePicker.prototype.show = function () {
  if (!this.el) {
    this.render();
  }

  this.classes.add('open');
  this.visible = true;
  return this;
};

FilePicker.prototype.hide = function () {
  this.classes.remove('open');
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
  this.classes = classes(this.el);
  this.list = this.el.getElementsByClassName('filepicker-files')[0];
  this.crumbs = this.el.getElementsByClassName('filepicker-path')[0];
  this.sources = this.el.getElementsByClassName('filepicker-sources')[0];
  this.renderEngines();

  prepend(document.body, this.el);
  this.classes.add('trans');
};

FilePicker.prototype.load = function(dir, engine) {
  var self = this;
  this.renderCrumbs(dir, engine);
  clear(this.list);
  engine.fetchDir(dir, function(results) {
    each(results, function(result) {
      var li = cEl('li'),
          anchor = cEl('a');

      anchor.href = '#';
      anchor.onclick = function(e) { e.preventDefault(); self.itemSelected(result, engine); };
      text(anchor, result.name);

      li.appendChild(anchor);
      self.list.appendChild(li);
    });
  });
};

FilePicker.prototype.renderEngines = function() {
  clear(this.sources);

  var self = this;
  each(this.engines, function(engine) {
    var li = cEl('li'),
        anchor = cEl('a'),
        span = cEl('span');

    anchor.href = '#';
    anchor.onclick = function(e) {
      e.preventDefault();
      self.load('', engine);
    };
    text(span, engine.name);
    anchor.appendChild(span);
    li.appendChild(anchor);
    self.sources.appendChild(li);
  });
};

FilePicker.prototype.renderCrumbs = function (path, engine) {
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
        self.load(paths.slice(0, i + 1).join('/'), engine);
      };
    }
    text(el, p || "/");
    li.appendChild(el);
    self.crumbs.appendChild(li);
  });
};

FilePicker.prototype.itemSelected = function(item, engine) {
  if(item.type === 'folder') {
    this.load(item.path, engine);
    return;
  }

  this.emit('fileselected', item);
};

module.exports = FilePicker;
