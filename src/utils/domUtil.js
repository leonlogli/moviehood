const css = (element, property) => {
  const style = window.getComputedStyle(element);

  return style.getPropertyValue(property);
};

export { css };
