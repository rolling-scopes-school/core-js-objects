/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 * Возвращает поверхностную копию объекта.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 * Объединяет массив объектов в один объект.
 * Если есть пересекающиеся ключи, их значения должны быть суммированы.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  return objects.reduce((acc, obj) => {
    const newResult = { ...acc };
    Object.entries(obj).forEach(([key, value]) => {
      if (newResult[key]) {
        newResult[key] += value;
      } else {
        newResult[key] = value;
      }
    });
    return newResult;
  }, {});
}

/**
 * Removes a properties from an object.
 * Удаляет свойства из объекта.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {Array} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, 'age') => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 * Сравнивает два объекта. Возвращает true, если объекты равны, и false в противном случае.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  return keys1.every((key) => obj1[key] === obj2[key]);
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 * Проверяет, пуст ли объект.
 * Возвращает true, если объект не содержит перечисляемых свойств, и false в противном случае.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 * Делает объект неизменяемым, предотвращая любые изменения его свойств.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 * Возвращает слово, составленное из букв, позиции которых заданы в объекте.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const wordArray = [];
  Object.keys(lettersObject).forEach((letter) => {
    lettersObject[letter].forEach((position) => {
      wordArray[position] = letter;
    });
  });
  return wordArray.join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 * Проверяет, может ли продавец билетов продать все билеты,
 * учитывая, что у него изначально нет денег для сдачи. Билет стоит 25,
 * и клиенты платят купюрами 25, 50 или 100.
 * Продавец должен выдавать сдачу строго в порядке очереди,
 * и он может использовать только те деньги, которые уже получил от предыдущих клиентов.
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  let bills25 = 0;
  let bills50 = 0;

  const canSellAll = queue.every((bill) => {
    if (bill === 25) {
      bills25 += 1;
    } else if (bill === 50) {
      if (bills25 >= 1) {
        bills50 -= 1;
        bills50 += 1;
      } else {
        return false;
      }
    } else if (bill === 100) {
      if (bills50 >= 1 && bills25 >= 1) {
        bills50 -= 1;
        bills25 -= 1;
      } else if (bills25 >= 3) {
        bills25 -= 3;
      } else {
        return false;
      }
    } else {
      return false;
    }
    return true;
  });
  return canSellAll;
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 * Возвращает объект прямоугольника с параметрами ширины и высоты и методом getArea().
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = function getArea() {
    return this.width * this.height;
  };
}

/**
 * Returns the JSON representation of specified object
 * Возвращает JSON-представление указанного объекта.
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 * Возвращает объект указанного типа из JSON-представления.
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const data = JSON.parse(json);
  return Object.assign(Object.create(proto), data);
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 * Сортирует массив объектов по названию страны и города в порядке возрастания.
 *
 * @param {array} arr
 * @return {array}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  return arr.slice().sort((a, b) => {
    const countryCompare = a.country.localeCompare(b.country);
    return countryCompare !== 0 ? countryCompare : a.city.localeCompare(b.city);
  });
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * Сгруппируйте элементы указанного массива по ключу.
 * Верните multimap, где ключи извлекаются из элементов массива
 * с помощью функции keySelector, а значения — с помощью valueSelector.
 * Мультиотображение должно содержать для каждого ключа массив соответствующих значений.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @param {array} array
 * @param {Function} keySelector
 * @param {Function} valueSelector
 * @return {Map}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const multimap = new Map();

  array.forEach((item) => {
    const key = keySelector(item);
    const value = valueSelector(item);

    if (multimap.has(key)) {
      multimap.get(key).push(value);
    } else {
      multimap.set(key, [value]);
    }
  });
  return multimap;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * Разработать один класс, независимые классы или иерархию классов и
 * реализовать функциональность для создания CSS-селекторов с помощью
 * предоставленного объекта cssSelectorBuilder
 * Каждый селектор должен иметь метод stringify(), который возвращает
 * строковое представление селектора в соответствии с CSS-спецификацией.
 *
 * Предоставленный объект cssSelectorBuilder используется только как
 * фасад для создания собственных классов. Например, первый метод
 * объекта cssSelectorBuilder может выглядеть так:
 * element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *Дизайн классов полностью на ваше усмотрение, 
 но постарайтесь сделать его максимально простым, понятным и читаемым.
 * 
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */
class Selector {
  constructor() {
    this.parts = [];
    this.lastAddedType = null;
  }

  checkOrder(type) {
    const order = [
      'element',
      'id',
      'class',
      'attr',
      'pseudoClass',
      'pseudoElement',
    ];
    if (this.lastAddedType) {
      const lastIndex = order.indexOf(this.lastAddedType);
      const currentIndex = order.indexOf(type);
      if (currentIndex < lastIndex) {
        throw new Error(
          'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
        );
      }
    }
    this.lastAddedType = type;
  }

  element(value) {
    this.checkOrder('element');
    if (this.parts.some((part) => part.type === 'element')) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.parts.push({ type: 'element', value });
    return this;
  }

  id(value) {
    this.checkOrder('id');
    if (this.parts.some((part) => part.type === 'id')) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.parts.push({ type: 'id', value });
    return this;
  }

  class(value) {
    this.checkOrder('class');
    this.parts.push({ type: 'class', value });
    return this;
  }

  attr(value) {
    this.checkOrder('attr');
    this.parts.push({ type: 'attr', value });
    return this;
  }

  pseudoClass(value) {
    this.checkOrder('pseudoClass');
    this.parts.push({ type: 'pseudoClass', value });
    return this;
  }

  pseudoElement(value) {
    this.checkOrder('pseudoElement');
    if (this.parts.some((part) => part.type === 'pseudoElement')) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.parts.push({ type: 'pseudoElement', value });
    return this;
  }

  stringify() {
    return this.parts
      .map((part) => {
        switch (part.type) {
          case 'element':
            return part.value;
          case 'id':
            return `#${part.value}`;
          case 'class':
            return `.${part.value}`;
          case 'attr':
            return `[${part.value}]`;
          case 'pseudoClass':
            return `:${part.value}`;
          case 'pseudoElement':
            return `::${part.value}`;
          default:
            return '';
        }
      })
      .join('');
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new Selector().element(value);
  },
  id(value) {
    return new Selector().id(value);
  },
  class(value) {
    return new Selector().class(value);
  },
  attr(value) {
    return new Selector().attr(value);
  },
  pseudoClass(value) {
    return new Selector().pseudoClass(value);
  },
  pseudoElement(value) {
    return new Selector().pseudoElement(value);
  },
  combine(selector1, combinator, selector2) {
    return {
      stringify: () =>
        `${selector1.stringify()} ${combinator} ${selector2.stringify()}`,
    };
  },
};

module.exports = {
  cssSelectorBuilder,
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
