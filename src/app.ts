// autobind decorator
function AutoBind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    const { getElementById: getbyId, importNode } = document;
    this.templateElement = getbyId("project-input")! as HTMLTemplateElement;
    this.hostElement = getbyId("app")! as HTMLDivElement;

    const importedNode = importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input"; // css

    const { querySelector } = this.element;
    this.titleInputElement = querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = querySelector("#people") as HTMLInputElement;

    this.configure();
    this.attach();
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const projectInput = new ProjectInput();
