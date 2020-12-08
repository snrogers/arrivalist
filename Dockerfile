FROM ruby:2.7.0
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN gem install bundler -v 2.1.2
RUN mkdir /ArrivalistAudition
WORKDIR ArrivalistAudition/
COPY Gemfile /ArrivalistAudition/Gemfile
COPY Gemfile.lock /ArrivalistAudition/Gemfile.lock
RUN bundle install
COPY . ArrivalistAudition/
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
