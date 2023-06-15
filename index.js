// Get all draggable elements
const draggableElements = document.querySelectorAll("[draggable='true']");

function onDragstart(event) {
  if (typeof event.target.id !== "string") {
    // Throw an error if the element has no id
    throw new Error("Draggable element must have an id");
  }

  // Set the drag's format and data. This data will be dropped on our target
  event.dataTransfer.setData("text/plain", event.target.id);
}

function onDragenter(event) {
  // Prevent default behavior to allow drop
  event.preventDefault();
}

function onDragover(event) {
  // Prevent default behavior to allow drop
  event.preventDefault();
}

function onDrop(event) {
  // Get the id of the draggable element
  const id = event.dataTransfer.getData("text/plain");

  // Get the draggable element
  const draggableElement = document.getElementById(id);

  if (!(draggableElement instanceof HTMLElement)) {
    // Throw an error if the element is not an HTMLElement
    throw new Error("Draggable element must be an HTMLElement");
  }

  // Clone the draggable element so that we can safely replace it
  const draggableCloneElement = draggableElement.cloneNode(true);

  // Get the droppable element
  const droppableElement = event.target;

  // Clone the droppable element so that we can safely replace it
  const droppableElementClone = droppableElement.cloneNode(true);

  // Replace the draggable element with the droppable element
  droppableElement.replaceWith(draggableCloneElement);

  // Replace the droppable element with the draggable element
  draggableElement.replaceWith(droppableElementClone);

  // Add the necessary listeners to the draggable element
  draggableCloneElement.addEventListener("dragstart", onDragstart);
  draggableCloneElement.addEventListener("dragenter", onDragenter);
  draggableCloneElement.addEventListener("dragover", onDragover);
  draggableCloneElement.addEventListener("drop", onDrop);

  // Add the necessary listeners to the droppable element
  droppableElementClone.addEventListener("dragstart", onDragstart);
  droppableElementClone.addEventListener("dragenter", onDragenter);
  droppableElementClone.addEventListener("dragover", onDragover);
  droppableElementClone.addEventListener("drop", onDrop);

  // Remove the old listeners from the draggable element to avoid memory leaks
  draggableElement.removeEventListener("dragstart", onDragstart);
  draggableElement.removeEventListener("dragenter", onDragenter);
  draggableElement.removeEventListener("dragover", onDragover);
  draggableElement.removeEventListener("drop", onDrop);

  // Remove the old listeners from the droppable element to avoid memory leaks
  droppableElement.removeEventListener("dragstart", onDragstart);
  droppableElement.removeEventListener("dragenter", onDragenter);
  droppableElement.removeEventListener("dragover", onDragover);
  droppableElement.removeEventListener("drop", onDrop);

  // Delete the old transfered data
  event.dataTransfer.clearData();

  // Delete the old elements
  draggableElement.remove();
  droppableElement.remove();
}

function onDraggableElement(draggableElement) {
  // Add the necessary listeners to the draggable element
  draggableElement.addEventListener("dragstart", onDragstart);
  draggableElement.addEventListener("dragenter", onDragenter);
  draggableElement.addEventListener("dragover", onDragover);
  draggableElement.addEventListener("drop", onDrop);
}

// Loop through the draggable elements and add the necessary listeners
draggableElements.forEach(onDraggableElement);
