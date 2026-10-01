<?php
require 'vendor/autoload.php';

$k = \Minishlink\WebPush\VAPID::createVapidKeys();

echo "PUBLIC: " . $k['publicKey'] . PHP_EOL;
echo "PRIVATE: " . $k['privateKey'] . PHP_EOL;
