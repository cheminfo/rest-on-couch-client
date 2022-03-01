FROM ghcr.io/cheminfo/rest-on-couch:11.0.4

# Install system packages
RUN apt-get update && apt-get install -y vim

# Copy ROC scripts
COPY wait.sh start.sh create_db.sh /
RUN chmod +x /wait.sh /start.sh /create_db.sh

# ROC home directory
COPY home /rest-on-couch/


CMD ["/start.sh"]