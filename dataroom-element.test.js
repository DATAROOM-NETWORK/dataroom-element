/**
 * @jest-environment jsdom
 */

import DataroomElement from './dataroom-element.js';

// Mock the fetch call made by the DataroomElement
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ test: 'value' }),
  })
);

describe('DataroomElement events', () => {
  let testElement;

  beforeEach(() => {
    // Define the custom element if it hasn't been defined
    if (!customElements.get('dataroom-element')) {
      customElements.define('dataroom-element', DataroomElement);
    }
    document.body.innerHTML = `<dataroom-element id="test_element"></dataroom-element>`;
    testElement = document.getElementById('test_element');
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(testElement);
    jest.clearAllMocks(); // Reset mock function's usage data
  });

  test('NODE-ADDED event is dispatched', done => {
    testElement.addEventListener('NODE-ADDED', (e) => {
      expect(e.detail).toBeDefined();
      expect(e.detail.node).toBeDefined();
      done();
    });

    // Simulate adding a new element to trigger the NODE-ADDED event
    const newElement = document.createElement('div');
    testElement.appendChild(newElement);
  });

  test('NODE-REMOVED event is dispatched', done => {
    const newElement = document.createElement('div');
    testElement.appendChild(newElement);

    testElement.addEventListener('NODE-REMOVED', (e) => {
      expect(e.detail).toBeDefined();
      expect(e.detail.node).toBeDefined();
      done();
    });

    // Remove the element to trigger the NODE-REMOVED event
    newElement.remove();
  });

  test('NODE-CHANGED event is dispatched on attribute change', done => {
    testElement.addEventListener('NODE-CHANGED', (e) => {
      expect(e.detail).toBeDefined();
      expect(e.detail.attribute).toBe('test');
      expect(e.detail.newValue).toBe('value');
      done();
    });

    // Simulate attribute change to trigger the NODE-CHANGED event
    testElement.setAttribute('test', 'value');
  });

  // Additional tests for async operations and fetch calls can be added here
});
