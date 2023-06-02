const myName = 'Irwin';
const myAge = 28;
const suma = (a: number, b: number) => {
  return a + b;
};
suma(1, 2);

class Persona {
  constructor(private age: number, private name: string) {
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `my nam is ${this.name}, ${this.age}`;
  }
}

const irwin = new Persona(28, 'Irwin');
irwin.getSummary();
