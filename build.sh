#!/bin/bash

npm install


# 构建pc
npm run build:pc
# 构建wap
npm run build:wap
# build for production and view the bundle analyzer report
npm run build --report
