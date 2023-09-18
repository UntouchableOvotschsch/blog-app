export const notificationTemplate = {
    id: '1',
    title: 'Уведомление 2',
    description: 'Произошло какое-то событие',
    userId: '1',
    href: 'http://localhost:3000/admin',
};

export const notificationTemplateArray = new Array(7).fill(0).map((el, index) => (
    { ...notificationTemplate, id: index + 1 }
));
