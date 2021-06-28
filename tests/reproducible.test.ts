import { expect } from 'chai';
import { describe, it } from 'mocha';

const reproducible = require('..');

describe('Test Valist Reproducible', async () => {
  describe('Create Build Image', async () => {
    it('Should return true', async () => {
      expect(await reproducible.createImage('build-test'));
    }).timeout(100000);
  });

  describe('Run Build Image', async () => {
    it('Should return true', async () => {
      expect(await reproducible.runBuild({
        image: 'build-test',
        outputPath: `${process.cwd()}/tests/dist`,
        artifacts: ['main'],
      }));
    }).timeout(100000);
  });
});
