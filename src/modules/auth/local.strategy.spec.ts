import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy.Ts } from './local.strategy.ts';

describe('LocalStrategy.Ts', () => {
  let provider: LocalStrategy.Ts;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy.Ts],
    }).compile();

    provider = module.get<LocalStrategy.Ts>(LocalStrategy.Ts);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
