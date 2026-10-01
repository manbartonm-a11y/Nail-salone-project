(function () {
    'use strict';

    // Paste your VAPID PUBLIC key here.
    // Never put your VAPID PRIVATE key in this file.
    var VAPID_PUBLIC_KEY = 'BAfpbMGUOxLcZhbgHFqO1nn20hdYD9MzgY7eH6ccDD9UjXynBMJChzZU5Bqma5JsSQNNQT29eekWV3vREg4Rc2Q';

    function urlBase64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    }

    async function registerPush() {

        if (!('serviceWorker' in navigator)) {
            console.log('Web Push: service workers are not supported.');
            return;
        }

        if (!('PushManager' in window)) {
            console.log('Web Push: Push API is not supported.');
            return;
        }

        if (!('Notification' in window)) {
            console.log('Web Push: notifications are not supported.');
            return;
        }

        try {
            var registration =
                await navigator.serviceWorker.register('sw.js');

            var permission = Notification.permission;

            if (permission === 'default') {
                permission = await Notification.requestPermission();
            }

            if (permission !== 'granted') {
                console.log('Web Push: notification permission was not granted.');
                return;
            }

            var subscription =
                await registration.pushManager.getSubscription();

            if (!subscription) {
                subscription =
                    await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey:
                            urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
                    });
            }

            var response = await fetch('push_subscribe.php', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscription)
            });

            var result = await response.json();

            if (!result.ok) {
                console.error(
                    'Web Push subscription failed:',
                    result.message
                );
                return;
            }

            console.log('Web Push: subscription registered.');

        } catch (error) {
            console.error('Web Push setup failed:', error);
        }
    }

    window.nlhRegisterPush = registerPush;

    document.addEventListener('DOMContentLoaded', function () {
        registerPush();
    });

})();