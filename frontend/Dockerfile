FROM node:23-alpine AS base
WORKDIR /frontend
COPY package*.json ./ 
RUN npm install 
ARG NEXT_PUBLIC_BACKEND_WS_URL
ENV NEXT_PUBLIC_BACKEND_WS_URL=${NEXT_PUBLIC_BACKEND_WS_URL}

FROM base AS build-stage1
COPY . . 
RUN npm run build

#dev build with only required files
FROM node:23-alpine AS build-stage2
ENV NODE_ENV develeopment
WORKDIR /frontend
COPY --from=build-stage1 /frontend/node_modules ./node_modules/
COPY --from=build-stage1 /frontend/package.json ./
COPY --from=build-stage1 /frontend/package-lock.json ./
COPY --from=build-stage1 /frontend/.next ./.next
EXPOSE 3000
CMD ["npm","run","start"]

FROM base AS production-stage1
RUN rm -rf node_modules
RUN npm install --omit=dev
COPY . .
RUN npm run build

#Production build for only required files 
FROM node:23-alpine AS production-stage2
ENV NODE_ENV production 
WORKDIR /frontend
COPY --from=production-stage1 /frontend/node_modules ./node_modules/
COPY --from=production-stage1 /frontend/package.json ./
COPY --from=production-stage1 /frontend/package-lock.json ./
COPY --from=production-stage1 /frontend/.next ./.next
EXPOSE 3000
CMD ["npm","run","start"]





