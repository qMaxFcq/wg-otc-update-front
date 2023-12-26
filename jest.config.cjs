/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
    preset: "ts-jest",

    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        // process `*.tsx` files with `ts-jest`
    },
    rootDir: "src",
    moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
        "^@/(.*)$": "<rootDir>/$1",
    },
};
