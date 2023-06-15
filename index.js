// Récupération des éléments à déplacer
const draggableElements = document.querySelectorAll("[draggable='true']");

function onDragstart(event) {
  if (typeof event.target.id !== "string") {
    // Si l'élément déplacé n'a pas d'identifiant, on arrête la fonction
    throw new Error("Draggable element must have an id");
  }

  // Récupération de l'identifiant de l'élément ciblé
  event.dataTransfer.setData("text/plain", event.target.id);
}

function onDragenter(event) {
  // Prévient le comportement par défaut pour permettre le drop
  event.preventDefault();
}

function onDragover(event) {
  // Prévient le comportement par défaut pour permettre le drop
  event.preventDefault();
}

function onDrop(event) {
  // Récupération de l'identifiant de l'élément déplacé
  const id = event.dataTransfer.getData("text/plain");

  // Récupération de l'élément déplacé
  const draggableElement = document.getElementById(id);

  if (!(draggableElement instanceof HTMLElement)) {
    // Si l'élément déplacé n'est pas un HTMLElement, on arrête la fonction
    throw new Error("Draggable element must be an HTMLElement");
  }

  // Récupération des éléments
  const draggableCloneElement = draggableElement.cloneNode(true);
  const droppableElement = event.target;
  const droppableElementClone = droppableElement.cloneNode(true);

  // Remplacement des éléments
  droppableElement.replaceWith(draggableCloneElement);
  draggableElement.replaceWith(droppableElementClone);

  // Ajout des événements de drag and drop sur les nouveaux éléments
  draggableCloneElement.addEventListener("dragstart", onDragstart);
  draggableCloneElement.addEventListener("dragenter", onDragenter);
  draggableCloneElement.addEventListener("dragover", onDragover);
  draggableCloneElement.addEventListener("drop", onDrop);

  // Ajout des événements de drag and drop sur les nouveaux éléments
  droppableElementClone.addEventListener("dragstart", onDragstart);
  droppableElementClone.addEventListener("dragenter", onDragenter);
  droppableElementClone.addEventListener("dragover", onDragover);
  droppableElementClone.addEventListener("drop", onDrop);

  // Suppression des données de l'élément déplacé
  event.dataTransfer.clearData();

  // Suppression des événements de drag and drop pour éviter les doublons
  draggableElement.removeEventListener("dragstart", onDragstart);
  draggableElement.removeEventListener("dragenter", onDragenter);
  draggableElement.removeEventListener("dragover", onDragover);
  draggableElement.removeEventListener("drop", onDrop);

  // Suppression des événements de drag and drop pour éviter les doublons
  droppableElement.removeEventListener("dragstart", onDragstart);
  droppableElement.removeEventListener("dragenter", onDragenter);
  droppableElement.removeEventListener("dragover", onDragover);
  droppableElement.removeEventListener("drop", onDrop);

  // Suppression des anciens éléments
  draggableElement.remove();
  droppableElement.remove();
}

function onDraggableElement(draggableElement) {
  // Ajout des événements de drag and drop sur les éléments
  draggableElement.addEventListener("dragstart", onDragstart);
  draggableElement.addEventListener("dragenter", onDragenter);
  draggableElement.addEventListener("dragover", onDragover);
  draggableElement.addEventListener("drop", onDrop);
}

// Boucle sur les éléments à déplacer
draggableElements.forEach(onDraggableElement);
