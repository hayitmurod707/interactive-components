import {
   flip,
   FloatingFocusManager,
   FloatingList,
   FloatingNode,
   FloatingPortal,
   offset,
   safePolygon,
   shift,
   useDismiss,
   useFloating,
   useFloatingNodeId,
   useFloatingTree,
   useHover,
   useInteractions,
   useListItem,
   useListNavigation,
   useMergeRefs,
   useRole,
   useTypeahead as useTypeAhead,
} from '@floating-ui/react';
import Accordion from 'components/Accordion';
import {
   createContext,
   forwardRef,
   Fragment,
   memo,
   useContext,
   useEffect,
   useRef,
   useState,
} from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
const MenuContext = createContext({
   activeIndex: null,
   getItemProps: () => {},
   isOpen: false,
   setActiveIndex: () => {},
   setHasFocusInside: () => {},
});
export const Menu = forwardRef(
   ({ children, label, icon, ...props }, forwardedRef) => {
      const [isOpen, setIsOpen] = useState(false);
      const [hasFocusInside, setHasFocusInside] = useState(false);
      const [activeIndex, setActiveIndex] = useState(null);
      const elementsRef = useRef([]);
      const labelsRef = useRef([]);
      const parent = useContext(MenuContext);
      const item = useListItem();
      const nodeId = useFloatingNodeId();
      const { floatingStyles, refs, context } = useFloating({
         middleware: [flip(), offset(5), shift()],
         nodeId,
         onOpenChange: setIsOpen,
         open: isOpen,
         placement: 'left-center',
         strategy: 'fixed',
      });
      const hover = useHover(context, {
         enabled: true,
         delay: { open: 0, close: 0 },
         handleClose: safePolygon({ blockPointerEvents: true }),
      });
      const role = useRole(context, { role: 'menu' });
      const dismiss = useDismiss(context, { bubbles: true });
      const listNavigation = useListNavigation(context, {
         activeIndex,
         listRef: elementsRef,
         nested: false,
         onNavigate: setActiveIndex,
      });
      const typeAhead = useTypeAhead(context, {
         activeIndex,
         listRef: labelsRef,
         onMatch: isOpen ? setActiveIndex : undefined,
      });
      const { getReferenceProps, getFloatingProps, getItemProps } =
         useInteractions([hover, role, dismiss, listNavigation, typeAhead]);
      return (
         <FloatingNode id={nodeId}>
            <li className='flex h-12 m-0 mb-[2px] w-full'>
               <button
                  ref={useMergeRefs([
                     forwardedRef,
                     item.ref,
                     refs.setReference,
                  ])}
                  tabIndex={parent.activeIndex === item.index ? 0 : -1}
                  className='active menu-item flex items-center h-full outline-none py-2 px-3 w-full hover:bg-[#3a79f3] hover:text-white text-[#8092a9] text-left'
                  data-focus-inside={hasFocusInside ? '' : undefined}
                  data-open={isOpen ? '' : undefined}
                  role='menuitem'
                  {...getReferenceProps(
                     parent.getItemProps({
                        ...props,
                        onFocus(event) {
                           parent.setHasFocusInside(true);
                           props.onFocus?.(event);
                           setHasFocusInside(false);
                        },
                     })
                  )}
               >
                  <div className='w-6 h-6 ml-1'>{icon}</div>
               </button>
            </li>
            <MenuContext.Provider
               value={{
                  activeIndex,
                  getItemProps,
                  isOpen,
                  setActiveIndex,
                  setHasFocusInside,
               }}
            >
               <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                  {isOpen && (
                     <FloatingPortal id='floating-ui-portal'>
                        <FloatingFocusManager
                           context={context}
                           initialFocus={0}
                           modal={false}
                           returnFocus={true}
                        >
                           <div
                              ref={refs.setFloating}
                              className='p-[5px] bg-white rounded-[12px] !outline-none shadow-[0_0_20px_rgba(0,0,0,0.08)]'
                              style={floatingStyles}
                              {...getFloatingProps()}
                           >
                              {children}
                           </div>
                        </FloatingFocusManager>
                     </FloatingPortal>
                  )}
               </FloatingList>
            </MenuContext.Provider>
         </FloatingNode>
      );
   }
);
export const MenuItem = forwardRef(
   ({ label, icon, path, collapsed, permission, ...props }, forwardedRef) => {
      const { pathname } = useLocation();
      const navigate = useNavigate();
      const item = useListItem({ label });
      const menu = useContext(MenuContext);
      const tree = useFloatingTree();
      const isActive = item.index === menu.activeIndex;
      const activePage = String(pathname || '').startsWith(path);
      return (
         <Fragment>
            <li className='flex h-10 m-0'>
               <button
                  {...props}
                  className={`active flex items-center h-full outline-none py-2 pl-3 pr-3 w-full hover:bg-[#3a79f3] hover:text-white rounded-[10px] text-sm font-medium whitespace-nowrap text-left ${
                     activePage
                        ? 'bg-[#3a79f3] text-white'
                        : 'bg-transparent text-[#000000]'
                  }`}
                  ref={useMergeRefs([item.ref, forwardedRef])}
                  tabIndex={isActive ? 0 : -1}
                  {...menu.getItemProps({
                     onClick(event) {
                        navigate(path);
                        props.onClick?.(event);
                        tree?.events.emit('click');
                     },
                     onFocus(event) {
                        props.onFocus?.(event);
                        menu.setHasFocusInside(true);
                     },
                  })}
               >
                  {label}
               </button>
            </li>
         </Fragment>
      );
   }
);
const Link = memo(
   ({ subMenu = false, collapsed = false, icon, label = '', path = '' }) => {
      const labelClass = `text-sm font-medium ${
         subMenu ? 'w-[178px] min-w-[178px]' : 'w-[190px] min-w-[190px]'
      } ${collapsed ? 'hidden' : ''}`;
      const NavLinkClass = ({ isActive }) =>
         `active nav-menu-item flex items-center h-full outline-none py-2 w-full hover:bg-[#3a79f3] hover:text-white ${
            isActive ? 'bg-[#3a79f3] text-white' : 'text-[#8092a9]'
         } ${subMenu ? 'pl-6 pr-3' : 'px-3'}`;
      return (
         <li className='flex h-12 m-0 !mb-[2px] w-full'>
            <NavLink
               className={NavLinkClass}
               data-tooltip-content={label}
               data-tooltip-delay-hide='0'
               data-tooltip-delay-show='0'
               data-tooltip-offset={4}
               data-tooltip-place='right'
               to={path}
            >
               <div className='w-6 h-6 mr-2 ml-1'>{icon}</div>
               <div className={labelClass}>{label}</div>
            </NavLink>
         </li>
      );
   }
);
const SubMenu = memo(({ icon, label, collapsed, children = [] }) => {
   const { pathname } = useLocation();
   const [open, setOpen] = useState(false);
   useEffect(() => {
      const isActive =
         children.map(child => child?.path).includes(pathname) && !collapsed;
      if (isActive) {
         setOpen(true);
      }
   }, [collapsed, children, pathname]);
   return collapsed ? (
      <Menu icon={icon}>
         {children.map((route, index) => (
            <MenuItem {...route} key={index} />
         ))}
      </Menu>
   ) : (
      <li className='m-0 p-0'>
         <div className='flex h-12 m-0 !mb-[2px] w-full'>
            <button
               className='active menu-item flex items-center h-full outline-none py-2 pl-3 pr-2 w-full hover:bg-[#3a79f3] hover:text-white text-left text-[#8092a9]'
               onClick={() => setOpen(prev => !prev)}
            >
               <div className='w-6 h-6 mr-2 ml-1'>{icon}</div>
               <div
                  className={`text-sm font-medium w-[170px] min-w-[170px] ${
                     collapsed ? 'hidden' : ''
                  }`}
               >
                  {label}
               </div>
               <div className='flex items-end'>
                  <span
                     className={`duration-[400ms] transition-transform ${
                        open ? 'rotate-180' : ''
                     }`}
                  >
                     <svg height='19' width='19' viewBox='0 0 20 20'>
                        <path
                           fill='currentColor'
                           d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'
                        ></path>
                     </svg>
                  </span>
               </div>
            </button>
         </div>
         <div className='w-full'>
            <Accordion visible={open}>
               <ul className='m-0 p-0'>
                  {children.map((route, index) => (
                     <Link {...route} subMenu key={index} />
                  ))}
               </ul>
            </Accordion>
         </div>
      </li>
   );
});
const NavItem = memo(props => {
   const children = props?.children;
   const items = Array.isArray(children) ? children : [];
   const userPermissions = useSelector(
      state => state?.user?.agent?.username_permissions
   ).map(permission => permission?.codename);
   const permissions = items.filter(
      permission =>
         userPermissions.includes(permission?.codename) ||
         permission?.permission
   );
   return permissions?.length ? (
      <SubMenu {...props} />
   ) : userPermissions.includes(props?.codename) || props?.permission ? (
      <Link {...props} />
   ) : null;
});
export default NavItem;
