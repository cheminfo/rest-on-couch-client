import { defineConfig, globalIgnores } from 'eslint/config';
import ts from 'eslint-config-zakodium/ts';
import vitest from 'eslint-config-zakodium/vitest-ts';

export default defineConfig(
  globalIgnores(['rest-on-couch/**', 'lib/**']),
  ts,
  vitest,
  {
    files: ['**/*.ts'],
    rules: {
      camelcase: 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: ['typeLike'], format: ['PascalCase'] },
        { selector: ['variable'], format: ['camelCase', 'UPPER_CASE'] },
        { selector: ['function'], format: ['camelCase', 'PascalCase'] },
        {
          selector: [
            'method',
            'classProperty',
            'classMethod',
            'parameterProperty',
            'accessor',
            'typeProperty',
            'typeMethod',
          ],
          format: ['camelCase', 'snake_case'],
          leadingUnderscore: 'allow',
        },
        {
          selector: [
            'objectLiteralProperty',
            'objectLiteralMethod',
            'enumMember',
          ],
          format: null,
        },
      ],
    },
  },
);
