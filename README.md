# README for DataroomElement Class

## Overview
The `DataroomElement` class is an extended `HTMLElement` designed to facilitate the creation of web components, especially for interacting with a dataroom-like environment. This class provides a robust foundation for managing the lifecycle of custom elements, handling server communication, and responding to DOM changes.

## Features
- **Lifecycle Management:** The class handles the standard lifecycle callbacks of custom elements, such as `connectedCallback` and `disconnectedCallback`.
- **Initialization and Cleanup:** `initialize` and `disconnect` methods can be overridden in derived classes for custom initialization and cleanup procedures.
- **Server Communication:** A `fetch` helper method simplifies server interactions with automatic handling of tokens and JSON conversion.
- **DOM Observation:** The class automatically observes changes in its child elements and attributes, providing hooks for custom behavior.
- **Event Handling:** Utility methods for emitting custom events streamline the process of event-driven programming.

## Usage

### Extending the Class
To use `DataroomElement`, create a new class that extends it. Override the `initialize` and `disconnect` methods to add custom behavior during the component's connection and disconnection from the DOM.

```javascript
class MyCustomElement extends DataroomElement {
  async initialize() {
    // Custom initialization code here
  }

  async disconnect() {
    // Custom cleanup code here
  }
}

customElements.define('element-tag-name', MyCustomelement)
```

### Lifecycle Callbacks
- `connectedCallback`: Automatically invoked when the element is attached to the DOM. It initiates various setup procedures like child node observation.
- `disconnectedCallback`: Invoked when the element is removed from the DOM, ensuring cleanup of observers.

### Server Communication
Use the `fetch` method for server interactions. It automatically handles bearer tokens and JSON formatting.

```javascript
async function getData() {
  try {
    const data = await this.fetch('https://api.example.com/data');
    // Handle data
  } catch (error) {
    // Handle error
  }
}
```

### Observing DOM Changes
- `observeChildChanges`: Sets up an observer for changes in the element's child nodes and attributes.
- `htmlObjectChanged`: Override this method to handle specific mutation events.

### Emitting Events
- `dtrmEvent`: Simplifies the process of dispatching custom events.
  
```javascript
this.dtrmEvent('custom-event', { key: 'value' });
```

### Handling Child Nodes
- `stepThroughChildNodes`: Recursively steps through child nodes, emitting events for each.

## Best Practices
- Always call `super.connectedCallback()` and `super.disconnectedCallback()` if overriding these methods in a derived class.
- Use the `fetch` method for consistent server communication.
- Leverage custom events for communicating with parent elements or other components.

## Conclusion
The `DataroomElement` class provides a powerful and flexible foundation for creating custom web components, particularly suited for applications requiring robust lifecycle management, server communication, and dynamic response to DOM changes.
