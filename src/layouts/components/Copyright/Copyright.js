import React from "react";

const Copyright = (props) => {
  const year = new Date().getFullYear();

  return (
    <p {...props}>
      Copyright &copy;
      <a href="http://github.com/leonlogli">&nbsp;Léon Logli&nbsp;</a>
      {year}
    </p>
  );
};

export default Copyright;
export { Copyright };
