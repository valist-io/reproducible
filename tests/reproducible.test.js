"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const reproducible = require('..');
mocha_1.describe('Test Valist Reproducible', () => __awaiter(void 0, void 0, void 0, function* () {
    mocha_1.describe('Create Build Image', () => __awaiter(void 0, void 0, void 0, function* () {
        mocha_1.it('Should return true', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.expect(reproducible.createImage('valist-build'));
        }));
    }));
    mocha_1.describe('Run Build Image', () => __awaiter(void 0, void 0, void 0, function* () {
        mocha_1.it('Should return true', () => __awaiter(void 0, void 0, void 0, function* () {
            chai_1.expect(yield reproducible.runBuild({
                image: 'valist-build',
                source: `${process.cwd()}/dist`,
            }));
        }));
    }));
}));
//# sourceMappingURL=reproducible.test.js.map