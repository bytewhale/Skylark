# 使用 node 镜像来构建前端应用
FROM node:16 AS build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 将当前目录下的所有文件（不包括 node_modules）复制到工作目录
COPY . .

# 构建前端应用
RUN npm run build-only

# 使用 nginx 镜像来部署打包后的前端应用
FROM nginx:stable-alpine AS production-stage

# 复制打包后的文件到 nginx 的 html 目录
COPY --from=build-stage /app/dist /app/dist

# 复制 nginx 配置文件
COPY /config/nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 8888 端口
EXPOSE 8888

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
