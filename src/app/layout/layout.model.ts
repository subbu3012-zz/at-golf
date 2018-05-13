export class Menu {
    menuId: string;
    menuDesc: string;
    menuRoute: string;
    menuIcon?: string;
}

export const MENULIST: Menu[] = [
    {
        "menuId": "1",
        "menuDesc": "Home",
        "menuRoute": "home"
    },
    {
        "menuId": "2",
        "menuDesc": "Book A Tee Time",
        "menuRoute": "teetime"
    },
    {
        "menuId": "3",
        "menuDesc": "Connections",
        "menuRoute": "connections"
    },
    {
        "menuId": "4",
        "menuDesc": "Events",
        "menuRoute": "events"
    }
]