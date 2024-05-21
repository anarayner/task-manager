import { TaskTitlePipe } from './task-title.pipe';

describe('TastTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new TaskTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
