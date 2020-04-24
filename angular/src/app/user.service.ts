import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

type User = { username: string };

type Provider = {
  configure?: () => any;
  tryLogin?: () => any;
  getOAuthService?: () => {};
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  intialize(fedProvider: Provider, connectProvider) {
    const providersConfiguration: Observable<any>[] = [];

    // for each login provider
    for (const provider of [fedProvider, connectProvider]) {
      // every provider must be configured
      const providerObs = from(provider.configure()).pipe(
        mergeMap(() => {
          // if current provider is the used one, we try to log the user
          if (
            provider.getOAuthService().issuer !== this.getCurrentAuthProvider()
          ) {
            return of(false);
          }
          return from(provider.tryLogin());
        }),
        mergeMap((isLogged) => {
          if (!isLogged) {
            return of(undefined);
          }
          return this.getUserProfile();
        })
      );

      providersConfiguration.push(providerObs);
    }

    // init every provider and try login the good one
    return forkJoin(providersConfiguration).pipe(
      map((userResponse) => userResponse.filter((user) => !!user)[0])
    );
  }

  private getCurrentAuthProvider() {
    return 'CONNECT';
  }

  getUserProfile(): Observable<User> {
    return this.httpClient.get<User>('/assets/mocks/user.json').pipe(
      map((user) => {
        return user;
      })
    );
  }
}
