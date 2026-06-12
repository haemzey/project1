FROM nginx:alpine
WORKDIR /myapp
COPY . .
RUN apk add --no-cache bash
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 



