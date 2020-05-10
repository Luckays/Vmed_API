FROM keymetrics/pm2:latest-alpine
WORKDIR /usr/berich

# Bundle APP files 
COPY . .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN pm2 install typescript

CMD [ "npm", "run", "start" ]
CMD [ "pm2", "monit" ] 
