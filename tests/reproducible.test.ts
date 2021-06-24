import { expect } from 'chai';
import { describe, it } from 'mocha';

const reproducible = require('..');

describe('Test Valist Reproducible', async () => {
  describe('Create Build Image', async () => {
    it('Should return true', async () => {
      expect(reproducible.createImage());
    });
  });

  describe('Run Build Image', async () => {
    it('Should return true', async () => {
      expect(await reproducible.createBuildEnv({
        image: 'valist-build',
        command: ['cp', '/opt/valist/hello', '/opt/valist/dist'],
        source: `${process.cwd()}/dist`,
      }));
    });
  });
});
