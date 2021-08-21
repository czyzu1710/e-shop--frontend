import React, { createContext, useState } from "react";

const LogInProviderContext = createContext([false, (def) => {}]);

const LogInProvider = (props) => {
  const [log, setLog] = useState(false);

  return (
    <LogInProviderContext.Provider value={[log, setLog]}>
      {props.children}
    </LogInProviderContext.Provider>
  );
};

export { LogInProviderContext, LogInProvider };
