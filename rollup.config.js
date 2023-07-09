import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import filesize from "rollup-plugin-filesize";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const pkg = require("./package.json");

export default [
    {
        input: "lib/index.ts",
        output: [
            {
                file: pkg.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: pkg.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({tsconfig: "./tsconfig.json"}),
            terser(),
            filesize(),
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{file: "dist/index.d.ts", format: "esm"}],
        plugins: [dts.default()],
    },
];
