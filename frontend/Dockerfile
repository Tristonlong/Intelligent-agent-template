# 使用 Node.js 官方镜像构建前端
FROM node:18 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建前端
RUN npm run build

# 使用 Nginx 作为前端服务器
FROM nginx:alpine

# 复制构建的前端文件到 Nginx 的默认目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]