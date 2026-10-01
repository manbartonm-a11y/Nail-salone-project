<?php

$key = openssl_pkey_new([
    "private_key_type" => OPENSSL_KEYTYPE_EC,
    "curve_name" => "prime256v1"
]);

if ($key === false) {
    while ($error = openssl_error_string()) {
        echo $error . PHP_EOL;
    }
    exit(1);
}

echo "EC P-256 key generation works!" . PHP_EOL;
