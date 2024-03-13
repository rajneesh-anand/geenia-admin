import React from "react";
import { ModalProvider } from "@components/modal/modal.context";

const initialState = {
  displaySidebar: false,
  displayDrawer: false,
  drawerView: null,
  sidebar: false,
  navbar: "navbar-sticky",
  animate: "",
  data: null,
};

export const UIContext = React.createContext(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
        drawerView: null,
      };
    }
    case "OPEN_DRAWER": {
      return {
        ...state,
        displayDrawer: true,
        displaySidebar: false,
        data: action.data,
      };
    }
    case "CLOSE_DRAWER": {
      return {
        ...state,
        displayDrawer: false,
      };
    }
    case "SET_DRAWER_VIEW": {
      return {
        ...state,
        drawerView: action.view,
      };
    }

    case "TOGGLE_SIDEBAR": {
      return {
        ...state,
        sidebar: !state.sidebar,
      };
    }
  }
}

export const UIProvider = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });
  const toggleSidebar = () => dispatch({ type: "TOGGLE_SIDEBAR" });
  const openDrawer = (data) => dispatch({ type: "OPEN_DRAWER", data });
  const closeDrawer = () => dispatch({ type: "CLOSE_DRAWER" });
  const setDrawerView = (view) => dispatch({ type: "SET_DRAWER_VIEW", view });

  const value = React.useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      openDrawer,
      closeDrawer,
      setDrawerView,
    }),
    [state]
  );
  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext = ({ children }) => (
  <UIProvider>
    <ModalProvider>{children}</ModalProvider>
  </UIProvider>
);
