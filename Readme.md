# Alpha version, use cautiously

# filepicker

  A generic FilePicker UI [component](https://github.com/component/component). Intentionally minimally styled to allow you to style it to match your app.

  ![filepicker component](http://i.imgur.com/p4RO6vz.png)

  Probably you'll also want to include an engine in your component.json. So far there are:

  * [Dropbox](https://github.com/matthewp/filepicker-dropbox)

## Installation

    $ component install matthewp/filepicker

## Example
  
```javascript
var FilePicker = require('filepicker'),
    DropboxEngine = require('filepicker-dropbox'),
    filePicker = new FilePicker()
      .engine(new DropBoxEngine('myapikey'));

filePicker.on('fileselected', function(dirEntry) {
  dirEntry.read(function(arrayBuffer) {
    // Do something with the data
  });
});
``` 

## API

### FilePicker#show()

Show the file picker element.

### FilePicker#hide()

Hide the file picker element.

### FilePicker#toggle()

Toggle showing/hiding the file picker element.

### FilePicker#classes

An instance of the [classes component](https://github.com/component/classes) which will allow you to attach your own css classes to the parent element.

### FilePicker#engine(instance)

Add the engine ``instance`` to the file picker. An engine instance represents a source of data the user can upload from such as Dropbox, Google Drive, SkyDrive, etc.

### FilePicker#on('fileselected', callback)

When the user selects a given file, the ``callback`` will be called with a ``DirectoryEntry`` instance passed as the only parameter.

## License

  MIT
