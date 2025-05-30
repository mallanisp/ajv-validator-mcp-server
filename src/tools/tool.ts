export abstract class Tool<T> {
  public abstract readonly name: string;
  public abstract readonly description: string;
  public abstract readonly schema: Record<string, unknown>;

  public abstract execute(params: T): Promise<unknown>;
}
