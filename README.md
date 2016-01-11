##Litbx

[Litbx](http://litbx.marcwieland.ch) is a small and easy to use lightbox. It's touch and developer friendly and works just out of the box. It's a lightweight web-plugin based on jQuery.

[![Build Status](https://travis-ci.org/marcwieland95/litbx.svg)](https://travis-ci.org/marcwieland95/litbx)

##Documentation
In progress

##ToDo
- Reduce JS in calculation function (improve) - achieve more trought css (flexbox)
- Improve margin/padding handling
- Rewritte title functions
- Don't hardcode arrow and close sizes inside css (height and width)
- Responsive: Populate changes on the fly (e.g arrow) -> Owl.Carousel = this.trigger('change', { property: { name: 'settings', value: settings } });

##Building
Build using Grunt and Bower. The following tasks are available:
- `default` Compiles script and styles into `/dist` folder
- `style` Only compiles styles into `/dist` folder
- `script` Only compiles script into `/dist` folder
- `test` Running tests

##Features
See [Trello-Board](https://trello.com/b/kjfwYtGe/litbx) to check future feature and current work state.

##Changelog
### Beta 2 (Sprint 2) - 19.10.2015
* Keyboard (2)
* Arrow-Handling (4)
* Preload (3)
* Divide into galleries (data-attr) (2)
* Overlay (stop scroll, color) (2)

### Beta 1 (Sprint 1) - 06.09.2015
* Bootstrap (3)
* Grunt, Bower and Travis (1)
* Image support (3)
* Calculate width and height (2)

##License
Litbx is Copyright © [Marc Wieland](http://marcwieland.ch) and is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
