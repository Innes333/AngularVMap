# Angular.js start build

Installation and running
-----------
```
$ npm install -save-dev gulp

$ npm install

$ gulp
```

Build аpplication
-----------
This command runs the concatenation and minification application files. Minification image and sends all Dist folder. Then it is possible deploy content to the server.

```
$ gulp build
```


FTP deploy
-----------
Open gulpfile.js find  "ftpConfig"  object and set your param
```
	{
		host: your.host,
		port: your.port,
		user: your.userName,
		password: your.password,
		localFilesGlob: your files to send. Example: ['app/assets/**'],
		remoteFolder: your target remote directory. Example: '/public_html/myGulpFtpTest'
	}
```

```
$ gulp ftp-deploy
```
Commitment rules
----------------
```
	Name of feature-branch - [taskNumber]-[taskName] 

	Example - 1001-fix-issues-in-IE


	Name of commit - [typeOfUpdate](partWichWasUpdated):-[what was done] 
	Types - fix, feat(new feature), update

	Example - fix(LayerConrtor): add sort orded of layers


```



