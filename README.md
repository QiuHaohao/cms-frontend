# CMS Frontend

## Setup

This project uses `node v6.10.3` and `npm v3.10.10`. Make sure you have them installed. If your node version is newer than this, you might have trouble running the dev server. To change your node version, do the follows:

```sh
# install nvm if you haven't
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
nvm use 6.10.3
```

After you've got the right version of `node` and `npm`, enter the project folder and install the dependencies using `npm`
```sh
# enter the project folder first
npm install
```

then you will be able to run the development server using
```
npm start
```

the App will be at `http://localhost:6075`, and the Rekit Studio at `http://localhost:6076`
