# Dead Simple Express

The accompanying [blog post](http://www.softwaresecured.com/2015/04/08/secure-your-js-express-code/)

Lots of ideas grabbed from

- [hackathon-starter](https://github.com/sahat/hackathon-starter)
- [express-secure-skeleton](https://github.com/evilpacket/express-secure-skeleton)
- [gulp-starter](https://github.com/greypants/gulp-starter)

An express js boilerplate starter project for server side web applications

Uses connect-assets for its asset pipeline and pulls dependencies from bower

Tests are done with mocha, chai and supertest

Gulp is used to start nodemon and browser-sync

Dependencies:

- nodejs 

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
    nvm install latest
    node -v

- mongodb

    brew install mongodb

- gulp, bower etc 

    npm install gulp bower nodemon -g  # and maybe others

License is MIT
