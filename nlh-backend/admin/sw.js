self.addEventListener('push', function (event) {
    let data = {};

    try {
        data = event.data ? event.data.json() : {};
    } catch (e) {
        data = {
            title: 'Nataly Laser House',
            body: event.data
                ? event.data.text()
                : 'You have a new notification.'
        };
    }

    const title = data.title || 'Nataly Laser House';

    const options = {
        body: data.body || 'You have a new notification.',
        tag: data.tag || 'nlh-new-booking',
        renotify: true,
        data: {
            url: data.url || 'notifications.php'
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    const targetUrl =
        event.notification.data &&
        event.notification.data.url
            ? event.notification.data.url
            : 'notifications.php';

    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(function (clientList) {

            for (const client of clientList) {
                if ('focus' in client) {
                    client.navigate(targetUrl);
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});