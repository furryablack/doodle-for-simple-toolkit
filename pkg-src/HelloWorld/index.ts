import { recaseIt } from "../recase-it";

export class HelloWorld {
  public name: string | null = null;

  constructor(name?: string) {
    this.name = name || 'anon';
  }

  public echo(): string {
    return recaseIt(`Hello ${this.name}`);
  }
}