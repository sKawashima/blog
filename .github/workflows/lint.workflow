name: Node CI

on: 
  push:
    branches:
      - !master

jobs:
  lint:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: lint test
      run: |
        npm install
        npm run lint
      env:
        CI: true
