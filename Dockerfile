# ---------- build ----------
FROM node:20-alpine AS build 
    #FROM → choose a base image
    #node:20-alpine → Node.js version 20, Alpine Linux (very small image)
    #AS build → names this stage build
    #Why?
    #We need Node only to compile the React/Vite app, not to run it


WORKDIR /app
    #sets the working directory inside the container
    #All next commands run inside /app
    #If /app doesn’t exist → Docker creates it

COPY package*.json ./
    #Copies:
    #package.json
    #package-lock.json (if exists)
    #Copies them into /app
    #Why not copy everything yet?
    #Docker caching: dependencies only reinstall when these files change



RUN npm install
    #Installs all dependencies listed in package.json
    ##Creates node_modules inside the container
    #Runs once unless package*.json changes

COPY . .
    #Copies everything from your project folder into /app
    #Includes:  #src/   #index.html   #vite.config.js   #etc.

RUN npm run build
    #Runs the build script from package.json
    #Vite compiles your React app
    #Output goes to:  #/app/dist  #This folder contains static files only:  #HTML   #JS   #CSS


# ---------- run ----------
FROM nginx:alpine
    # Starts a new container stage
    # Uses nginx (lightweight web server)
    # Node.js is NOT included here → smaller + safer

COPY --from=build /app/dist /usr/share/nginx/html
    #Copies files from the build stage
    #--from=build → refers to the first stage
    #Source:
    #/app/dist
    #Destination:
    #/usr/share/nginx/html
    #That is nginx’s default web root
    #Result: nginx can now serve your React app







# SPA routing (React/Vite)
RUN printf 'server {\n\
    #Writes a custom nginx configuration file
    #printf is used to avoid creating a separate .conf file

  listen 80;\n\
      #Writes a custom nginx configuration file
      #printf is used to avoid creating a separate .conf file

  server_name _;\n\
      #_ means: accept any hostname
      #Useful in Docker where hostnames vary

  root /usr/share/nginx/html;\n\
      #Sets the web root directory
      #This is where your React build files live

  index index.html;\n\
      #Default file to load
      #When someone hits /, nginx serves index.html

  location / {\n\
      #Matches all routes
      #/, /dashboard, /reports/123, etc.

    try_files $uri $uri/ /index.html;\n\



            #Most important line for React
            #nginx checks:
            #Does the file exist? → serve it
            #Does a folder exist? → serve it
            #Else → serve index.html
            #Why?
            #React Router handles routes in the browser
            #Without this → page refresh causes 404


  }\n\
}\n' > /etc/nginx/conf.d/default.conf

          #Closes the nginx configuration
          #Writes everything above into nginx’s config file
          #Replaces the default config



EXPOSE 80
      #Documents that the container listens on port 80
      #Does NOT publish the port by itself
      #Used by Docker / Docker Compose


CMD ["nginx", "-g", "daemon off;"]
      #Starts nginx
      #daemon off; → runs nginx in foreground
      #Required so Docker knows the container is running


