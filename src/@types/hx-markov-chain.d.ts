declare module "hx-markov-chain" {
  export interface MarkovModel {
    __brand: "MarkovModel";
  }

  export interface MarkovModule {
    create(): MarkovModel;
    update(model: MarkovModel, words: string[]): void;
    run(model: MarkovModel): string[];
  }

  const markov: MarkovModule;
  export default markov;
}
