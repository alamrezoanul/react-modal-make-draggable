import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.tsx',
    output: {
        file: 'dist/index.js',
        format: 'esm',
        exports: 'named',
    },
    plugins: [typescript()],
    external: ['react', 'react-dom', 'react/jsx-runtime'], // 👈 add this
};
