import { expect } from 'chai';
import { describe, it } from 'mocha';

const reproducible = require('..');

describe('Test Valist Reproducible', async () => {
  describe('Create Build Image', async () => {
    it('Should return true', async () => {
      await reproducible.createBuild('valist-build', 'tests/Dockerfile');
    }).timeout(100000);
  });

  describe('Run Build Image', async () => {
    it('Should return true', async () => {
      expect(await reproducible.exportBuild('valist-build', 'dist'));
    }).timeout(100000);
  });
});
