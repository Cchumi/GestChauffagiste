import React, { useRef, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';
export const AppTopbar = (props) => {
    const menu = useRef(null);
    const toast = useRef(null);

    const getInitials = function (string) {
        var names = string.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };
    const [userInitials, setUserInitials] = useState(getInitials(props.userContext.details.firstName + ' ' + props.userContext.details.lastName))

    //console.log(userContext)
    //console.log(getInitials(userContext.details.firstName + ' ' + userContext.details.lastName))
    const societeAdminsItems = [

        {
            label: 'Profil',
            icon: 'pi pi-fw pi-user',
            command: () => {
                props.onMobileSubTopbarMenuClick('profile')
                //toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
            }
        },
        {
            label: 'Réglages',
            icon: 'pi pi-fw pi-cog',
            command: () => {
                props.onMobileSubTopbarMenuClick('settings')
                //toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
            }
        },
        {
            separator: true
        },
        {
            label: 'Se Déconnecter',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
                props.Logout()
                //toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
            }
        },
        {
            label: 'A Propos',
            icon: 'pi pi-fw pi-info-circle',
            command: () => {
                toast.current.show({
                    severity: 'success', summary: '', detail: 'Data Deleted', sticky: true,
                    content: (
                        <div className="flex flex-column" style={{ flex: '1' }}>
                            <div className="text-center">
                                <i className="pi pi-info-circle" style={{ fontSize: '3rem' }}></i>
                                <h4>A propos de Gest Bouhet</h4>
                                <p>Version : 1.0.1</p>
                            </div>

                        </div>
                    )
                });
            }
        }

    ];

    const societeUsersItems = [

        {
            label: 'Profil',
            icon: 'pi pi-fw pi-user',
            command: () => {
                props.onMobileSubTopbarMenuClick('profile')
                //toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
            }
        },
        {
            separator: true
        },
        {
            label: 'Se Déconnecter',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
                props.Logout()
                //toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
            }
        },
        {
            label: 'A Propos',
            icon: 'pi pi-fw pi-info-circle',
            command: () => {
                toast.current.show({
                    severity: 'success', summary: '', detail: 'Data Deleted', sticky: true,
                    content: (
                        <div className="flex flex-column" style={{ flex: '1' }}>
                            <div className="text-center">
                                <i className="pi pi-info-circle" style={{ fontSize: '3rem' }}></i>
                                <h4>A propos de Gest Bouhet</h4>
                                <p>Version : 1.0.1</p>
                            </div>

                        </div>
                    )
                });
            }
        }

    ];

    const [menuItems, setMenuItems] = useState(props.userContext.details.role === "super-admin" || props.userContext.details.role === "societe-admin" ? societeAdminsItems : societeUsersItems)
    //console.log(userInitials)
    /* return (
         <div>
             <Toast ref={toast}></Toast>
 
             <div className="cards">
                 <Menu model={items} popup ref={menu} id="popup_menu" />
                 <Button label="Show" icon="pi pi-bars" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />
             </div>
         </div>
     );*/
    return (
        <div className="layout-topbar">
            <Toast ref={toast}></Toast>
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? `${process.env.PUBLIC_URL }/assets/layout/images/logo-dark.svg`: `${process.env.PUBLIC_URL }/assets/layout/images/logo-white.svg`} alt="logo" />
                <span>Gest'Bouhet</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                <li>
                    <button className="p-link layout-topbar-button" name="events" onClick={() => props.onMobileSubTopbarMenuClick('events')}>
                        <i className="pi pi-calendar" />
                        <span>Events</span>
                    </button>
                </li>
                <li>
                    <div>
                        <Menu model={menuItems} popup ref={menu} id="popup_menu" />
                        <Avatar label={userInitials} size="large" shape="circle" className="p-overlay-badge" style={{ cursor: 'pointer' }} onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup  >
                            <Badge value="4" />
                        </Avatar>

                    </div>

                </li>
            </ul>
        </div>
    );
}
