Check dependencies for malicious code, ideally do this automatically.

If using a node project, you can use `npm ls` or `yarn list` to list the entire dependency tree
```bash
$ npm ls
beta@0.1.0 /path/to/create-react-app-ya-built
├── @testing-library/jest-dom@4.2.4
├── @testing-library/react@9.5.0
├── @testing-library/user-event@7.2.1
├── react-dom@16.14.0
├── react-scripts@3.4.3
└── react@16.14.0
```
This can also be automated with tools such as `Snyk` and compare it to the US government database `NIST`
