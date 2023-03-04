import { StatInterceptor } from './interceptors/stat.interceptor';

describe('StatInterceptor', () => {
  it('should be defined', () => {
    expect(new StatInterceptor()).toBeDefined();
  });
});
