---
layout: post
title: Creating Public IP Checker
category: linux
tags: IP Checker
---

Install `postfix` and append the following below into `/etc/postfix/main.cf`

{% highlight bash %}
relayhost = [smtp.gmail.com]:587
smtp_sasl_auth_enable = yes
smtp_sasl_security_options = noanonymous
smtp_sasl_password_maps = hash:/etc/postfix/sasl/sasl_passwd
smtp_tls_security_level = encrypt
smtp_tls_CAfile = /etc/ssl/certs/ca-certificates.crt
{% endhighlight %}

Next create a password file at `/etc/postfix/sasl_passwd`
{% highlight bash %}
[smtp.gmail.com]:587 username@gmail.com:password
{% endhighlight %}

Create the db from `sasl_passd`
{% highlight bash %}
postmap /etc/postfix/sasl_passwd
{% endhighlight %}

Change the permissions to 600!
{% highlight bash %}
chmod 600 /etc/postfix/sasl_passwd
{% endhighlight %}


I recommend generating an app password from Google!

Start and enable postfix.

{% highlight bash %}
systemctl enable --now postfix.service
{% endhighlight %}

----

Next install `crontab`
{% highlight bash %}
pacman -S cronie
{% endhighlight %}

----

*check_public_ip.sh*
{% highlight bash %}
#!/bin/bash

old_ip=`cat /tmp/ip`
current_ip=`curl --ipv4 ifconfig.me`
if [ "$old_ip" != "$current_ip" ]; then
	echo "" | mail -s "New Public IP -> $current_ip" email@gmail.com
fi
echo $current_ip > /tmp/ip
{% endhighlight %}

{% highlight bash %}
chmod 755 check_public_ip.sh
{% endhighlight %}

`crontab -e`
{% highlight bash %}
*/30 * * * * /location/of/check_public_ip.sh
{% endhighlight %}
