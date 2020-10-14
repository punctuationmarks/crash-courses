# Deployment on Linux server

- Change allowed hosts to IP address of server in app/settings.py
- Add the static root in app/settings.py
`STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')`

- Run collect static command and verify the static files were created/saved
`python3 manage.py collectstatic`

- Testing the server (use whatever port you allowed throught the firewall)
`python3 manage.py runserver 0.0.0.0:8000`



- For apache2 .conf file (it's path is /etc/apache2/sites-available):
```
<VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html


        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

	
	# this static folder is whtever is specified in settings.py and
	# activated on manage.py collectstatic
        Alias /static /home/punctuationmarks/Dossier/static
        <Directory /home/punctuationmarks/Dossier/static>
                Require all granted
        </Directory>



        Alias /static /home/punctuationmarks/Dossier/static
        <Directory /home/punctuationmarks/Dossier/static>
                Require all granted
        </Directory>


        <Directory /home/punctuationmarks/Dossier/VanillaDossier>
                <Files wsgi.py>
                        Require all granted
                </Files>
        </Directory>

        WSGIScriptAlias / /home/punctuationmarks/Dossier/VanillaDossier/wsgi.py
        WSGIDaemonProcess namedWhatever python-path=/home/punctuationmarks/Dossier$
        WSGIProcessGroup namedWhatever

</VirtualHost>
```


- 
_Note how apache will find the .conf file without having to specify path_
```
(venv) punctuationmarks@dossier-server:~$ sudo a2ensite dossier.conf 
$ sudo a2dissite 000-default.conf

$ systemctl reload apache2

```

- If you have a media folder for any media
```
$ sudo chown -R :www-data Dossier/media
$ sudo chmod -R 775 Dossier/media 

```


- Make a file for holding the configuration information, ie. the secret keys for the app
```
$ sudo touch /etc/config.json

```
