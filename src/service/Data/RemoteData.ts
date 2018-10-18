export enum RemoteDataKind {
  NotAsked = "NotAsked",
  Loading = "Loading",
  Success = "Success",
  Failure = "Failure"
}

export type RemoteData<T> =
  | {
      kind: RemoteDataKind.NotAsked;
    }
  | {
      kind: RemoteDataKind.Loading;
    }
  | {
      kind: RemoteDataKind.Success;
      data: T;
    }
  | {
      kind: RemoteDataKind.Failure;
      error: Error;
    };
