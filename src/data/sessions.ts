import { MODULE_1 } from './sessions/module1';
import { MODULE_2 } from './sessions/module2';
import { MODULE_3 } from './sessions/module3';
import { MODULE_4 } from './sessions/module4';
import { MODULE_5 } from './sessions/module5';
import { PROJECT_MODULES } from './sessions/projects';
import { Module } from '../types';

export const ALL_MODULES: Module[] = [
  MODULE_1,
  MODULE_2,
  MODULE_3,
  MODULE_4,
  MODULE_5,
  ...PROJECT_MODULES
];
