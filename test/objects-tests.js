const assert = require('assert');
const tasks = require('../src/objects-tasks');
it.optional = require('../extensions/it-optional');

describe('objects-tasks', () => {
  it.optional('shallowCopy should return shallowCopy copy of an object', () => {
    [
      {
        obj: { a: 2, b: 5 },
        expected: { a: 2, b: 5 },
      },
      {
        obj: { a: 2, b: { a: [1, 2, 3] } },
        expected: { a: 2, b: { a: [1, 2, 3] } },
      },
      {
        obj: {},
        expected: {},
      },
    ].forEach((data) => {
      assert.deepStrictEqual(tasks.shallowCopy(data.obj), data.expected);
    });
  });

  it.optional('shallowCopy should not return the source object', () => {
    [
      {
        obj: { a: 2, b: 5 },
      },
      {
        obj: { a: 2, b: { a: [1, 2, 3] } },
      },
      {
        obj: {},
      },
    ].forEach((data) => {
      assert.notStrictEqual(tasks.shallowCopy(data.obj), data.obj);
    });
  });

  it.optional('mergeObjects should return merged object', () => {
    [
      {
        objects: [
          { a: 1, b: 2 },
          { b: 3, c: 5 },
        ],
        expected: { a: 1, b: 5, c: 5 },
      },
      {
        objects: [{ a: 1, b: 2 }],
        expected: { a: 1, b: 2 },
      },
      {
        objects: [],
        expected: {},
      },
    ].forEach((data) => {
      assert.deepStrictEqual(tasks.mergeObjects(data.objects), data.expected);
    });
  });

  it.optional('removeProperties should remove properties', () => {
    [
      {
        obj: { a: 1, b: 2, c: 3 },
        keys: ['b', 'c'],
        expected: { a: 1 },
      },
      {
        obj: { a: 1, b: 2, c: 3 },
        keys: ['d', 'e'],
        expected: { a: 1, b: 2, c: 3 },
      },
      {
        obj: { name: 'John', age: 30, city: 'New York' },
        keys: ['age'],
        expected: { name: 'John', city: 'New York' },
      },
    ].forEach((data) => {
      assert.deepStrictEqual(
        tasks.removeProperties(data.obj, data.keys),
        data.expected
      );
    });
  });

  it.optional(
    'compareObjects should return true if the objects are equal and false otherwise',
    () => {
      [
        {
          obj1: { a: 1, b: 2 },
          obj2: { a: 1, b: 2 },
          expected: true,
        },
        {
          obj1: { a: 1, b: 2 },
          obj2: { a: 1, b: 3 },
          expected: false,
        },
        {
          obj1: { a: 'value1' },
          obj2: { a: 'value2' },
          expected: false,
        },
      ].forEach((data) => {
        assert.equal(tasks.compareObjects(data.obj1, data.obj2), data.expected);
      });
    }
  );

  it.optional(
    'isEmptyObject should return true if the object is empty and false otherwise',
    () => {
      [
        {
          obj: { a: 1, b: 2 },
          expected: false,
        },
        {
          obj: {},
          expected: true,
        },
      ].forEach((data) => {
        assert.equal(tasks.isEmptyObject(data.obj), data.expected);
      });
    }
  );

  it.optional('makeImmutable should return immutable object', () => {
    const obj = { a: 1, b: 2 };
    const immutableObj = tasks.makeImmutable(obj);

    immutableObj.s = 5;
    assert.deepStrictEqual(immutableObj, obj);

    delete immutableObj.a;
    assert.deepStrictEqual(immutableObj, obj);

    immutableObj.newProp = 'new';
    assert.deepStrictEqual(immutableObj, obj);
  });

  it.optional('makeWord should return the word from letters', () => {
    [
      {
        obj: { a: [0, 1], b: [2, 3], c: [4, 5] },
        expected: 'aabbcc',
      },
      {
        obj: {
          H: [0],
          e: [1],
          l: [2, 3, 8],
          o: [4, 6],
          W: [5],
          r: [7],
          d: [9],
        },
        expected: 'HelloWorld',
      },
      {
        obj: {},
        expected: '',
      },
    ].forEach((data) => {
      assert.equal(tasks.makeWord(data.obj), data.expected);
    });
  });

  it.optional(
    'sellTickets should return true if the seller can sell tickets, false otherwise',
    () => {
      [
        {
          queue: [],
          expected: true,
        },
        {
          queue: [25, 25, 50],
          expected: true,
        },
        {
          queue: [25, 100],
          expected: false,
        },
        {
          queue: [25, 25, 25, 100],
          expected: true,
        },
        {
          queue: [25, 25, 25, 25, 50, 100, 50],
          expected: true,
        },
      ].forEach((data) => {
        assert.equal(tasks.sellTickets(data.queue), data.expected);
      });
    }
  );

  it.optional(
    'Rectangle constructor should return the rectangle object',
    () => {
      const rect = new tasks.Rectangle(10, 20);

      assert.equal(
        typeof rect,
        'object',
        'Result of Rectangle constructor should be an object'
      );
      assert(
        Object.prototype.hasOwnProperty.call(rect, 'width'),
        'Result of Rectangle constructor should be an object with "width" property'
      );
      assert.equal(
        rect.width,
        10,
        'Result of new Rectangle(10,20) should be an object with "width" property equals to 10'
      );
      assert(
        Object.prototype.hasOwnProperty.call(rect, 'height'),
        'Result of new Rectangle(10,20) should be an object with "height" property'
      );
      assert.equal(
        rect.width,
        10,
        'Result of new Rectangle(10,20) should be an object with "height" property equals to 20'
      );
      assert.equal(
        typeof rect.getArea,
        'function',
        'Result of Rectangle constructor should be an object with "getArea" method'
      );
      assert.equal(
        rect.getArea(),
        200,
        'Result of (new Rectangle(10,20)).getArea() should return the correct area of specified rectangle'
      );
      assert.equal(
        new tasks.Rectangle(3, 8).getArea(),
        24,
        'Result of (new Rectangle(3,8)).getArea() should return the correct area of specified rectangle'
      );
    }
  );

  it.optional(
    'getJSON should return the JSON representation of specified object',
    () => {
      [
        {
          obj: [1, 2, 3],
          expected: '[1,2,3]',
        },
        {
          obj: { height: 10, width: 20 },
          expected: '{"height":10,"width":20}',
        },
      ].forEach((data) => {
        assert.equal(tasks.getJSON(data.obj), data.expected);
      });
    }
  );

  it.optional(
    'fromJSON should return the object of specified type from JSON representation',
    () => {
      const Circle = function Circle(radius) {
        this.radius = radius;
      };

      Circle.prototype.getCircumference = function getCircumference() {
        return 2 * Math.PI * this.radius;
      };

      const MockType = function MockType(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
      };

      [
        {
          proto: Circle.prototype,
          json: '{ "radius":10 }',
          expected: new Circle(10),
        },
        {
          proto: MockType.prototype,
          json: '{ "a":10, "b":20, "c":30 }',
          expected: new MockType(10, 20, 30),
        },
      ].forEach((data) => {
        const actual = tasks.fromJSON(data.proto, data.json);
        assert.deepEqual(
          actual,
          data.expected,
          'fromJson method shoud restore all properties from json'
        );
        const actualProto = Object.getPrototypeOf(actual);
        const expectedProto = Object.getPrototypeOf(data.expected);
        assert.equal(
          actualProto,
          expectedProto,
          'fromJson method shoud restore type from prototype argument'
        );
      });
    }
  );

  it.optional(
    'sortCitiesArray should sort the array of objects using two keys',
    () => {
      [
        {
          arr: [
            { country: 'Russia', city: 'Moscow' },
            { country: 'Belarus', city: 'Minsk' },
            { country: 'Poland', city: 'Warsaw' },
            { country: 'Russia', city: 'Saint Petersburg' },
            { country: 'Poland', city: 'Krakow' },
            { country: 'Belarus', city: 'Brest' },
          ],
          expected: [
            { country: 'Belarus', city: 'Brest' },
            { country: 'Belarus', city: 'Minsk' },
            { country: 'Poland', city: 'Krakow' },
            { country: 'Poland', city: 'Warsaw' },
            { country: 'Russia', city: 'Moscow' },
            { country: 'Russia', city: 'Saint Petersburg' },
          ],
        },
        {
          arr: [
            { country: 'D', city: '1' },
            { country: 'E', city: '1' },
            { country: 'A', city: '2' },
            { country: 'B', city: '1' },
            { country: 'B', city: '2' },
            { country: 'A', city: '1' },
          ],
          expected: [
            { country: 'A', city: '1' },
            { country: 'A', city: '2' },
            { country: 'B', city: '1' },
            { country: 'B', city: '2' },
            { country: 'D', city: '1' },
            { country: 'E', city: '1' },
          ],
        },
        {
          arr: [
            { country: '5', city: '1' },
            { country: '1', city: '1' },
            { country: '1', city: '2' },
            { country: '1', city: '3' },
            { country: '2', city: '2' },
            { country: '1', city: '1' },
            { country: '1', city: '1' },
            { country: '2', city: '1' },
            { country: '3', city: '1' },
            { country: '3', city: '3' },
            { country: '2', city: '5' },
            { country: '5', city: '2' },
          ],
          expected: [
            { country: '1', city: '1' },
            { country: '1', city: '1' },
            { country: '1', city: '1' },
            { country: '1', city: '2' },
            { country: '1', city: '3' },
            { country: '2', city: '1' },
            { country: '2', city: '2' },
            { country: '2', city: '5' },
            { country: '3', city: '1' },
            { country: '3', city: '3' },
            { country: '5', city: '1' },
            { country: '5', city: '2' },
          ],
        },
      ].forEach((data) => {
        const actual = tasks.sortCitiesArray(data.arr);
        assert.deepEqual(data.expected, actual);
      });
    }
  );

  it.optional(
    'group should return a map of grouped data by key and value selector',
    () => {
      [
        {
          arr: [
            { country: 'Belarus', city: 'Brest' },
            { country: 'Russia', city: 'Omsk' },
            { country: 'Russia', city: 'Samara' },
            { country: 'Belarus', city: 'Grodno' },
            { country: 'Belarus', city: 'Minsk' },
            { country: 'Poland', city: 'Lodz' },
          ],
          keySelector: (item) => item.country,
          valueSelector: (item) => item.city,
          expected: new Map([
            ['Belarus', ['Brest', 'Grodno', 'Minsk']],
            ['Russia', ['Omsk', 'Samara']],
            ['Poland', ['Lodz']],
          ]),
        },
        {
          arr: [
            { artist: 'ACDC', album: 'Highway to Hell' },
            { artist: 'Metallica', album: "Kill'em All" },
            { artist: 'Deep Purple', album: 'Machine Head' },
            { artist: 'Metallica', album: 'And Justice for All' },
            { artist: 'ACDC', album: 'Back in Black' },
            { artist: 'Manowar', album: 'Kings of Metal' },
          ],
          keySelector: (item) => item.artist,
          valueSelector: (item) => item.album,
          expected: new Map([
            ['ACDC', ['Highway to Hell', 'Back in Black']],
            ['Metallica', ["Kill'em All", 'And Justice for All']],
            ['Deep Purple', ['Machine Head']],
            ['Manowar', ['Kings of Metal']],
          ]),
        },
      ].forEach((data) => {
        const actual = tasks.group(
          data.arr,
          data.keySelector,
          data.valueSelector
        );
        assert.deepEqual(Array.from(data.expected), Array.from(actual));
      });
    }
  );

  it.optional(
    'cssSelectorBuilder should creates css selector object with stringify() method',
    () => {
      const builder = tasks.cssSelectorBuilder;

      // Test simple selectors
      assert.equal(builder.element('div').stringify(), 'div');
      assert.equal(builder.id('nav-bar').stringify(), '#nav-bar');
      assert.equal(builder.class('warning').stringify(), '.warning');
      assert.equal(builder.attr('href$=".png"').stringify(), '[href$=".png"]');
      assert.equal(builder.pseudoClass('invalid').stringify(), ':invalid');
      assert.equal(
        builder.pseudoElement('first-letter').stringify(),
        '::first-letter'
      );

      // Test complex selectors
      assert.equal(builder.element('li').id('main').stringify(), 'li#main');
      assert.equal(
        builder.element('div').class('container').stringify(),
        'div.container'
      );
      assert.equal(
        builder
          .element('div')
          .class('container')
          .class('clickable')
          .stringify(),
        'div.container.clickable'
      );
      assert.equal(
        builder.id('main').class('container').class('editable').stringify(),
        '#main.container.editable'
      );
      assert.equal(
        builder.element('li').id('home-menu').class('active').stringify(),
        'li#home-menu.active'
      );
      assert.equal(
        builder
          .class('container')
          .class('nav-bar')
          .class('navbar-inverted')
          .stringify(),
        '.container.nav-bar.navbar-inverted'
      );
      assert.equal(
        builder
          .element('a')
          .attr('href$=".png"')
          .pseudoClass('focus')
          .stringify(),
        'a[href$=".png"]:focus'
      );
      assert.equal(
        builder
          .element('p')
          .pseudoClass('first-of-type')
          .pseudoElement('first-letter')
          .stringify(),
        'p:first-of-type::first-letter'
      );
      assert.equal(
        builder
          .element('input')
          .pseudoClass('focus')
          .pseudoClass('invalid')
          .stringify(),
        'input:focus:invalid'
      );

      // Test combined selectors
      assert.equal(
        builder
          .combine(
            builder.element('p').pseudoClass('focus'),
            '>',
            builder.element('a').attr('href$=".png"')
          )
          .stringify(),
        'p:focus > a[href$=".png"]'
      );

      assert.equal(
        builder
          .combine(
            builder.element('p').id('introduction'),
            '~',
            builder.element('img').attr('href$=".png"')
          )
          .stringify(),
        'p#introduction ~ img[href$=".png"]'
      );

      assert.equal(
        builder
          .combine(
            builder.id('charter1').class('touch'),
            '+',
            builder.element('table')
          )
          .stringify(),
        '#charter1.touch + table'
      );

      assert.equal(
        builder
          .combine(
            builder.element('ul').class('animable'),
            ' ',
            builder.element('li').pseudoClass('nth-of-type(1)')
          )
          .stringify(),
        'ul.animable   li:nth-of-type(1)'
      );

      assert.equal(
        builder
          .combine(
            builder
              .element('div')
              .id('main')
              .class('container')
              .class('draggable'),
            '+',
            builder.combine(
              builder.element('table').id('data'),
              '~',
              builder.combine(
                builder.element('tr').pseudoClass('nth-of-type(even)'),
                ' ',
                builder.element('td').pseudoClass('nth-of-type(even)')
              )
            )
          )
          .stringify(),
        'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
      );

      // Test validation
      [
        () => builder.element('table').element('div'),
        () => builder.id('id1').id('id2'),
        () => builder.pseudoElement('after').pseudoElement('before'),
      ].forEach((fn) => {
        assert.throws(
          fn,
          /Element, id and pseudo-element should not occur more then one time inside the selector/,

          '\nPlease throw an exception "Element, id and pseudo-element should not occur more then one time inside the selector" ' +
            'if element, id or pseudo-element occurs twice or more times'
        );
      });

      [
        () => builder.class('draggable').class('animated'),
        () => builder.attr('href').attr('title'),
        () => builder.pseudoClass('invalid').pseudoClass('focus'),
      ].forEach((fn) => {
        assert.doesNotThrow(
          fn,
          /Element, id and pseudo-element should not occur more then one time inside the selector/
        );
      });

      [
        () => builder.id('id').element('div'),
        () => builder.class('main').id('id'),
        () => builder.attr('href').class('download-link'),
        () => builder.pseudoClass('hover').attr('title'),
        () => builder.pseudoElement('after').pseudoClass('valid'),
        () => builder.pseudoElement('after').id('id'),
      ].forEach((fn) => {
        assert.throws(
          fn,
          /Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element/,

          '\nPlease throw an exception "Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element" ' +
            'if selector parts arranged in an invalid order.'
        );
      });
    }
  );
});

describe('object-tasks optimal implementation', () => {
  it.optional('optimal implementation of shallowCopy', function test() {
    const fnStr = tasks.shallowCopy.toString();
    if (!fnStr.includes('return')) {
      this.skip();
    }
    assert.equal(
      fnStr.includes('assign'),
      true,
      'You need to use a different method, look for the appropriate method in the documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object'
    );
  });

  it.optional('optimal implementation of mergeObjects', function test() {
    const fnStr = tasks.mergeObjects.toString();
    if (!fnStr.includes('return')) {
      this.skip();
    }
    assert.equal(
      fnStr.includes('entries'),
      true,
      'You need to use a different method, look for the appropriate method in the documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object'
    );
  });

  it.optional('optimal implementation of removeProperties', function test() {
    const fnStr = tasks.removeProperties.toString();
    if (!fnStr.includes('return')) {
      this.skip();
    }
    assert.equal(
      fnStr.includes('delete'),
      true,
      'You need to use a different method, look for the appropriate method in the documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object'
    );
  });

  it.optional('optimal implementation of isEmptyObject', function test() {
    const fnStr = tasks.isEmptyObject.toString();
    if (!fnStr.includes('return')) {
      this.skip();
    }
    assert.equal(
      fnStr.includes('keys'),
      true,
      'You need to use a different method, look for the appropriate method in the documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object'
    );
  });

  it.optional('optimal implementation of makeImmutable', function test() {
    const fnStr = tasks.makeImmutable.toString();
    if (!fnStr.includes('return')) {
      this.skip();
    }
    assert.equal(
      fnStr.includes('freeze'),
      true,
      'You need to use a different method, look for the appropriate method in the documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object'
    );
  });
});
