FROM node:20.18.0-alpine

# Tạo thư mục cho ứng dụng
RUN mkdir -p /code/real-time-chat
WORKDIR /code/real-time-chat

# Bước 3: Copy package.json và yarn.lock vào container
COPY package.json  ./

# Bước 4: Cài đặt các dependencies (bao gồm cả devDependencies)
RUN yarn install

# Bước 5: Copy toàn bộ mã nguồn vào container
COPY . .

# Bước 6: Cài đặt Babel và các gói liên quan bằng Yarn vì ứng dụng chạy babel
RUN yarn add --dev @babel/cli @babel/core @babel/preset-env
# Bước 7: Chạy build
RUN yarn run build

# Bước 8: Expose port mà ứng dụng sẽ chạy
EXPOSE 1000

# Bước 9: Chạy ứng dụng
CMD ["npm", "run", "app"]